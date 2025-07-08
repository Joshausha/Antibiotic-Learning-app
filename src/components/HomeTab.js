/**
 * HomeTab Component
 * Displays the landing page with app overview and feature highlights
 * 
 * Props:
 * - setActiveTab: function - function to change the active tab
 */

import React, { memo } from 'react';
import { BookOpen, Target, Brain, TrendingUp, Award } from 'lucide-react';
import { ProgressBar, CircularProgress } from './ProgressIndicator';

const HomeTab = ({ setActiveTab }) => {
  // Mock user progress data for demonstration
  const userProgress = {
    totalQuizzes: 3,
    averageScore: 85,
    sectionsCompleted: 2,
    totalSections: 6,
    weeklyGoal: 5,
    weeklyProgress: 3
  };
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
          className="btn-primary px-8 py-3 text-lg w-full md:w-auto"
          onClick={() => handleNavigation('conditions')}
          onKeyDown={(e) => handleKeyDown(e, 'conditions')}
        >
          Start Learning
        </button>
      </div>

      {/* Progress Dashboard */}
      {userProgress.totalQuizzes > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <div className="flex items-center justify-center mb-4">
              <CircularProgress 
                progress={userProgress.sectionsCompleted}
                total={userProgress.totalSections}
                size="lg"
                color="green"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Learning Progress</h3>
            <p className="text-gray-600">
              {userProgress.sectionsCompleted} of {userProgress.totalSections} sections completed
            </p>
          </div>

          <div className="card text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Average Score</h3>
            <p className="text-2xl font-bold text-blue-600 mb-2">{userProgress.averageScore}%</p>
            <p className="text-gray-600">Based on {userProgress.totalQuizzes} quizzes</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Weekly Goal</h3>
              <Award className="text-yellow-600" size={20} />
            </div>
            <ProgressBar 
              progress={userProgress.weeklyProgress}
              total={userProgress.weeklyGoal}
              showStats={true}
              color="yellow"
            />
            <p className="text-sm text-gray-600 mt-2">
              {userProgress.weeklyProgress} of {userProgress.weeklyGoal} quizzes this week
            </p>
          </div>
        </div>
      )}

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