
export type Platform = {
  id: string;
  name: string;
  icon: string;
  color: string;
  lastSync?: Date | null;
  isConnected: boolean;
};

export const PLATFORMS: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    color: '#E1306C',
    lastSync: null,
    isConnected: false
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    lastSync: null,
    isConnected: false
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'twitter',
    color: '#1DA1F2',
    lastSync: null,
    isConnected: false
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#0A66C2',
    lastSync: null,
    isConnected: false
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube',
    color: '#FF0000',
    lastSync: null,
    isConnected: false
  },
  {
    id: 'reviews',
    name: 'Google Reviews',
    icon: 'star',
    color: '#FFC107',
    lastSync: null,
    isConnected: false
  },
  {
    id: 'website',
    name: 'Website',
    icon: 'globe',
    color: '#4CAF50',
    lastSync: null,
    isConnected: false
  }
];

export type EmotionType = 'happy' | 'angry' | 'sad' | 'surprised' | 'fearful';

export type SentimentType = 'positive' | 'neutral' | 'negative';

export type Tag = {
  id: string;
  name: string;
  count: number;
  sentiment: Record<SentimentType, number>;
};

export const SAMPLE_TAGS: Tag[] = [
  {
    id: 'delivery',
    name: 'Delivery',
    count: 345,
    sentiment: {
      positive: 187,
      neutral: 102,
      negative: 56
    }
  },
  {
    id: 'quality',
    name: 'Quality',
    count: 278,
    sentiment: {
      positive: 201,
      neutral: 42,
      negative: 35
    }
  },
  {
    id: 'support',
    name: 'Support',
    count: 213,
    sentiment: {
      positive: 97,
      neutral: 64,
      negative: 52
    }
  },
  {
    id: 'pricing',
    name: 'Pricing',
    count: 176,
    sentiment: {
      positive: 58,
      neutral: 67,
      negative: 51
    }
  },
  {
    id: 'usability',
    name: 'Usability',
    count: 142,
    sentiment: {
      positive: 87,
      neutral: 39,
      negative: 16
    }
  }
];

export type WordCloudItem = {
  text: string;
  value: number;
};

export const SAMPLE_WORDCLOUD: Record<SentimentType, WordCloudItem[]> = {
  positive: [
    { text: 'excellent', value: 64 },
    { text: 'great', value: 59 },
    { text: 'love', value: 52 },
    { text: 'amazing', value: 45 },
    { text: 'helpful', value: 41 },
    { text: 'fast', value: 38 },
    { text: 'reliable', value: 37 },
    { text: 'quality', value: 35 },
    { text: 'friendly', value: 33 },
    { text: 'recommend', value: 31 },
    { text: 'awesome', value: 28 },
    { text: 'easy', value: 26 },
    { text: 'professional', value: 24 },
    { text: 'satisfied', value: 22 },
    { text: 'responsive', value: 20 }
  ],
  neutral: [
    { text: 'okay', value: 42 },
    { text: 'average', value: 38 },
    { text: 'decent', value: 32 },
    { text: 'expected', value: 30 },
    { text: 'fine', value: 28 },
    { text: 'standard', value: 25 },
    { text: 'normal', value: 22 },
    { text: 'regular', value: 20 },
    { text: 'typical', value: 19 },
    { text: 'fair', value: 17 },
    { text: 'moderate', value: 15 },
    { text: 'mediocre', value: 14 },
    { text: 'adequate', value: 13 },
    { text: 'acceptable', value: 12 },
    { text: 'common', value: 10 }
  ],
  negative: [
    { text: 'slow', value: 48 },
    { text: 'expensive', value: 42 },
    { text: 'disappointing', value: 39 },
    { text: 'poor', value: 36 },
    { text: 'issue', value: 33 },
    { text: 'problem', value: 31 },
    { text: 'broken', value: 28 },
    { text: 'terrible', value: 25 },
    { text: 'frustrating', value: 23 },
    { text: 'difficult', value: 20 },
    { text: 'useless', value: 18 },
    { text: 'bad', value: 17 },
    { text: 'awful', value: 15 },
    { text: 'horrible', value: 13 },
    { text: 'waste', value: 12 }
  ]
};

export type AlertItem = {
  id: string;
  platform: string;
  message: string;
  sentiment: SentimentType;
  time: Date;
  resolved: boolean;
};

export const SAMPLE_ALERTS: AlertItem[] = [
  {
    id: '1',
    platform: 'instagram',
    message: 'Very disappointed with the customer service. No one responded to my message for days!',
    sentiment: 'negative',
    time: new Date(Date.now() - 1000 * 60 * 60),
    resolved: false
  },
  {
    id: '2',
    platform: 'facebook',
    message: 'Product arrived damaged and support isn\'t helping. Terrible experience!',
    sentiment: 'negative',
    time: new Date(Date.now() - 1000 * 60 * 120),
    resolved: false
  },
  {
    id: '3',
    platform: 'twitter',
    message: '@YourCompany is the worst! Will never buy from them again. #BoycottCompany',
    sentiment: 'negative',
    time: new Date(Date.now() - 1000 * 60 * 180),
    resolved: false
  },
  {
    id: '4',
    platform: 'reviews',
    message: '1 star review. Completely useless product that broke after 2 days. Save your money!',
    sentiment: 'negative',
    time: new Date(Date.now() - 1000 * 60 * 300),
    resolved: true
  }
];

export type EmotionData = {
  date: string;
  happy: number;
  angry: number;
  sad: number;
  surprised: number;
  fearful: number;
};

export const SAMPLE_EMOTION_DATA: EmotionData[] = [
  {
    date: '2023-04-14',
    happy: 65,
    angry: 12,
    sad: 8,
    surprised: 10,
    fearful: 5
  },
  {
    date: '2023-04-15',
    happy: 68,
    angry: 10,
    sad: 7,
    surprised: 9,
    fearful: 6
  },
  {
    date: '2023-04-16',
    happy: 70,
    angry: 9,
    sad: 6,
    surprised: 8,
    fearful: 7
  },
  {
    date: '2023-04-17',
    happy: 60,
    angry: 14,
    sad: 10,
    surprised: 9,
    fearful: 7
  },
  {
    date: '2023-04-18',
    happy: 55,
    angry: 18,
    sad: 12,
    surprised: 8,
    fearful: 7
  },
  {
    date: '2023-04-19',
    happy: 58,
    angry: 15,
    sad: 10,
    surprised: 10,
    fearful: 7
  },
  {
    date: '2023-04-20',
    happy: 62,
    angry: 12,
    sad: 9,
    surprised: 11,
    fearful: 6
  }
];

export type KPI = {
  id: string;
  name: string;
  value: string | number;
  change: number;
  icon: string;
};

export const SAMPLE_KPIS: KPI[] = [
  {
    id: 'total-comments',
    name: 'Total Comments',
    value: '4,827',
    change: 12.4,
    icon: 'message-square'
  },
  {
    id: 'positive-sentiment',
    name: 'Positive Sentiment',
    value: '68%',
    change: 5.2,
    icon: 'smile'
  },
  {
    id: 'negative-sentiment',
    name: 'Negative Sentiment',
    value: '18%',
    change: -3.1,
    icon: 'frown'
  },
  {
    id: 'avg-response',
    name: 'Avg. Response Time',
    value: '4.2h',
    change: -8.5,
    icon: 'clock'
  }
];
