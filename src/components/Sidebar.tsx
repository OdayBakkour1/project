import React from 'react';
import { 
  Shield, AlertTriangle, Database, FileText, Users, 
  Zap, Bug, Search, BookOpen, TrendingUp, Filter,
  Globe, Building, Microscope, MessageSquare
} from 'lucide-react';
import { ArticleCategory, ThreatLevel } from '../types';
import { cybersecuritySources } from '../data/sources';

interface SidebarProps {
  selectedCategories: ArticleCategory[];
  selectedThreatLevels: ThreatLevel[];
  selectedSources: string[];
  onCategoryChange: (categories: ArticleCategory[]) => void;
  onThreatLevelChange: (levels: ThreatLevel[]) => void;
  onSourceChange: (sources: string[]) => void;
  isOpen: boolean;
}

const categoryIcons: Record<ArticleCategory, React.ComponentType<{ size?: number; className?: string }>> = {
  'zero-day': AlertTriangle,
  'data-breach': Database,
  'threat-intelligence': Search,
  'compliance': FileText,
  'best-practices': BookOpen,
  'emerging-threats': TrendingUp,
  'patches': Shield,
  'research': Microscope,
  'malware': Bug,
  'ransomware': Zap,
  'phishing': Users,
  'vulnerability': AlertTriangle
};

const categoryLabels: Record<ArticleCategory, string> = {
  'zero-day': 'Zero-Day Exploits',
  'data-breach': 'Data Breaches',
  'threat-intelligence': 'Threat Intelligence',
  'compliance': 'Compliance Updates',
  'best-practices': 'Best Practices',
  'emerging-threats': 'Emerging Threats',
  'patches': 'Security Patches',
  'research': 'Security Research',
  'malware': 'Malware Analysis',
  'ransomware': 'Ransomware',
  'phishing': 'Phishing Campaigns',
  'vulnerability': 'Vulnerabilities'
};

const threatLevelColors: Record<ThreatLevel, string> = {
  critical: 'text-red-400',
  high: 'text-orange-400',
  medium: 'text-yellow-400',
  low: 'text-blue-400',
  info: 'text-gray-400'
};

export function Sidebar({
  selectedCategories,
  selectedThreatLevels,
  selectedSources,
  onCategoryChange,
  onThreatLevelChange,
  onSourceChange,
  isOpen
}: SidebarProps) {
  const handleCategoryToggle = (category: ArticleCategory) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(updated);
  };

  const handleThreatLevelToggle = (level: ThreatLevel) => {
    const updated = selectedThreatLevels.includes(level)
      ? selectedThreatLevels.filter(l => l !== level)
      : [...selectedThreatLevels, level];
    onThreatLevelChange(updated);
  };

  const clearAllFilters = () => {
    onCategoryChange([]);
    onThreatLevelChange([]);
    onSourceChange([]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedThreatLevels.length > 0 || selectedSources.length > 0;

  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 w-64 h-screen bg-gray-900 border-r border-gray-800 overflow-y-auto transition-transform duration-300 ease-in-out`}>
      <div className="p-4">
        {/* Threat Levels - Minimal Style */}
        <div className="mb-6">
          <div className="space-y-2">
            {(['critical', 'high', 'medium', 'low', 'info'] as ThreatLevel[]).map(level => (
              <label key={level} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedThreatLevels.includes(level)}
                  onChange={() => handleThreatLevelToggle(level)}
                  className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className={`text-sm font-medium capitalize ${threatLevelColors[level]} group-hover:opacity-80 transition-opacity`}>
                  {level}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories Header */}
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wider">Categories</h3>
        </div>

        {/* Categories - Minimal Style */}
        <div className="space-y-2">
          {Object.entries(categoryLabels).map(([category, label]) => {
            const Icon = categoryIcons[category as ArticleCategory];
            const isSelected = selectedCategories.includes(category as ArticleCategory);
            
            return (
              <label key={category} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCategoryToggle(category as ArticleCategory)}
                  className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-gray-500'} group-hover:text-blue-300 transition-colors`} />
                <span className={`text-sm ${isSelected ? 'text-white' : 'text-gray-300'} group-hover:text-white transition-colors`}>
                  {label}
                </span>
              </label>
            );
          })}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="mt-6 pt-4 border-t border-gray-700">
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}