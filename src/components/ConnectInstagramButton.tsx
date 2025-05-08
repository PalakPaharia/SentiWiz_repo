// Instagram Connect button implemented according to:
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login
// Always refer to the official documentation for scopes, endpoints, and flows.

import { Button } from "@/components/ui/button";

const INSTAGRAM_APP_ID = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
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
  console.log('[IG OAUTH] document.cookie after set:', document.cookie);
}
function getStateCookie(): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ig_oauth_state=`);
  if (parts.length === 2) return parts.pop().split(';').shift() || null;
  return null;
}
function setStateLocalStorage(state: string) {
  localStorage.setItem('ig_oauth_state', state);
  console.log('[IG OAUTH] Set state localStorage:', state);
}
function getStateLocalStorage(): string | null {
  return localStorage.getItem('ig_oauth_state');
}

export function ConnectInstagramButton() {
  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    // Generate state and set in both cookie and localStorage
    const state = generateRandomState();
    setStateCookie(state);
    setStateLocalStorage(state);
    console.log('[IG OAUTH] Generated state:', state);

    // Confirm both are set
    const cookieState = getStateCookie();
    const lsState = getStateLocalStorage();
    console.log('[IG OAUTH] Confirm before redirect - cookie:', cookieState, 'localStorage:', lsState);
    if (cookieState !== state && lsState !== state) {
      alert('Failed to set OAuth state. Please check your browser settings and try again.');
      return;
    }

    // Build Instagram OAuth URL
    const authUrl = new URL('https://www.instagram.com/oauth/authorize');
    authUrl.searchParams.append('client_id', INSTAGRAM_APP_ID);
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('scope', 'instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments');
    authUrl.searchParams.append('response_type', 'code');
    console.log('[IG OAUTH] Redirecting to Instagram OAuth:', authUrl.toString());
    window.location.href = authUrl.toString();
  };

  return (
    <Button 
      onClick={handleConnect}
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
    >
      Connect Instagram
    </Button>
  );
} 