import React from 'react';
import { CheckCircle, Circle, Clock, Award, Star } from 'lucide-react';

/**
 * ProgressBar Component
 * Displays progress as a bar with percentage
 */
export const ProgressBar = ({ 
  progress = 0, 
  total = 100, 
  showPercentage = true,
  showStats = false,
  className = "",
  color = "blue"
}) => {
  const percentage = Math.round((progress / total) * 100);
  
  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-600",
    red: "bg-red-600",
    purple: "bg-purple-600"
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        {showPercentage && (
          <span className="text-sm font-medium text-gray-700">
            {percentage}% Complete
          </span>
        )}
        {showStats && (
          <span className="text-sm text-gray-500">
            {progress}/{total}
          </span>
        )}
      </div>
      <div className="progress-bar">
        <div 
          className={`progress-fill ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/**
 * StepProgress Component
 * Shows progress through multiple steps
 */
export const StepProgress = ({ 
  currentStep = 1, 
  totalSteps = 5,
  steps = [],
  className = ""
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const stepLabel = steps[index] || `Step ${stepNumber}`;
        
        return (
          <React.Fragment key={stepNumber}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                isCompleted 
                  ? 'bg-green-600 text-white' 
                  : isCurrent 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  stepNumber
                )}
              </div>
              <span className="text-xs text-gray-600 mt-1 text-center max-w-16">
                {stepLabel}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${
                stepNumber < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/**
 * CircularProgress Component
 * Displays circular progress indicator
 */
export const CircularProgress = ({ 
  progress = 0, 
  total = 100,
  size = "md",
  showPercentage = true,
  color = "blue",
  className = ""
}) => {
  const percentage = Math.round((progress / total) * 100);
  const strokeWidth = 4;
  
  const sizes = {
    sm: { width: 40, height: 40, radius: 18 },
    md: { width: 60, height: 60, radius: 28 },
    lg: { width: 80, height: 80, radius: 38 }
  };
  
  const { width, height, radius } = sizes[size];
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const colors = {
    blue: "stroke-blue-600",
    green: "stroke-green-600",
    yellow: "stroke-yellow-600",
    red: "stroke-red-600",
    purple: "stroke-purple-600"
  };

  return (
    <div className={`relative ${className}`}>
      <svg width={width} height={height} className="transform -rotate-90">
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="rgb(229, 231, 235)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          className={colors[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">
            {percentage}%
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * QuizProgress Component
 * Specialized progress indicator for quiz
 */
export const QuizProgress = ({ 
  currentQuestion = 1,
  totalQuestions = 10,
  correctAnswers = 0,
  showStats = true,
  className = ""
}) => {
  const percentage = Math.round((currentQuestion / totalQuestions) * 100);
  const accuracy = currentQuestion > 1 ? Math.round((correctAnswers / (currentQuestion - 1)) * 100) : 0;
  
  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm text-gray-500">
          {percentage}% Complete
        </span>
      </div>
      
      <ProgressBar 
        progress={currentQuestion} 
        total={totalQuestions} 
        showPercentage={false}
        color="blue"
      />
      
      {showStats && currentQuestion > 1 && (
        <div className="mt-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Correct: {correctAnswers}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-600" />
            <span>Accuracy: {accuracy}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * LearningProgress Component
 * Shows overall learning progress across sections
 */
export const LearningProgress = ({ 
  sections = [],
  className = ""
}) => {
  const totalSections = sections.length;
  const completedSections = sections.filter(s => s.completed).length;
  const overallProgress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
  
  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Learning Progress</h3>
        <Award className="w-6 h-6 text-yellow-600" />
      </div>
      
      <div className="mb-4">
        <CircularProgress 
          progress={overallProgress} 
          total={100}
          size="lg"
          color="green"
        />
      </div>
      
      <div className="space-y-2">
        {sections.map((section, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{section.name}</span>
            <div className="flex items-center gap-2">
              {section.completed ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Clock className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm text-gray-500">
                {section.completed ? 'Complete' : 'In Progress'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;