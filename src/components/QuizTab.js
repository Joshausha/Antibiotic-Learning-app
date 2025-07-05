/**
 * QuizTab Component
 * Handles the complete quiz functionality including questions, answers, and results
 * 
 * Props:
 * - quizQuestions: array - array of quiz question objects
 * - setActiveTab: function - function to change active tab (for navigation after quiz)
 */

import React, { useState, memo } from 'react';
import { CheckCircle } from 'lucide-react';

const QuizTab = ({ quizQuestions, setActiveTab }) => {
  // Quiz state management
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Start a new quiz
  const startQuiz = () => {
    setQuizMode(true);
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setSelectedAnswers({});
    setShowQuizResult(false);
  };

  // Handle answer selection
  const handleQuizAnswer = (answerIndex) => {
    // Store the selected answer
    const newAnswers = { ...selectedAnswers };
    newAnswers[currentQuizQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    // Check if answer is correct and update score
    if (answerIndex === quizQuestions[currentQuizQuestion].correct) {
      setQuizScore(quizScore + 1);
    }

    // Move to next question or show results after a delay
    setTimeout(() => {
      if (currentQuizQuestion < quizQuestions.length - 1) {
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
  };

  // Calculate progress percentage
  const progressPercentage = quizQuestions.length > 0 ? ((currentQuizQuestion + 1) / quizQuestions.length) * 100 : 0;

  // Calculate final score percentage
  const scorePercentage = quizQuestions.length > 0 ? Math.round((quizScore / quizQuestions.length) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Quiz Start Screen */}
      {!quizMode ? (
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-semibold mb-4">Knowledge Assessment</h2>
          <p className="text-gray-600 mb-8">
            Test your understanding of infectious diseases and antimicrobial therapy with{' '}
            <strong>{quizQuestions.length}</strong> clinical questions.
          </p>
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Quiz Features:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Evidence-based clinical scenarios</li>
              <li>• Detailed explanations for each answer</li>
              <li>• Immediate feedback on your responses</li>
              <li>• Progress tracking throughout the quiz</li>
            </ul>
          </div>
          <button 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={startQuiz}
          >
            Start Quiz
          </button>
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
              {quizScore}/{quizQuestions.length}
            </p>
            <p className="text-xl text-gray-600 mb-4">
              ({scorePercentage}%)
            </p>
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
          <div className="flex gap-4 justify-center">
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={resetQuiz}
            >
              Take Again
            </button>
            <button 
              className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              onClick={() => setActiveTab('conditions')}
            >
              Review Conditions
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Question Screen */
        <div className="bg-white rounded-xl p-8 shadow-sm">
          {quizQuestions.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p>No questions available.</p>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Question Counter */}
              <div className="mb-4 text-gray-600">
                Question {currentQuizQuestion + 1} of {quizQuestions.length}
              </div>

              {/* Question Text */}
              <h3 className="text-xl font-semibold mb-6 leading-relaxed">
                {quizQuestions[currentQuizQuestion].question}
              </h3>

          {/* Answer Options */}
          <div className="space-y-3">
            {quizQuestions[currentQuizQuestion].options.map((option, index) => {
              const selectedAnswer = selectedAnswers[currentQuizQuestion];
              const showAnswer = selectedAnswer !== undefined;
              const isCorrect = index === quizQuestions[currentQuizQuestion].correct;
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
                    <span className="font-semibold text-sm mt-1">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="flex-1">{option}</span>
                    {showAnswer && isCorrect && (
                      <span className="text-green-600 font-semibold">✓</span>
                    )}
                    {showAnswer && isSelected && !isCorrect && (
                      <span className="text-red-600 font-semibold">✗</span>
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
                    {quizQuestions[currentQuizQuestion].explanation}
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