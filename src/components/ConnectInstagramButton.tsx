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