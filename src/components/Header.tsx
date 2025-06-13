import React, { useState } from 'react';
import { Search, Bell, Settings, Shield, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onToggleSettings: () => void;
  unreadAlerts: number;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export function Header({ onSearch, onToggleSettings, unreadAlerts, onToggleMobileMenu, isMobileMenuOpen }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">CyberWatch</h1>
                <p className="text-xs text-gray-400">Security Intelligence Hub</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search threats, vulnerabilities, articles..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Alerts */}
            <button className="relative p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
              <Bell size={20} />
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {unreadAlerts > 9 ? '9+' : unreadAlerts}
                </span>
              )}
            </button>

            {/* Settings */}
            <button
              onClick={onToggleSettings}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            >
              <Settings size={20} />
            </button>

            {/* Status Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}