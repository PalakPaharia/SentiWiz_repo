import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import KPICard from '@/components/dashboard/KPICard';
import EmotionHeatmap from '@/components/dashboard/EmotionHeatmap';
import TagSentimentBlock from '@/components/dashboard/TagSentimentBlock';
import WordCloudDisplay from '@/components/dashboard/WordCloudDisplay';
import AlertsList from '@/components/dashboard/AlertsList';
import DateRangePicker, { DateRange } from '@/components/dashboard/DateRangePicker';
import { 
  SAMPLE_KPIS, 
  SAMPLE_EMOTION_DATA, 
  SAMPLE_TAGS, 
  SAMPLE_WORDCLOUD,
  SAMPLE_ALERTS,
  PLATFORMS,
  Platform
} from '@/constants/platforms';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user } = useAuth();
  const [platforms, setPlatforms] = useState<Platform[]>(PLATFORMS);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [syncingPlatform, setSyncingPlatform] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date()
  });
  const [filteredData, setFilteredData] = useState({
    kpis: SAMPLE_KPIS,
    emotionData: SAMPLE_EMOTION_DATA,
    tags: SAMPLE_TAGS,
    wordcloud: SAMPLE_WORDCLOUD,
    alerts: SAMPLE_ALERTS
  });
  
  // Get user name from user_metadata or use a fallback
  const userName = user?.user_metadata?.name || 'User';

  // Handle date range changes
  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange);
    
    // This would normally fetch data from an API with the new date range
    // For this demo, we'll simulate filtering by randomly adjusting values
    
    // Filter KPIs - simulate changes based on date range
    const adjustedKpis = SAMPLE_KPIS.map(kpi => ({
      ...kpi,
      value: typeof kpi.value === 'string' 
        ? kpi.value
        : Math.round(Number(kpi.value) * (0.85 + Math.random() * 0.3)),
      change: Math.round((kpi.change * (0.7 + Math.random() * 0.6)) * 10) / 10
    }));
    
    // Filter emotion data - keep only dates within range
    const adjustedEmotionData = SAMPLE_EMOTION_DATA.filter(item => {
      const date = new Date(item.date);
      return date >= newDateRange.from && date <= newDateRange.to;
    });
    
    // Update filtered data state
    setFilteredData({
      kpis: adjustedKpis,
      emotionData: adjustedEmotionData.length > 0 ? adjustedEmotionData : SAMPLE_EMOTION_DATA,
      tags: SAMPLE_TAGS.map(tag => ({
        ...tag,
        count: Math.round(tag.count * (0.8 + Math.random() * 0.4)),
        sentiment: {
          positive: Math.round(tag.sentiment.positive * (0.7 + Math.random() * 0.6)),
          neutral: Math.round(tag.sentiment.neutral * (0.7 + Math.random() * 0.6)),
          negative: Math.round(tag.sentiment.negative * (0.7 + Math.random() * 0.6)),
        }
      })),
      wordcloud: SAMPLE_WORDCLOUD,
      alerts: SAMPLE_ALERTS.filter(() => Math.random() > 0.3) // Randomly filter some alerts
    });
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Update some platforms as connected with last sync for demo
      setPlatforms(prev => 
        prev.map((platform, index) => ({
          ...platform,
          isConnected: index < 3,
          lastSync: index < 3 ? new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24) : null
        }))
      );
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSyncPlatform = async (platformId: string) => {
    setSyncingPlatform(platformId);
    
    // Simulate API call to sync platform
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Update the lastSync time
    setPlatforms(prev => 
      prev.map(platform => 
        platform.id === platformId 
          ? { ...platform, lastSync: new Date() } 
          : platform
      )
    );
    
    toast({
      title: "Platform Synced",
      description: "Your platform data has been updated successfully.",
    });
    
    setSyncingPlatform(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {userName}! Here's an overview of your sentiment data.
        </p>
      </div>

      {/* Date Range Picker */}
      <DateRangePicker onDateRangeChange={handleDateRangeChange} />

      {/* KPI cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredData.kpis.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </div>

      {/* Platform sync status */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Connected Platforms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.filter(p => p.isConnected).map((platform) => (
            <div 
              key={platform.id} 
              className="flex items-center p-4 bg-card rounded-lg border shadow-sm"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: platform.color }}
              >
                <span className="text-white">{platform.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{platform.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {platform.lastSync 
                    ? `Last synced ${format(platform.lastSync, "MMMM d, yyyy 'at' HH:mm")}`
                    : 'Not synced yet'}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleSyncPlatform(platform.id)}
                disabled={syncingPlatform === platform.id}
              >
                <RefreshCw className={`h-4 w-4 ${syncingPlatform === platform.id ? 'animate-spin' : ''}`} />
                <span className="ml-2 hidden sm:inline">{syncingPlatform === platform.id ? 'Syncing...' : 'Sync Now'}</span>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Charts and analysis - Rearranged to put Alerts and TagSentimentBlock side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EmotionHeatmap data={filteredData.emotionData} />
        <div className="grid grid-cols-1 gap-8">
          <AlertsList alerts={filteredData.alerts} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TagSentimentBlock tags={filteredData.tags} />
        <WordCloudDisplay data={filteredData.wordcloud} />
      </div>
    </div>
  );
}
