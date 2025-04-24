
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Tag } from "@/constants/platforms";
import { Progress } from "@/components/ui/progress";

type TagSentimentBlockProps = {
  tags: Tag[];
};

export default function TagSentimentBlock({ tags }: TagSentimentBlockProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tag Sentiment</CardTitle>
        <CardDescription>
          Common topics in customer feedback
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {tags.map((tag) => {
          const total = tag.sentiment.positive + tag.sentiment.neutral + tag.sentiment.negative;
          const positivePercentage = (tag.sentiment.positive / total) * 100;
          const neutralPercentage = (tag.sentiment.neutral / total) * 100;
          const negativePercentage = (tag.sentiment.negative / total) * 100;

          return (
            <div key={tag.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{tag.name}</h4>
                <span className="text-sm text-muted-foreground">{tag.count} mentions</span>
              </div>
              <div className="h-2.5 flex rounded-full overflow-hidden">
                <div
                  className="bg-sentiment-positive"
                  style={{ width: `${positivePercentage}%` }}
                ></div>
                <div
                  className="bg-sentiment-neutral"
                  style={{ width: `${neutralPercentage}%` }}
                ></div>
                <div
                  className="bg-sentiment-negative"
                  style={{ width: `${negativePercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{Math.round(positivePercentage)}% Positive</span>
                <span>{Math.round(neutralPercentage)}% Neutral</span>
                <span>{Math.round(negativePercentage)}% Negative</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
