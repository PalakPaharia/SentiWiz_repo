
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type KPI } from "@/constants/platforms";
import { ArrowDown, ArrowUp, BarChart3, Clock, Frown, MessageSquare, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

type KPICardProps = {
  kpi: KPI;
};

const iconMap: Record<string, React.ReactNode> = {
  "message-square": <MessageSquare className="h-5 w-5" />,
  "smile": <Smile className="h-5 w-5" />,
  "frown": <Frown className="h-5 w-5" />,
  "clock": <Clock className="h-5 w-5" />,
  "bar-chart": <BarChart3 className="h-5 w-5" />,
};

export default function KPICard({ kpi }: KPICardProps) {
  const icon = iconMap[kpi.icon] || <BarChart3 className="h-5 w-5" />;
  
  const isPositiveChange = kpi.change > 0;
  const isNegativeMetric = kpi.id === 'negative-sentiment' || kpi.id === 'avg-response';
  
  // If it's a negative metric (like negative sentiment), then a negative change is good
  const isGood = isNegativeMetric ? !isPositiveChange : isPositiveChange;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {kpi.name}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{kpi.value}</div>
        <CardDescription className="flex items-center pt-1">
          {isPositiveChange ? (
            <ArrowUp className={cn("h-4 w-4 mr-1", isGood ? "text-sentiment-positive" : "text-sentiment-negative")} />
          ) : (
            <ArrowDown className={cn("h-4 w-4 mr-1", isGood ? "text-sentiment-positive" : "text-sentiment-negative")} />
          )}
          <span className={cn(
            isGood ? "text-sentiment-positive" : "text-sentiment-negative"
          )}>
            {Math.abs(kpi.change)}%
          </span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
