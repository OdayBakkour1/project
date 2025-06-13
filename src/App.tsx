import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ArticleCard } from './components/ArticleCard';
import { SettingsPanel } from './components/SettingsPanel';
import { MarketingHeader } from './components/MarketingHeader';
import { MarketingFooter } from './components/MarketingFooter';
import { SignInSignUpForm } from './components/SignInSignUpForm';
import { useArticles } from './hooks/useArticles';
import { useLocalStorage } from './hooks/useLocalStorage';
import { SearchFilters, UserPreferences, ArticleCategory, ThreatLevel } from './types';
import CyberSecurityLandingPage from './components/ui/CyberSecurityLandingPage';
import CyberSecurityNewsFeed from './components/ui/CyberSecurityNewsFeed';

const defaultPreferences: UserPreferences = {
  categories: [],
  sources: [],
  threatLevels: [],
  emailDigest: false,
  emailFrequency: 'daily',
  notifications: true,
  theme: 'dark',
  layout: 'grid'
};

const defaultFilters: SearchFilters = {
  query: '',
  categories: [],
  sources: [],
  threatLevels: [],
  dateRange: { start: null, end: null },
  credibilityScore: 0
};

function App() {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('cyberwatch-preferences', defaultPreferences);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loadingSummaries, setLoadingSummaries] = useState<Set<string>>(new Set());
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isSignInForm, setIsSignInForm] = useState(true);

  const navigate = useNavigate();

  const { articles, loading, generateAISummary, toggleBookmark, markAsRead } = useArticles(filters, preferences);

  const handleSearch = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, query }));
  }, []);

  const handleCategoryFilter = useCallback((categories: ArticleCategory[]) => {
    setFilters(prev => ({ ...prev, categories }));
  }, []);

  const handleThreatLevelFilter = useCallback((threatLevels: ThreatLevel[]) => {
    setFilters(prev => ({ ...prev, threatLevels }));
  }, []);

  const handleSourceFilter = useCallback((sources: string[]) => {
    setFilters(prev => ({ ...prev, sources }));
  }, []);

  const handleGenerateAISummary = async (articleId: string) => {
    setLoadingSummaries(prev => new Set(prev).add(articleId));
    try {
      await generateAISummary(articleId);
    } finally {
      setLoadingSummaries(prev => {
        const newSet = new Set(prev);
        newSet.delete(articleId);
        return newSet;
      });
    }
  };

  const unreadCount = articles.filter(article => !article.isRead).length;

  const handleLoginSuccess = useCallback(() => {
    navigate('/feed'); // Redirect to news feed upon successful login
  }, [navigate]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Routes>
        <Route path="/" element={<CyberSecurityLandingPage onSignInSuccess={handleLoginSuccess} />} />
        <Route path="/feed" element={<CyberSecurityNewsFeed />} />
      </Routes>
    </div>
  );
}

export default App;