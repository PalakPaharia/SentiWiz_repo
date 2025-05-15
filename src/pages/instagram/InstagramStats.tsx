import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function InstagramStats() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Instagram Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground text-lg py-8">
            Charts and stats for Instagram will appear here.<br />
            (Coming soon)
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 