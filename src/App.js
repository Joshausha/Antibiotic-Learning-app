import React, { Suspense, lazy } from 'react';

// Import Error Boundary and Context
import ErrorBoundary from './components/ErrorBoundary';
import { AppProvider, useAppContext } from './contexts/AppContext';

// Import our core components
import Header from './components/Header';
import HomeTab from './components/HomeTab';
import ConditionsTab from './components/ConditionsTab';
import QuizTab from './components/QuizTab';
import ConditionDetailModal from './components/ConditionDetailModal';
import UserProgress from './components/UserProgress';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load heavy components 
const PathogenExplorer = lazy(() => import('./components/PathogenExplorer'));
const SimplePathogenExplorer = lazy(() => import('./components/SimplePathogenExplorer'));
const AntibioticExplorer = lazy(() => import('./components/AntibioticExplorer'));
const VisualizationsTab = lazy(() => import('./components/VisualizationsTab'));

/**
 * AppContent Component
 * Contains the main application logic and uses context for state management
 */
const AppContent = () => {
  console.log('App component starting render...');
  
  // Get all state and data from context
  const {
    activeTab,
    setActiveTab,
    selectedCondition,
    setSelectedCondition,
    showMobileMenu,
    setShowMobileMenu,
    isMobile,
    quizProgress,
    bookmarks,
    pathogenData,
    antibioticData,
    searchData,
    medicalConditions
  } = useAppContext();

  const { searchTerm, setSearchTerm, filteredItems: filteredConditions } = searchData;

  console.log('Context data loaded, starting render...');
  console.log('PathogenData available:', !!pathogenData);
  console.log('AntibioticData available:', !!antibioticData);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 font-sans">
        {/* Use our Header component */}
        <ErrorBoundary>
          <Header 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobile={isMobile}
            showMobileMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
          />
        </ErrorBoundary>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto p-4 md:p-8">
          {/* Render appropriate tab component based on activeTab */}
          {activeTab === 'home' && (
            <ErrorBoundary>
              <HomeTab setActiveTab={setActiveTab} />
            </ErrorBoundary>
          )}
          
          {activeTab === 'conditions' && (
            <ErrorBoundary>
              <ConditionsTab 
                conditions={filteredConditions}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSelectCondition={setSelectedCondition}
              />
            </ErrorBoundary>
          )}

          {activeTab === 'quiz' && (
            <ErrorBoundary>
              <QuizTab 
                quizProgress={quizProgress}
                onQuizComplete={() => console.log('Quiz completed!')}
              />
            </ErrorBoundary>
          )}

          {activeTab === 'pathogen-explorer' && (
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <PathogenExplorer 
                  pathogenData={pathogenData}
                />
              </Suspense>
            </ErrorBoundary>
          )}

          {activeTab === 'simple-pathogen-explorer' && (
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <SimplePathogenExplorer />
              </Suspense>
            </ErrorBoundary>
          )}

          {activeTab === 'antibiotic-explorer' && (
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <AntibioticExplorer 
                  antibioticData={antibioticData}
                  onSelectCondition={setSelectedCondition}
                />
              </Suspense>
            </ErrorBoundary>
          )}

          {activeTab === 'visualizations' && (
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <VisualizationsTab
                  pathogenData={pathogenData}
                  antibioticData={antibioticData}
                  medicalConditions={medicalConditions}
                  onSelectCondition={setSelectedCondition}
                  onSelectPathogen={(pathogen) => console.log('Selected pathogen:', pathogen)}
                />
              </Suspense>
            </ErrorBoundary>
          )}

          {activeTab === 'user-progress' && (
            <ErrorBoundary>
              <UserProgress
                bookmarkedConditions={bookmarks.bookmarkedConditions}
                quizProgress={quizProgress}
                onClearProgress={() => console.log('Progress cleared!')}
              />
            </ErrorBoundary>
          )}

          {/* Condition Detail Modal */}
          {selectedCondition && (
            <ErrorBoundary>
              <ConditionDetailModal
                condition={selectedCondition}
                conditions={medicalConditions}
                onClose={() => setSelectedCondition(null)}
              />
            </ErrorBoundary>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
};

/**
 * Main App Component
 * Wraps the application with the context provider
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;