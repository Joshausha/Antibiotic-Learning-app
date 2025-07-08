/**
 * QuizTab Component
 * Handles the complete quiz functionality including questions, answers, and results
 * 
 * Props:
 * - quizQuestions: array - array of quiz question objects
 * - setActiveTab: function - function to change active tab (for navigation after quiz)
 */

import React, { useState, memo, useMemo } from 'react';
import { CheckCircle, Filter, BarChart3, Trophy, BookOpen } from 'lucide-react';
import { QuizProgress } from './ProgressIndicator';
import SkeletonLoader from './SkeletonLoader';
import ErrorMessage from './ErrorMessage';

const QuizTab = ({ quizQuestions, setActiveTab }) => {
  // Quiz state management
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Difficulty selection state
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showDifficultySelection, setShowDifficultySelection] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState(quizQuestions);

  // Filter questions by difficulty
  const filterQuestionsByDifficulty = (difficulty) => {
    if (difficulty === 'all') {
      return quizQuestions;
    }
    return quizQuestions.filter(q => q.difficulty === difficulty);
  };

  // Get difficulty statistics
  const difficultyStats = useMemo(() => {
    const stats = { all: 0, beginner: 0, intermediate: 0, advanced: 0 };
    quizQuestions.forEach(q => {
      stats.all++;
      const difficulty = q.difficulty || 'intermediate';
      stats[difficulty] = (stats[difficulty] || 0) + 1;
    });
    return stats;
  }, [quizQuestions]);

  // Handle difficulty selection
  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    const filtered = filterQuestionsByDifficulty(difficulty);
    setFilteredQuestions(filtered);
    setShowDifficultySelection(false);
  };

  // Start a new quiz
  const startQuiz = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setQuizMode(true);
      setCurrentQuizQuestion(0);
      setQuizScore(0);
      setSelectedAnswers({});
      setShowQuizResult(false);
      setIsLoading(false);
    }, 500);
  };

  // Handle answer selection
  const handleQuizAnswer = (answerIndex) => {
    // Store the selected answer
    const newAnswers = { ...selectedAnswers };
    newAnswers[currentQuizQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    // Check if answer is correct and update score
    if (answerIndex === filteredQuestions[currentQuizQuestion].correct) {
      setQuizScore(quizScore + 1);
    }

    // Move to next question or show results after a delay
    setTimeout(() => {
      if (currentQuizQuestion < filteredQuestions.length - 1) {
        setCurrentQuizQuestion(currentQuizQuestion + 1);
      } else {
        setShowQuizResult(true);
      }
    }, 1500);
  };

  // Reset quiz to initial state
  const resetQuiz = () => {
    setQuizMode(false);
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setSelectedAnswers({});
    setShowQuizResult(false);
    setError(null);
  };

  // Calculate progress percentage
  const progressPercentage = filteredQuestions.length > 0 ? ((currentQuizQuestion + 1) / filteredQuestions.length) * 100 : 0;

  // Calculate final score percentage
  const scorePercentage = filteredQuestions.length > 0 ? Math.round((quizScore / filteredQuestions.length) * 100) : 0;

  // Handle quiz errors
  const handleError = (errorMessage) => {
    setError(errorMessage);
    setIsLoading(false);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <SkeletonLoader type="quiz" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage
          title="Quiz Error"
          message={error}
          onRetry={() => {
            setError(null);
            startQuiz();
          }}
          onHome={() => setActiveTab('home')}
          showRetry={true}
          showHome={true}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Quiz Start Screen */}
      {!quizMode ? (
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Knowledge Assessment</h2>
            <p className="text-gray-600 mb-6">
              Test your understanding of infectious diseases and antimicrobial therapy with{' '}
              <strong>{filteredQuestions.length}</strong> clinical questions.
            </p>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Filter size={20} />
                Difficulty Level
              </h3>
              <button
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                onClick={() => setShowDifficultySelection(!showDifficultySelection)}
              >
                <BarChart3 size={16} />
                View Stats
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { key: 'all', label: 'All Questions', icon: '📚', color: 'blue' },
                { key: 'beginner', label: 'Beginner', icon: '🌱', color: 'green' },
                { key: 'intermediate', label: 'Intermediate', icon: '🎯', color: 'yellow' },
                { key: 'advanced', label: 'Advanced', icon: '🏆', color: 'red' }
              ].map(({ key, label, icon, color }) => (
                <button
                  key={key}
                  className={`p-3 rounded-lg border-2 transition-all text-sm ${
                    selectedDifficulty === key 
                      ? `bg-${color}-50 border-${color}-500 text-${color}-800` 
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => handleDifficultySelect(key)}
                >
                  <div className="text-lg mb-1">{icon}</div>
                  <div className="font-medium">{label}</div>
                  <div className="text-xs text-gray-500">{difficultyStats[key] || 0} questions</div>
                </button>
              ))}
            </div>

            {showDifficultySelection && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">Difficulty Breakdown:</h4>
                <div className="space-y-2">
                  {Object.entries(difficultyStats).map(([difficulty, count]) => {
                    if (difficulty === 'all') return null;
                    const percentage = ((count / difficultyStats.all) * 100).toFixed(1);
                    return (
                      <div key={difficulty} className="flex items-center justify-between text-sm">
                        <span className="capitalize text-gray-700">{difficulty}:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                difficulty === 'beginner' ? 'bg-green-500' :
                                difficulty === 'intermediate' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-gray-600 w-16">{count} ({percentage}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quiz Features */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Quiz Features:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Evidence-based clinical scenarios</li>
              <li>• Detailed explanations for each answer</li>
              <li>• Immediate feedback on your responses</li>
              <li>• Progress tracking throughout the quiz</li>
              <li>• Difficulty-based question filtering</li>
            </ul>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg w-full md:w-auto"
              onClick={startQuiz}
              disabled={filteredQuestions.length === 0}
            >
              Start {selectedDifficulty !== 'all' ? `${selectedDifficulty} ` : ''}Quiz
              {filteredQuestions.length > 0 && ` (${filteredQuestions.length} questions)`}
            </button>
          </div>
        </div>
      ) : showQuizResult ? (
        /* Quiz Results Screen */
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <CheckCircle 
            size={64} 
            className={`mx-auto mb-4 ${quizScore >= 3 ? 'text-green-500' : 'text-red-500'}`} 
          />
          <h2 className="text-2xl font-semibold mb-4">Quiz Complete!</h2>
          <div className="mb-6">
            <p className="text-3xl font-bold mb-2">
              {quizScore}/{filteredQuestions.length}
            </p>
            <p className="text-xl text-gray-600 mb-4">
              ({scorePercentage}%)
            </p>
            <div className="text-sm text-gray-500 mb-4">
              Difficulty: <span className="capitalize font-medium">{selectedDifficulty}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  scorePercentage >= 80 ? 'bg-green-500' : scorePercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${scorePercentage}%` }}
              />
            </div>
          </div>
          
          {/* Performance Message */}
          <div className={`p-4 rounded-lg mb-8 ${
            scorePercentage >= 90 ? 'bg-green-50 border border-green-200' :
            scorePercentage >= 70 ? 'bg-yellow-50 border border-yellow-200' :
            'bg-red-50 border border-red-200'
          }`}>
            <p className={`font-semibold ${
              scorePercentage >= 90 ? 'text-green-800' :
              scorePercentage >= 70 ? 'text-yellow-800' :
              'text-red-800'
            }`}>
              {scorePercentage >= 90 ? 'Excellent! 🎉' :
               scorePercentage >= 70 ? 'Good job! 👍' :
               'Keep studying! 📚'}
            </p>
            <p className={`text-sm mt-1 ${
              scorePercentage >= 90 ? 'text-green-700' :
              scorePercentage >= 70 ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {scorePercentage >= 90 ? 'You have an excellent understanding of the material.' :
               scorePercentage >= 70 ? 'You have a solid understanding. Review the explanations to improve further.' :
               'Consider reviewing the conditions and try again to improve your understanding.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn-primary px-6 py-3 w-full sm:w-auto"
              onClick={resetQuiz}
            >
              Take Again
            </button>
            <button 
              className="btn-secondary px-6 py-3 w-full sm:w-auto"
              onClick={() => setActiveTab('conditions')}
            >
              Review Conditions
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Question Screen */
        <div className="bg-white rounded-xl p-4 md:p-8 shadow-sm">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p>No questions available for the selected difficulty level.</p>
              <button 
                className="mt-4 text-blue-600 hover:text-blue-800 underline"
                onClick={() => handleDifficultySelect('all')}
              >
                View all questions
              </button>
            </div>
          ) : (
            <>
              {/* Enhanced Progress Indicator */}
              <QuizProgress
                currentQuestion={currentQuizQuestion + 1}
                totalQuestions={filteredQuestions.length}
                correctAnswers={quizScore}
                showStats={currentQuizQuestion > 0}
                className="mb-6"
              />

              {/* Question Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Question {currentQuizQuestion + 1} of {filteredQuestions.length}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    filteredQuestions[currentQuizQuestion].difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    filteredQuestions[currentQuizQuestion].difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {filteredQuestions[currentQuizQuestion].difficulty || 'intermediate'}
                  </span>
                </div>
                <h3 className="text-xl font-semibold leading-relaxed">
                  {filteredQuestions[currentQuizQuestion].question}
                </h3>
              </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {filteredQuestions[currentQuizQuestion].options.map((option, index) => {
              const selectedAnswer = selectedAnswers[currentQuizQuestion];
              const showAnswer = selectedAnswer !== undefined;
              const isCorrect = index === filteredQuestions[currentQuizQuestion].correct;
              const isSelected = index === selectedAnswer;
              
              // Determine button styling based on state
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all ";
              
              if (showAnswer) {
                if (isCorrect) {
                  buttonClass += "bg-green-50 border-green-500 text-green-800";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "bg-red-50 border-red-500 text-red-800";
                } else {
                  buttonClass += "border-gray-200 text-gray-600";
                }
              } else {
                buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer";
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => !showAnswer && handleQuizAnswer(index)}
                  disabled={showAnswer}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-sm mt-1 min-w-[1.5rem]">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="flex-1 text-left">{option}</span>
                    {showAnswer && isCorrect && (
                      <span className="text-green-600 font-semibold text-lg">✓</span>
                    )}
                    {showAnswer && isSelected && !isCorrect && (
                      <span className="text-red-600 font-semibold text-lg">✗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {selectedAnswers[currentQuizQuestion] !== undefined && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-blue-800 mt-1">💡</span>
                <div>
                  <strong className="text-blue-800">Explanation:</strong>
                  <p className="text-blue-700 mt-1 leading-relaxed">
                    {filteredQuestions[currentQuizQuestion].explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizTab;