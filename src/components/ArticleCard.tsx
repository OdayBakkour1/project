import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  Clock, User, ExternalLink, Bookmark, BookmarkCheck, 
  Sparkles, Eye, AlertTriangle, Shield, TrendingUp,
  ChevronDown, ChevronUp, Tag, Star
} from 'lucide-react';
import { Article, ThreatLevel } from '../types';

interface ArticleCardProps {
  article: Article;
  onBookmark: (id: string) => void;
  onGenerateAISummary: (id: string) => Promise<string>;
  onMarkAsRead: (id: string) => void;
  isGeneratingSummary?: boolean;
}

const threatLevelConfig: Record<ThreatLevel, { color: string; icon: React.ComponentType<any>; bg: string }> = {
  critical: { color: 'text-red-400', icon: AlertTriangle, bg: 'bg-red-900/20 border-red-500/30' },
  high: { color: 'text-orange-400', icon: AlertTriangle, bg: 'bg-orange-900/20 border-orange-500/30' },
  medium: { color: 'text-yellow-400', icon: TrendingUp, bg: 'bg-yellow-900/20 border-yellow-500/30' },
  low: { color: 'text-blue-400', icon: Shield, bg: 'bg-blue-900/20 border-blue-500/30' },
  info: { color: 'text-gray-400', icon: Shield, bg: 'bg-gray-800/50 border-gray-600/30' }
};

export function ArticleCard({ 
  article, 
  onBookmark, 
  onGenerateAISummary, 
  onMarkAsRead,
  isGeneratingSummary = false 
}: ArticleCardProps) {
  const [showAISummary, setShowAISummary] = useState(false);
  
  const threatConfig = threatLevelConfig[article.threatLevel];
  const ThreatIcon = threatConfig.icon;

  const handleCardClick = () => {
    if (!article.isRead) {
      onMarkAsRead(article.id);
    }
  };

  const handleGenerateAISummary = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!article.aiSummary) {
      await onGenerateAISummary(article.id);
    }
    setShowAISummary(!showAISummary);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark(article.id);
  };

  const handleReadFullArticle = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(article.source.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article 
      className={`bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer group ${!article.isRead ? 'ring-1 ring-blue-500/20' : ''}`}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* Threat Level Badge */}
            <div className={`flex items-center space-x-1 px-2 py-1 rounded border ${threatConfig.bg}`}>
              <ThreatIcon className={`w-3 h-3 ${threatConfig.color}`} />
              <span className={`text-xs font-medium uppercase ${threatConfig.color}`}>
                {article.threatLevel}
              </span>
            </div>
            
            {/* Category Badge */}
            <div className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300 capitalize">
              {article.category.replace('-', ' ')}
            </div>
            
            {/* Unread Indicator */}
            {!article.isRead && (
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                article.isBookmarked 
                  ? 'text-yellow-400 bg-yellow-900/20 hover:bg-yellow-900/30' 
                  : 'text-gray-400 hover:text-yellow-400 hover:bg-gray-700'
              }`}
            >
              {article.isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </button>
            
            <a
              href={article.source.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-gray-300 mb-4 line-clamp-3">
          {article.summary}
        </p>

        {/* Metadata - Updated Layout */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-400 mb-4 gap-x-4 gap-y-2">
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>{article.author}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4">
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{formatDistanceToNow(article.publishedAt, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={14} />
              <span>{article.readTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className={`w-4 h-4 ${article.credibilityScore >= 90 ? 'text-green-400' : article.credibilityScore >= 80 ? 'text-yellow-400' : 'text-gray-400'}`} />
              <span className="font-medium">{article.credibilityScore}%</span>
            </div>
          </div>
        </div>

        {/* CVE and Affected Products */}
        {(article.cveIds || article.affectedProducts) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.cveIds?.map(cve => (
              <span key={cve} className="px-2 py-1 bg-red-900/20 text-red-300 text-xs rounded border border-red-500/30">
                {cve}
              </span>
            ))}
            {article.affectedProducts?.map(product => (
              <span key={product} className="px-2 py-1 bg-blue-900/20 text-blue-300 text-xs rounded border border-blue-500/30">
                {product}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex items-center space-x-2 mb-4">
          <Tag size={14} className="text-gray-500" />
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Source and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${article.source.credibilityScore >= 90 ? 'bg-green-400' : article.source.credibilityScore >= 80 ? 'bg-yellow-400' : 'bg-gray-400'}`} />
            <span className="text-sm font-medium text-gray-300">{article.source.name}</span>
          </div>
          
          {/* AI Summary Button */}
          <button
            onClick={handleGenerateAISummary}
            disabled={isGeneratingSummary}
            className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={12} />
            <span>{isGeneratingSummary ? 'Generating...' : article.aiSummary ? 'View AI Summary' : 'AI Summarize'}</span>
          </button>
        </div>

        {/* AI Summary */}
        {showAISummary && article.aiSummary && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">AI Analysis</span>
            </div>
            <p className="text-sm text-gray-300">{article.aiSummary}</p>
          </div>
        )}

        {/* Read Full Article Button */}
        <button
          onClick={handleReadFullArticle}
          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm mt-3 transition-colors"
        >
          <ExternalLink size={16} />
          <span>Read Full Article</span>
        </button>
      </div>
    </article>
  );
}