// Instagram Connect button implemented according to:
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login
// Always refer to the official documentation for scopes, endpoints, and flows.

import { useState } from "react";
import { Button } from "@/components/ui/button";

const INSTAGRAM_APP_ID = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI;

function generateRandomState(length = 32) {
  return Array.from(window.crypto.getRandomValues(new Uint8Array(length)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function setStateCookie(state: string) {
  // For debugging, set with minimal attributes
  const cookie = `ig_oauth_state=${state}; Path=/`;
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
  const [loading, setLoading] = useState(false);
  const [storageWarning, setStorageWarning] = useState('');

  const handleConnect = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('[IG OAUTH] Button clicked');
    console.log('[IG OAUTH] Current domain:', window.location.hostname);
    console.log('[IG OAUTH] Current protocol:', window.location.protocol);
    console.log('[IG OAUTH] Current path:', window.location.pathname);
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
      setStorageWarning('Failed to set OAuth state. Please check your browser settings and try again.');
      alert('Failed to set OAuth state. Please check your browser settings and try again.');
      setLoading(false);
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
    setTimeout(() => {
      setLoading(false);
      window.location.href = authUrl.toString();
    }, 100); // short delay to ensure logs are flushed
  };

  // Check for storage support on mount
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('ig_oauth_state_test', 'test');
      if (localStorage.getItem('ig_oauth_state_test') !== 'test') {
        setStorageWarning('LocalStorage is not working. Please check your browser settings.');
      }
      localStorage.removeItem('ig_oauth_state_test');
    } catch (err) {
      setStorageWarning('LocalStorage is blocked. Please check your browser settings.');
    }
    try {
      document.cookie = 'ig_oauth_state_test=test; Path=/';
      if (!document.cookie.includes('ig_oauth_state_test=test')) {
        setStorageWarning('Cookies are not working. Please check your browser settings.');
      }
      document.cookie = 'ig_oauth_state_test=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    } catch (err) {
      setStorageWarning('Cookies are blocked. Please check your browser settings.');
    }
  }

  return (
    <div>
      {storageWarning && (
        <div style={{ color: 'red', marginBottom: 8 }}>{storageWarning}</div>
      )}
      <Button 
        onClick={handleConnect}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        disabled={loading}
      >
        {loading ? 'Connecting…' : 'Connect Instagram'}
      </Button>
    </div>
  );
} 