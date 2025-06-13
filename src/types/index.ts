export interface NewsSource {
  id: string;
  name: string;
  url: string;
  rssUrl: string;
  category: 'news' | 'research' | 'government' | 'vendor' | 'blog';
  credibilityScore: number;
  lastUpdated: Date;
  isActive: boolean;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  source: NewsSource;
  publishedAt: Date;
  updatedAt: Date;
  category: ArticleCategory;
  tags: string[];
  threatLevel: ThreatLevel;
  credibilityScore: number;
  readTime: number;
  isBookmarked: boolean;
  isRead: boolean;
  aiSummary?: string;
  cveIds?: string[];
  affectedProducts?: string[];
  severityScore?: number;
}

export type ArticleCategory = 
  | 'zero-day'
  | 'data-breach'
  | 'threat-intelligence'
  | 'compliance'
  | 'best-practices'
  | 'emerging-threats'
  | 'patches'
  | 'research'
  | 'malware'
  | 'ransomware'
  | 'phishing'
  | 'vulnerability';

export type ThreatLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface UserPreferences {
  categories: ArticleCategory[];
  sources: string[];
  threatLevels: ThreatLevel[];
  emailDigest: boolean;
  emailFrequency: 'daily' | 'weekly' | 'realtime';
  notifications: boolean;
  theme: 'dark' | 'light';
  layout: 'grid' | 'list';
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  isRead: boolean;
  articleId?: string;
}

export interface SearchFilters {
  query: string;
  categories: ArticleCategory[];
  sources: string[];
  threatLevels: ThreatLevel[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  credibilityScore: number;
}