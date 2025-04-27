import { supabase } from '../supabase/client';
import { instagramClient } from './client';
import type { InstagramTokenResponse, InstagramUserProfile } from './types';

export class InstagramService {
  /**
   * Start the OAuth flow by redirecting to Instagram
   */
  static startAuth() {
    const authUrl = instagramClient.getAuthUrl();
    window.location.href = authUrl;
  }

  /**
   * Handle the OAuth callback and store credentials
   */
  static async handleAuthCallback(code: string) {
    try {
      // Exchange code for access token
      const tokenResponse = await instagramClient.getAccessToken(code);
      
      // Get user profile
      const userProfile = await instagramClient.getUserProfile(tokenResponse.access_token);
      
      // Store credentials in Supabase
      const { error } = await supabase
        .from('instagram_accounts')
        .upsert({
          user_id: tokenResponse.user_id,
          username: userProfile.username,
          access_token: tokenResponse.access_token,
          connected_at: new Date().toISOString(),
        });

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Instagram auth error:', error);
      throw error;
    }
  }

  /**
   * Sync latest comments from Instagram
   */
  static async syncComments() {
    try {
      // Get Instagram credentials
      const { data: accounts, error: accountsError } = await supabase
        .from('instagram_accounts')
        .select('*')
        .single();

      if (accountsError) throw accountsError;
      if (!accounts) throw new Error('No Instagram account connected');

      // Get recent media
      const mediaResponse = await instagramClient.getUserMedia(accounts.access_token);
      
      // For each media item, get comments
      for (const media of mediaResponse.data) {
        const comments = await instagramClient.getMediaComments(media.id, accounts.access_token);
        
        // Store comments in Supabase
        const { error } = await supabase
          .from('instagram_comments')
          .upsert(
            comments.data.map((comment: any) => ({
              comment_id: comment.id,
              media_id: media.id,
              text: comment.text,
              username: comment.username,
              timestamp: comment.timestamp,
              sentiment: null, // Will be processed by ML service
              processed_at: null,
            })),
            { onConflict: 'comment_id' }
          );

        if (error) throw error;
      }

      // Update last sync time
      const { error: updateError } = await supabase
        .from('instagram_accounts')
        .update({ last_synced_at: new Date().toISOString() })
        .eq('user_id', accounts.user_id);

      if (updateError) throw updateError;

      return { success: true };
    } catch (error) {
      console.error('Instagram sync error:', error);
      throw error;
    }
  }

  /**
   * Check if Instagram is connected
   */
  static async checkConnection() {
    try {
      const { data, error } = await supabase
        .from('instagram_accounts')
        .select('*')
        .single();

      if (error) throw error;

      return {
        isConnected: !!data,
        lastSyncedAt: data?.last_synced_at,
        username: data?.username,
      };
    } catch (error) {
      console.error('Instagram connection check error:', error);
      return {
        isConnected: false,
        lastSyncedAt: null,
        username: null,
      };
    }
  }

  /**
   * Disconnect Instagram account
   */
  static async disconnect() {
    try {
      const { error } = await supabase
        .from('instagram_accounts')
        .delete()
        .not('user_id', 'is', null);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Instagram disconnect error:', error);
      throw error;
    }
  }
} 