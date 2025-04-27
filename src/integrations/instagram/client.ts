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
   */
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: 'user_profile,user_media',
      response_type: 'code',
    });

    return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async getAccessToken(code: string): Promise<InstagramTokenResponse> {
    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: this.redirectUri,
      code,
    });

    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: params,
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    return response.json();
  }

  /**
   * Get user profile information
   */
  async getUserProfile(accessToken: string): Promise<InstagramUserProfile> {
    const response = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
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
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&limit=${limit}&access_token=${accessToken}`
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
      `https://graph.instagram.com/${mediaId}/comments?fields=text,timestamp,username&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to get media comments');
    }

    return response.json();
  }
}

export const instagramClient = new InstagramClient(); 