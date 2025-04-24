
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink } from "lucide-react";
import { type AlertItem, type SentimentType } from "@/constants/platforms";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

type AlertsListProps = {
  alerts: AlertItem[];
};

export default function AlertsList({ alerts }: AlertsListProps) {
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const sentimentClasses: Record<SentimentType, string> = {
    positive: "sentiment-card-positive",
    neutral: "sentiment-card-neutral",
    negative: "sentiment-card-negative",
  };

  const handleResolve = (id: string) => {
    setResolvedIds((prev) => [...prev, id]);
  };

  const filteredAlerts = alerts.filter(
    (alert) => !resolvedIds.includes(alert.id) && !alert.resolved
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend Alerts</CardTitle>
        <CardDescription>
          Urgent customer feedback requiring attention
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No alerts at the moment. All is well!
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-md shadow-sm border ${sentimentClasses[alert.sentiment]}`}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-sm">
                  {alert.platform.charAt(0).toUpperCase() + alert.platform.slice(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(alert.time, { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm mb-3">{alert.message}</p>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => handleResolve(alert.id)}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Resolve
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
