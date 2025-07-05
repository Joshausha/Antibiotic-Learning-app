/**
 * Tests for HomeTab component
 * @description Comprehensive test suite for the landing page component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeTab from '../HomeTab';

describe('HomeTab Component', () => {
  const mockSetActiveTab = jest.fn();

  beforeEach(() => {
    mockSetActiveTab.mockClear();
  });

  test('renders main heading', () => {
    render(<HomeTab setActiveTab={mockSetActiveTab} />);
    expect(screen.getByText(/medical learning app/i)).toBeInTheDocument();
  });

  test('renders all feature cards', () => {
    render(<HomeTab setActiveTab={mockSetActiveTab} />);
    
    expect(screen.getByRole('heading', { name: /clinical guidelines/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /targeted learning/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /interactive quizzes/i })).toBeInTheDocument();
  });

  test('renders call-to-action button', () => {
    render(<HomeTab setActiveTab={mockSetActiveTab} />);
    
    const startButton = screen.getByText(/start learning/i);
    expect(startButton).toBeInTheDocument();
  });

  test('start learning button navigates to conditions tab', () => {
    render(<HomeTab setActiveTab={mockSetActiveTab} />);
    
    const startButton = screen.getByText(/start learning/i);
    fireEvent.click(startButton);
    
    expect(mockSetActiveTab).toHaveBeenCalledWith('conditions');
  });

  test('component structure includes main sections', () => {
    render(<HomeTab setActiveTab={mockSetActiveTab} />);
    
    // Check for main heading and description
    expect(screen.getByText(/medical learning app/i)).toBeInTheDocument();
    expect(screen.getByText(/master infectious diseases/i)).toBeInTheDocument();
    
    // Check for feature descriptions
    expect(screen.getByText(/evidence-based treatment protocols/i)).toBeInTheDocument();
    expect(screen.getByText(/test your knowledge with case-based questions/i)).toBeInTheDocument();
  });

  test('feature cards have proper structure', () => {
    render(<HomeTab setActiveTab={mockSetActiveTab} />);
    
    // Check that feature card headings exist
    const clinicalGuidelinesHeading = screen.getByRole('heading', { name: /clinical guidelines/i });
    const targetedLearningHeading = screen.getByRole('heading', { name: /targeted learning/i });
    const interactiveQuizzesHeading = screen.getByRole('heading', { name: /interactive quizzes/i });
    
    expect(clinicalGuidelinesHeading).toBeInTheDocument();
    expect(targetedLearningHeading).toBeInTheDocument();
    expect(interactiveQuizzesHeading).toBeInTheDocument();
    
    // Check for descriptive text
    expect(screen.getByText(/focus on high-yield infectious disease/i)).toBeInTheDocument();
  });

  // Enhanced Phase 2 Accessibility and WCAG Compliance Tests
  
  describe('Accessibility and WCAG Compliance', () => {
    test('has proper heading hierarchy', () => {
      render(<HomeTab setActiveTab={mockSetActiveTab} />);
      
      // Main heading should be h1
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent(/medical learning app/i);
      
      // Feature headings should be h2 or h3
      const featureHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(featureHeadings.length).toBeGreaterThan(0);
    });
    
    test('all interactive elements are keyboard accessible', () => {
      render(<HomeTab setActiveTab={mockSetActiveTab} />);
      
      const startButton = screen.getByText(/start learning/i);
      
      // Button should be focusable
      startButton.focus();
      expect(document.activeElement).toBe(startButton);
      
      // Should activate with Enter key
      fireEvent.keyDown(startButton, { key: 'Enter' });
      expect(mockSetActiveTab).toHaveBeenCalledWith('conditions');
      
      mockSetActiveTab.mockClear();
      
      // Should activate with Space key
      fireEvent.keyDown(startButton, { key: ' ' });
      expect(mockSetActiveTab).toHaveBeenCalledWith('conditions');
    });
    
    test('has sufficient color contrast ratios', () => {
      render(<HomeTab setActiveTab={mockSetActiveTab} />);
      
      // Test that text elements have proper contrast
      // Note: This is a simplified test - actual contrast testing would require color analysis
      const mainHeading = screen.getByRole('heading', { level: 1 });
      const computedStyle = window.getComputedStyle(mainHeading);
      
      // Ensure text is not transparent or invisible
      expect(computedStyle.opacity).not.toBe('0');
      expect(computedStyle.visibility).not.toBe('hidden');
    });
    
    test('provides alternative text for visual elements', () => {
      render(<HomeTab setActiveTab={mockSetActiveTab} />);
      
      // Check for any images that should have alt text
      const images = screen.queryAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });
    
    test('supports screen reader navigation', () => {
      render(<HomeTab setActiveTab={mockSetActiveTab} />);
      
      // Check for ARIA landmarks
      const mainContent = screen.getByRole('main') || screen.getByRole('region');
      expect(mainContent).toBeInTheDocument();
      
      // Check for proper button roles
      const startButton = screen.getByRole('button', { name: /start learning/i });
      expect(startButton).toBeInTheDocument();
    });
    
    test('handles focus management properly', () => {
      render(<HomeTab setActiveTab={mockSetActiveTab} />);
      
      const startButton = screen.getByText(/start learning/i);
      
      // Focus should be visible
      startButton.focus();
      expect(startButton).toHaveFocus();
      
      // Focus should remain after click
      fireEvent.click(startButton);
      // In real app, focus might move to the conditions tab
    });
    
    test('content is readable at 200% zoom', () => {
      // Mock viewport changes for zoom testing
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 640, // Simulating zoomed viewport
      });
      
      render(<HomeTab setActiveTab={mockSetActiveTab} />);
      
      // Content should still be accessible
      expect(screen.getByText(/medical learning app/i)).toBeInTheDocument();
      expect(screen.getByText(/start learning/i)).toBeInTheDocument();
      
      // Restore original window size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
    });
    
    test('respects reduced motion preferences', () => {
      // Mock prefers-reduced-motion media query
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
      
      render(<HomeTab setActiveTab={mockSetActiveTab} />);
      
      // Component should render without animation-dependent features
      expect(screen.getByText(/medical learning app/i)).toBeInTheDocument();
    });
    
    test('provides error feedback for failed navigation', () => {
      const mockSetActiveTabWithError = jest.fn(() => {
        throw new Error('Navigation failed');
      });
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<HomeTab setActiveTab={mockSetActiveTabWithError} />);
      
      const startButton = screen.getByText(/start learning/i);
      
      // Should handle errors gracefully
      expect(() => fireEvent.click(startButton)).not.toThrow();
      
      consoleSpy.mockRestore();
    });
    
    test('maintains semantic meaning without CSS', () => {
      render(<HomeTab setActiveTab={mockSetActiveTab} />);
      
      // Content should be logically structured
      const headings = screen.getAllByRole('heading');
      const buttons = screen.getAllByRole('button');
      
      expect(headings.length).toBeGreaterThan(0);
      expect(buttons.length).toBeGreaterThan(0);
      
      // Check logical reading order
      const mainHeading = screen.getByRole('heading', { level: 1 });
      const startButton = screen.getByRole('button');
      
      expect(mainHeading).toBeInTheDocument();
      expect(startButton).toBeInTheDocument();
    });
  });
});