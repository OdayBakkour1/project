import { useState, useEffect, useMemo } from 'react';
import { Article, SearchFilters, UserPreferences } from '../types';
import { mockArticles } from '../data/mockArticles';

export function useArticles(filters: SearchFilters, preferences: UserPreferences) {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [loading, setLoading] = useState(false);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Search query filter
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesQuery = 
          article.title.toLowerCase().includes(query) ||
          article.summary.toLowerCase().includes(query) ||
          article.tags.some(tag => tag.toLowerCase().includes(query)) ||
          article.author.toLowerCase().includes(query);
        
        if (!matchesQuery) return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(article.category)) {
        return false;
      }

      // Source filter
      if (filters.sources.length > 0 && !filters.sources.includes(article.source.id)) {
        return false;
      }

      // Threat level filter
      if (filters.threatLevels.length > 0 && !filters.threatLevels.includes(article.threatLevel)) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.start && article.publishedAt < filters.dateRange.start) {
        return false;
      }
      if (filters.dateRange.end && article.publishedAt > filters.dateRange.end) {
        return false;
      }

      // Credibility score filter
      if (article.credibilityScore < filters.credibilityScore) {
        return false;
      }

      return true;
    }).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }, [articles, filters]);

  const generateAISummary = async (articleId: string): Promise<string> => {
    // Simulate AI summarization API call
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const summaries = [
      "AI Analysis: This vulnerability poses significant risk to enterprise networks. Immediate patching is recommended with priority on internet-facing systems.",
      "AI Summary: The attack leverages social engineering combined with technical exploitation. Organizations should enhance user training and implement additional monitoring.",
      "AI Insight: This threat represents an evolution in adversary tactics. The use of legitimate tools makes detection challenging, requiring behavioral analysis.",
      "AI Assessment: The incident highlights critical gaps in cloud security posture. Implementing zero-trust principles and regular audits is essential.",
      "AI Overview: This malware family introduces novel evasion techniques. Traditional signature-based detection may be insufficient."
    ];
    
    const randomSummary = summaries[Math.floor(Math.random() * summaries.length)];
    
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, aiSummary: randomSummary }
        : article
    ));
    
    setLoading(false);
    return randomSummary;
  };

  const toggleBookmark = (articleId: string) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, isBookmarked: !article.isBookmarked }
        : article
    ));
  };

  const markAsRead = (articleId: string) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, isRead: true }
        : article
    ));
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new articles arriving
      if (Math.random() > 0.95) {
        const newArticle: Article = {
          ...mockArticles[Math.floor(Math.random() * mockArticles.length)],
          id: `realtime-${Date.now()}`,
          publishedAt: new Date(),
          updatedAt: new Date(),
          isRead: false,
          isBookmarked: false
        };
        
        setArticles(prev => [newArticle, ...prev].slice(0, 100)); // Keep only latest 100
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    articles: filteredArticles,
    loading,
    generateAISummary,
    toggleBookmark,
    markAsRead
  };
}