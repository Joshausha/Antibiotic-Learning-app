/**
 * Tests for AppContext
 * @description Test suite for the application context provider and hook
 */

import React from 'react';
import { renderHook, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppProvider, useAppContext } from '../AppContext';

// Mock the hooks to avoid complex dependencies in tests
jest.mock('../../hooks/useResponsive', () => () => false);
jest.mock('../../hooks/useQuizProgress', () => () => ({
  stats: { totalQuizzes: 0, averageScore: 0 },
  recentQuizzes: [],
  clearHistory: jest.fn(),
  submitQuiz: jest.fn()
}));
jest.mock('../../hooks/useBookmarks', () => () => ({
  bookmarkedConditions: [],
  isBookmarked: jest.fn(() => false),
  toggleBookmark: jest.fn()
}));
jest.mock('../../hooks/usePathogenData', () => () => ({
  pathogens: [],
  selectedPathogen: null,
  isLoading: false
}));
jest.mock('../../hooks/useAntibioticData', () => () => ({
  antibiotics: [],
  selectedAntibiotic: null,
  isLoading: false
}));
jest.mock('../../hooks/useSearch', () => () => ({
  searchTerm: '',
  setSearchTerm: jest.fn(),
  filteredItems: []
}));
jest.mock('../../hooks/useErrorHandler', () => () => ({
  withErrorHandling: (fn, fallback) => {
    try {
      return fn();
    } catch {
      return fallback;
    }
  },
  fallbacks: {
    quizProgress: { stats: {}, recentQuizzes: [] },
    bookmarks: { bookmarkedConditions: [] },
    pathogenData: { pathogens: [] },
    antibioticData: { antibiotics: [] },
    searchData: () => ({ searchTerm: '', filteredItems: [] })
  }
}));

describe('AppContext', () => {
  beforeEach(() => {
    // Mock console to avoid noise
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('AppProvider', () => {
    test('renders children without crashing', () => {
      render(
        <AppProvider>
          <div>Test Child</div>
        </AppProvider>
      );
      
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    test('provides context value to children', () => {
      const TestComponent = () => {
        const context = useAppContext();
        return <div data-testid="context-test">{context ? 'Context Available' : 'No Context'}</div>;
      };

      render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );

      expect(screen.getByTestId('context-test')).toHaveTextContent('Context Available');
    });
  });

  describe('useAppContext Hook', () => {
    test('provides all required context properties', () => {
      const { result } = renderHook(() => useAppContext(), {
        wrapper: AppProvider
      });

      const context = result.current;

      // Check core state properties
      expect(context).toHaveProperty('activeTab', 'home');
      expect(context).toHaveProperty('selectedCondition', null);
      expect(context).toHaveProperty('showMobileMenu', false);
      
      // Check state setters
      expect(typeof context.setActiveTab).toBe('function');
      expect(typeof context.setSelectedCondition).toBe('function');
      expect(typeof context.setShowMobileMenu).toBe('function');
      
      // Check device state
      expect(context).toHaveProperty('isMobile');
      
      // Check data objects
      expect(context).toHaveProperty('quizProgress');
      expect(context).toHaveProperty('bookmarks');
      expect(context).toHaveProperty('pathogenData');
      expect(context).toHaveProperty('antibioticData');
      expect(context).toHaveProperty('searchData');
      expect(context).toHaveProperty('medicalConditions');
    });

    test('throws error when used outside AppProvider', () => {
      // Capture console.error to avoid noise in test output
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => {
        renderHook(() => useAppContext());
      }).toThrow('useAppContext must be used within an AppProvider');

      console.error = originalError;
    });

    test('context values have correct initial state', () => {
      const { result } = renderHook(() => useAppContext(), {
        wrapper: AppProvider
      });

      const context = result.current;

      expect(context.activeTab).toBe('home');
      expect(context.selectedCondition).toBe(null);
      expect(context.showMobileMenu).toBe(false);
      expect(context.isMobile).toBe(false);
    });
  });

  describe('Context Integration', () => {
    test('context provides working hook results', () => {
      const { result } = renderHook(() => useAppContext(), {
        wrapper: AppProvider
      });

      const context = result.current;

      // Test that hooks are properly integrated
      expect(context.quizProgress).toHaveProperty('stats');
      expect(context.bookmarks).toHaveProperty('bookmarkedConditions');
      expect(context.pathogenData).toHaveProperty('pathogens');
      expect(context.antibioticData).toHaveProperty('antibiotics');
      expect(context.searchData).toHaveProperty('searchTerm');
    });

    test('medicalConditions is available in context', () => {
      const { result } = renderHook(() => useAppContext(), {
        wrapper: AppProvider
      });

      const context = result.current;

      expect(context.medicalConditions).toBeDefined();
      expect(Array.isArray(context.medicalConditions)).toBe(true);
    });
  });

  describe('State Management', () => {
    test('context provides functional state setters', () => {
      const TestComponent = () => {
        const { activeTab, setActiveTab } = useAppContext();
        
        return (
          <div>
            <span data-testid="active-tab">{activeTab}</span>
            <button onClick={() => setActiveTab('quiz')} data-testid="change-tab">
              Change Tab
            </button>
          </div>
        );
      };

      render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );

      expect(screen.getByTestId('active-tab')).toHaveTextContent('home');
      
      // Click to change tab
      const changeButton = screen.getByTestId('change-tab');
      fireEvent.click(changeButton);
      
      expect(screen.getByTestId('active-tab')).toHaveTextContent('quiz');
    });
  });
});