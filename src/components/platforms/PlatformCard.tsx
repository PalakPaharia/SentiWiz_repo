import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Platform } from "@/constants/platforms";
import { cn } from "@/lib/utils";
import { BarChart3, Link2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import InstagramConnect from './InstagramConnect';

type PlatformCardProps = {
  platform: Platform;
  onSync: (platformId: string) => Promise<void>;
};

export default function PlatformCard({ platform, onSync }: PlatformCardProps) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await onSync(platform.id);
    } finally {
      setIsSyncing(false);
    }
  };

  if (platform.id === 'instagram') {
    return <InstagramConnect />;
  }

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md",
      !platform.isConnected && "opacity-60"
    )}>
      <CardHeader className="p-4 pb-2 flex justify-center">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: platform.isConnected ? platform.color : '#ccc' }}
        >
          <span className="text-white text-2xl">{platform.name.charAt(0)}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-center">
        <h3 className="font-semibold text-lg">{platform.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {platform.isConnected
            ? platform.lastSync
              ? `Last synced ${formatDistanceToNow(platform.lastSync, { addSuffix: true })}`
              : "Not synced yet"
            : "Not connected"}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        {platform.isConnected ? (
          <>
            <Button variant="default" size="sm" className="w-full" asChild>
              <Link to={`/platforms/${platform.id}-report`}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleSync}
              disabled={isSyncing}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", isSyncing && "animate-spin")} />
              {isSyncing ? "Syncing..." : "Sync Now"}
            </Button>
          </>
        ) : (
          <Button variant="default" size="sm" className="w-full">
            <Link2 className="h-4 w-4 mr-2" />
            Connect
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
