/**
 * Header Component
 * Handles the main navigation and mobile menu for the application
 * 
 * Props:
 * - activeTab: string - currently active tab ('home', 'conditions', 'quiz')
 * - setActiveTab: function - function to change the active tab
 * - isMobile: boolean - whether the screen is mobile size
 * - showMobileMenu: boolean - whether mobile menu is open
 * - setShowMobileMenu: function - function to toggle mobile menu
 */

import React, { memo, useEffect } from 'react';
import { 
  Home, 
  Book, 
  Network, 
  FlaskConical, 
  Brain, 
  BarChart, 
  TrendingUp, 
  Stethoscope, 
  Menu, 
  X 
} from 'lucide-react';

const Header = ({ 
  activeTab, 
  setActiveTab, 
  isMobile, 
  showMobileMenu, 
  setShowMobileMenu 
}) => {
  // Define navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'conditions', label: 'Conditions', icon: Book },
    { id: 'pathogen-explorer', label: 'Pathogen Explorer', icon: Network },
    { id: 'simple-pathogen-explorer', label: 'Simple Explorer', icon: Stethoscope },
    { id: 'antibiotic-explorer', label: 'Antibiotic Explorer', icon: FlaskConical },
    { id: 'quiz', label: 'Quiz', icon: Brain },
    { id: 'visualizations', label: 'Visualizations', icon: BarChart },
    { id: 'user-progress', label: 'Progress', icon: TrendingUp }
  ];

  // Handle keyboard navigation and outside clicks
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showMobileMenu) {
        setShowMobileMenu(false);
      }
    };

    const handleClickOutside = (e) => {
      if (showMobileMenu && !e.target.closest('header')) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu, setShowMobileMenu]);

  return (
    <header className="bg-blue-700 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <Stethoscope size={24} />
          MedLearn
        </div>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex gap-4">
            {navItems.map(({ id, label, icon: Icon }) => (
              <div
                key={id}
                role="button"
                tabIndex={0}
                className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors ${
                  activeTab === id ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => setActiveTab(id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTab(id);
                  }
                }}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-md hover:bg-white hover:bg-opacity-10"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && showMobileMenu && (
        <div className="mt-4 py-4 border-t border-white border-opacity-20">
          <nav className="flex flex-col gap-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <div
                key={id}
                role="button"
                tabIndex={0}
                className={`flex items-center gap-3 cursor-pointer p-3 rounded-md transition-colors ${
                  activeTab === id ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => {
                  setActiveTab(id);
                  setShowMobileMenu(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveTab(id);
                    setShowMobileMenu(false);
                  }
                }}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;