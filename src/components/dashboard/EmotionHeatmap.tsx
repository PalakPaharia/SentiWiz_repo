
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type EmotionData } from "@/constants/platforms";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type EmotionHeatmapProps = {
  data: EmotionData[];
};

export default function EmotionHeatmap({ data }: EmotionHeatmapProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Emotion Trends</CardTitle>
        <CardDescription>
          Distribution of emotions over the past week
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="happy"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              name="Happy"
            />
            <Area
              type="monotone"
              dataKey="surprised"
              stackId="1"
              stroke="#06b6d4"
              fill="#06b6d4"
              name="Surprised"
            />
            <Area
              type="monotone"
              dataKey="fearful"
              stackId="1"
              stroke="#6366f1"
              fill="#6366f1"
              name="Fearful"
            />
            <Area
              type="monotone"
              dataKey="sad"
              stackId="1"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              name="Sad"
            />
            <Area
              type="monotone"
              dataKey="angry"
              stackId="1"
              stroke="#ef4444"
              fill="#ef4444"
              name="Angry"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
