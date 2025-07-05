/**
 * HomeTab Component
 * Displays the landing page with app overview and feature highlights
 * 
 * Props:
 * - setActiveTab: function - function to change the active tab
 */

import React, { memo } from 'react';
import { BookOpen, Target, Brain } from 'lucide-react';

const HomeTab = ({ setActiveTab }) => {
  const handleNavigation = (tabName) => {
    try {
      setActiveTab(tabName);
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  const handleKeyDown = (event, tabName) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigation(tabName);
    }
  };

  return (
    <main role="main">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Medical Learning App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Master infectious diseases and antimicrobial therapy with evidence-based clinical guidelines
        </p>
        <button 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          onClick={() => handleNavigation('conditions')}
          onKeyDown={(e) => handleKeyDown(e, 'conditions')}
        >
          Start Learning
        </button>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border">
          <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
            <BookOpen size={24} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Clinical Guidelines</h2>
          <p className="text-gray-600">
            Evidence-based treatment protocols from leading medical societies and pediatric infectious disease experts.
          </p>
        </div>
        
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border">
          <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
            <Target size={24} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Targeted Learning</h2>
          <p className="text-gray-600">
            Focus on high-yield infectious disease conditions commonly encountered in clinical practice.
          </p>
        </div>
        
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border">
          <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
            <Brain size={24} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Interactive Quizzes</h2>
          <p className="text-gray-600">
            Test your knowledge with case-based questions and detailed explanations for each answer.
          </p>
        </div>
      </div>
    </main>
  );
};

export default HomeTab;