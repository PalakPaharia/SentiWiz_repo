// Instagram API client implemented according to:
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login
// Always refer to the official documentation for scopes, endpoints, and flows.

import { InstagramAuthResponse, InstagramTokenResponse, InstagramUserProfile } from './types';

class InstagramClient {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
    this.clientSecret = import.meta.env.VITE_INSTAGRAM_CLIENT_SECRET;
    this.redirectUri = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI;
  }

  /**
   * Get the Instagram OAuth URL for user authentication
   * See: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login
   */
  getAuthUrl(): string {
    // Generate a random state for CSRF protection
    const state = Math.random().toString(36).substring(7);
    sessionStorage.setItem('instagram_auth_state', state);

    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: 'instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments',
      response_type: 'code',
      state: state
    });

    return `https://www.instagram.com/oauth/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token (handled by backend proxy for security)
   */
  async getAccessToken(code: string): Promise<InstagramTokenResponse> {
    const response = await fetch('/api/instagram/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirect_uri: this.redirectUri }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error_message || 'Failed to get access token');
    }

    return response.json();
  }

  /**
   * Get user profile information
   */
  async getUserProfile(accessToken: string): Promise<InstagramUserProfile> {
    const response = await fetch(
      `https://graph.instagram.com/v22.0/me?fields=id,username,account_type,media_count&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to get user profile');
    }

    return response.json();
  }

  /**
   * Get user media
   */
  async getUserMedia(accessToken: string, limit = 20): Promise<any> {
    const response = await fetch(
      `https://graph.instagram.com/v22.0/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,comments_count&limit=${limit}&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to get user media');
    }

    return response.json();
  }

  /**
   * Get comments for a media item
   */
  async getMediaComments(mediaId: string, accessToken: string): Promise<any> {
    const response = await fetch(
      `https://graph.instagram.com/v22.0/${mediaId}/comments?fields=text,timestamp,username,replies{text,timestamp,username}&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to get media comments');
    }

    return response.json();
  }
}

export const instagramClient = new InstagramClient(); 