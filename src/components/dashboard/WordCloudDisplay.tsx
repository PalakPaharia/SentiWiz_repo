import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type WordCloudItem, type SentimentType } from "@/constants/platforms";
import { useState } from "react";

// Sample data moved into component for simplicity
const SAMPLE_WORDCLOUD = {
  positive: [
    { text: "excellent", value: 64 },
    { text: "great", value: 59 },
    { text: "love", value: 52 },
    { text: "amazing", value: 45 },
    { text: "helpful", value: 41 },
    { text: "fast", value: 38 },
    { text: "reliable", value: 37 },
    { text: "quality", value: 35 },
    { text: "friendly", value: 33 },
    { text: "recommend", value: 31 },
    { text: "awesome", value: 28 },
    { text: "easy", value: 26 },
    { text: "professional", value: 24 },
    { text: "satisfied", value: 22 },
    { text: "responsive", value: 20 }
  ],
  neutral: [
    { text: "okay", value: 42 },
    { text: "average", value: 38 },
    { text: "decent", value: 32 },
    { text: "expected", value: 30 },
    { text: "fine", value: 28 },
    { text: "standard", value: 25 },
    { text: "normal", value: 22 },
    { text: "regular", value: 20 },
    { text: "typical", value: 19 },
    { text: "fair", value: 17 }
  ],
  negative: [
    { text: "slow", value: 48 },
    { text: "expensive", value: 42 },
    { text: "disappointing", value: 39 },
    { text: "poor", value: 36 },
    { text: "issue", value: 33 },
    { text: "problem", value: 31 },
    { text: "broken", value: 28 },
    { text: "terrible", value: 25 },
    { text: "frustrating", value: 23 },
    { text: "difficult", value: 20 }
  ]
} as const;

export default function WordCloudDisplay() {
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType>("positive");

  // Function to get font size based on value
  const getFontSize = (value: number) => {
    const minSize = 14;
    const maxSize = 32;
    const normalized = (value - 20) / (64 - 20); // Normalize between min and max values in data
    return Math.floor(minSize + normalized * (maxSize - minSize));
  };

  // Get color based on sentiment
  const getColor = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "positive":
        return "text-green-500";
      case "neutral":
        return "text-gray-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Word Cloud</CardTitle>
        <CardDescription>
          Most common terms from customer feedback
        </CardDescription>
        <div className="flex gap-2 mt-2">
          <Button
            variant={selectedSentiment === "positive" ? "default" : "outline"}
            onClick={() => setSelectedSentiment("positive")}
            className="bg-green-500 hover:bg-green-600"
          >
            Positive
          </Button>
          <Button
            variant={selectedSentiment === "neutral" ? "default" : "outline"}
            onClick={() => setSelectedSentiment("neutral")}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Neutral
          </Button>
          <Button
            variant={selectedSentiment === "negative" ? "default" : "outline"}
            onClick={() => setSelectedSentiment("negative")}
            className="bg-red-500 hover:bg-red-600"
          >
            Negative
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-[300px] w-full bg-muted/10 rounded-lg p-6">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {SAMPLE_WORDCLOUD[selectedSentiment].map((item) => (
              <span
                key={item.text}
                className={`${getColor(selectedSentiment)} transition-all duration-200 hover:opacity-80 cursor-default`}
                style={{
                  fontSize: `${getFontSize(item.value)}px`,
                  fontWeight: item.value > 40 ? 600 : 400,
                }}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
