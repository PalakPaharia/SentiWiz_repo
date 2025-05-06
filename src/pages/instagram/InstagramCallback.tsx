// Instagram OAuth callback handler implemented according to:
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login
// Always refer to the official documentation for scopes, endpoints, and flows.

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleInstagramCallback } from '@/lib/instagram';

const InstagramCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');
        const error = params.get('error');
        const errorReason = params.get('error_reason');
        const errorDescription = params.get('error_description');

        // Handle errors from Instagram
        if (error) {
          console.error('Instagram auth error:', { error, errorReason, errorDescription });
          navigate('/platforms?error=' + encodeURIComponent(errorDescription || 'Authentication failed'));
          return;
        }

        // Validate required parameters
        if (!code || !state) {
          throw new Error('Missing required parameters');
        }

        // Process the callback using the Instagram Login flow
        await handleInstagramCallback(code, state);

        // Redirect to platforms page on success
        navigate('/platforms?success=true');
      } catch (error: any) {
        console.error('Callback processing error:', error);
        navigate('/platforms?error=' + encodeURIComponent(error.message));
      }
    };

    processCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing Instagram Connection</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
};

export default InstagramCallback; 