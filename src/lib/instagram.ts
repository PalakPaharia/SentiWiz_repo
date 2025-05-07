// Instagram OAuth and API calls are implemented according to:
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login
// Always refer to the official documentation for scopes, endpoints, and flows.

const INSTAGRAM_APP_ID = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
const INSTAGRAM_APP_SECRET = import.meta.env.VITE_INSTAGRAM_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI;

function generateRandomState(length = 32) {
  return Array.from(window.crypto.getRandomValues(new Uint8Array(length)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function setStateCookie(state: string) {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const cookie = `ig_oauth_state=${state}; Path=/; SameSite=Lax${isLocalhost ? '' : '; Secure'}`;
  document.cookie = cookie;
  console.log('[IG OAUTH] Set state cookie:', cookie);
}
function getStateCookie(): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ig_oauth_state=`);
  if (parts.length === 2) return parts.pop().split(';').shift() || null;
  return null;
}
function clearStateCookie() {
  document.cookie = 'ig_oauth_state=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
  console.log('[IG OAUTH] Cleared state cookie');
}

export const initiateInstagramAuth = () => {
  // Construct state parameter for security
  const state = generateRandomState();
  setStateCookie(state);
  console.log('[IG OAUTH] Generated state:', state);

  // Use Instagram OAuth URL for Instagram Login
  const authUrl = new URL('https://www.instagram.com/oauth/authorize');
  authUrl.searchParams.append('client_id', INSTAGRAM_APP_ID);
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append('scope', 'instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments');
  authUrl.searchParams.append('response_type', 'code');

  window.location.href = authUrl.toString();
};

export const handleInstagramCallback = async (code: string, state: string) => {
  try {
    // Verify state parameter
    const storedState = getStateCookie();
    console.log('[IG OAUTH] Callback state:', state);
    console.log('[IG OAUTH] Stored state:', storedState);
    if (state !== storedState) {
      clearStateCookie();
      throw new Error('Invalid state parameter');
    }
    clearStateCookie();

    // Step 1: Exchange code for short-lived access token (handled by backend proxy for security)
    const response = await fetch('/api/instagram/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirect_uri: REDIRECT_URI }),
    });
    const tokenData = await response.json();
    if (!response.ok || tokenData.error) {
      throw new Error(tokenData.error?.message || 'Failed to get access token');
    }

    // Store the access token and account info as needed (handled by backend or here as per your flow)
    // ...

    return {
      success: true,
      access_token: tokenData.access_token,
      user_id: tokenData.user_id,
    };
  } catch (error) {
    console.error('Instagram auth error:', error);
    throw error;
  }
};

export const disconnectInstagram = async () => {
  // Implement disconnect logic as needed, e.g., remove token from your backend
  // No Facebook endpoint is needed for disconnect in this flow
  return true;
}; 