import React from 'react';
import { X, User, Bell, Palette, Layout, Mail, Shield } from 'lucide-react';
import { UserPreferences, ArticleCategory, ThreatLevel } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

export function SettingsPanel({ isOpen, onClose, preferences, onUpdatePreferences }: SettingsPanelProps) {
  const handleCategoryToggle = (category: ArticleCategory) => {
    const updated = preferences.categories.includes(category)
      ? preferences.categories.filter(c => c !== category)
      : [...preferences.categories, category];
    onUpdatePreferences({ ...preferences, categories: updated });
  };

  const handleThreatLevelToggle = (level: ThreatLevel) => {
    const updated = preferences.threatLevels.includes(level)
      ? preferences.threatLevels.filter(l => l !== level)
      : [...preferences.threatLevels, level];
    onUpdatePreferences({ ...preferences, threatLevels: updated });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-gray-900 border-l border-gray-800 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Theme Settings */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Appearance</h3>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Theme</span>
                <select
                  value={preferences.theme}
                  onChange={(e) => onUpdatePreferences({ ...preferences, theme: e.target.value as 'dark' | 'light' })}
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Layout</span>
                <select
                  value={preferences.layout}
                  onChange={(e) => onUpdatePreferences({ ...preferences, layout: e.target.value as 'grid' | 'list' })}
                  className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="grid">Grid</option>
                  <option value="list">List</option>
                </select>
              </label>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Notifications</h3>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Push Notifications</span>
                <input
                  type="checkbox"
                  checked={preferences.notifications}
                  onChange={(e) => onUpdatePreferences({ ...preferences, notifications: e.target.checked })}
                  className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* Email Settings */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Email Digest</h3>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Enable Email Digest</span>
                <input
                  type="checkbox"
                  checked={preferences.emailDigest}
                  onChange={(e) => onUpdatePreferences({ ...preferences, emailDigest: e.target.checked })}
                  className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                />
              </label>
              {preferences.emailDigest && (
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Frequency</span>
                  <select
                    value={preferences.emailFrequency}
                    onChange={(e) => onUpdatePreferences({ ...preferences, emailFrequency: e.target.value as 'daily' | 'weekly' | 'realtime' })}
                    className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="realtime">Real-time</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </label>
              )}
            </div>
          </div>

          {/* Content Preferences */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">Content Preferences</h3>
            </div>
            
            {/* Preferred Threat Levels */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-400 mb-3">Preferred Threat Levels</h4>
              <div className="space-y-2">
                {(['critical', 'high', 'medium', 'low', 'info'] as ThreatLevel[]).map(level => (
                  <label key={level} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.threatLevels.includes(level)}
                      onChange={() => handleThreatLevelToggle(level)}
                      className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className={`text-sm capitalize ${
                      level === 'critical' ? 'text-red-400' :
                      level === 'high' ? 'text-orange-400' :
                      level === 'medium' ? 'text-yellow-400' :
                      level === 'low' ? 'text-blue-400' : 'text-gray-400'
                    }`}>
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Categories */}
            <div>
              <h4 className="text-sm text-gray-400 mb-3">Preferred Categories</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {([
                  'zero-day', 'data-breach', 'threat-intelligence', 'compliance',
                  'best-practices', 'emerging-threats', 'patches', 'research',
                  'malware', 'ransomware', 'phishing', 'vulnerability'
                ] as ArticleCategory[]).map(category => (
                  <label key={category} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={preferences.categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300 capitalize">
                      {category.replace('-', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-6 border-t border-gray-700">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}