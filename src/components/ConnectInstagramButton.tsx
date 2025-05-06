// Instagram Connect button implemented according to:
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login
// Always refer to the official documentation for scopes, endpoints, and flows.

import { Button } from "@/components/ui/button";
import { initiateInstagramAuth } from "@/lib/instagram";

export function ConnectInstagramButton() {
  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    initiateInstagramAuth();
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