import { supabase } from './supabase';

const INSTAGRAM_APP_ID = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
const INSTAGRAM_APP_SECRET = import.meta.env.VITE_INSTAGRAM_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI;

export const initiateInstagramAuth = () => {
  // Construct state parameter for security
  const state = Math.random().toString(36).substring(7);
  
  // Store state in session storage for verification
  sessionStorage.setItem('instagram_auth_state', state);

  // Use Facebook OAuth URL for Instagram Business
  const authUrl = new URL('https://www.facebook.com/v18.0/dialog/oauth');
  authUrl.searchParams.append('client_id', INSTAGRAM_APP_ID);
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append('scope', 'instagram_basic,instagram_content_publish,pages_show_list,instagram_manage_insights');
  authUrl.searchParams.append('response_type', 'code');
  
  // Redirect to Facebook auth page
  window.location.href = authUrl.toString();
};

export const handleInstagramCallback = async (code: string, state: string) => {
  try {
    // Verify state parameter
    const storedState = sessionStorage.getItem('instagram_auth_state');
    if (state !== storedState) {
      throw new Error('Invalid state parameter');
    }

    // Clear stored state
    sessionStorage.removeItem('instagram_auth_state');

    // Step 1: Exchange code for access token
    const tokenResponse = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${INSTAGRAM_APP_SECRET}&code=${code}`);
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Token error:', tokenData);
      throw new Error(tokenData.error.message || 'Failed to get access token');
    }

    // Step 2: Get Facebook Page ID (required for Instagram Business)
    const pagesResponse = await fetch(`https://graph.facebook.com/v18.0/me/accounts?access_token=${tokenData.access_token}`);
    const pagesData = await pagesResponse.json();

    if (!pagesData.data || pagesData.data.length === 0) {
      throw new Error('No Facebook Pages found. Please make sure you have a Facebook Page connected to your Instagram Business account.');
    }

    const pageId = pagesData.data[0].id;
    const pageAccessToken = pagesData.data[0].access_token;

    // Step 3: Get Instagram Business Account ID
    const instagramResponse = await fetch(`https://graph.facebook.com/v18.0/${pageId}?fields=instagram_business_account&access_token=${pageAccessToken}`);
    const instagramData = await instagramResponse.json();

    if (!instagramData.instagram_business_account) {
      throw new Error('No Instagram Business account found. Please make sure your Facebook Page is connected to an Instagram Business account.');
    }

    const instagramAccountId = instagramData.instagram_business_account.id;

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Store the access token and account info in Supabase
    await supabase.from('instagram_auth').upsert({
      user_id: user.id,
      access_token: pageAccessToken, // Store page access token for longer validity
      instagram_account_id: instagramAccountId,
      facebook_page_id: pageId,
      status: 'connected',
      account_type: 'business',
      last_token_refresh: new Date().toISOString()
    });

    return {
      success: true,
      instagram_account_id: instagramAccountId,
      facebook_page_id: pageId
    };
  } catch (error) {
    console.error('Instagram auth error:', error);
    throw error;
  }
};

export const disconnectInstagram = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('No user found');

    // Get the current auth data
    const { data: authData } = await supabase
      .from('instagram_auth')
      .select('access_token')
      .eq('user_id', user.id)
      .single();

    if (authData?.access_token) {
      // Revoke access token
      await fetch(`https://graph.facebook.com/v18.0/me/permissions?access_token=${authData.access_token}`, {
        method: 'DELETE'
      });
    }

    // Remove Instagram authentication data
    await supabase.from('instagram_auth')
      .delete()
      .match({ user_id: user.id });

    return true;
  } catch (error) {
    console.error('Error disconnecting Instagram:', error);
    throw error;
  }
}; 