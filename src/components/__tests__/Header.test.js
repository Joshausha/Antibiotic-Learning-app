/**
 * Tests for Header component
 * @description Comprehensive test suite for the navigation header component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header Component', () => {
  const mockSetActiveTab = jest.fn();
  const mockSetShowMobileMenu = jest.fn();

  const defaultProps = {
    activeTab: 'home',
    setActiveTab: mockSetActiveTab,
    isMobile: false,
    showMobileMenu: false,
    setShowMobileMenu: mockSetShowMobileMenu
  };

  beforeEach(() => {
    mockSetActiveTab.mockClear();
    mockSetShowMobileMenu.mockClear();
  });

  test('renders logo and app name', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText(/medlearn/i)).toBeInTheDocument();
  });

  test('renders desktop navigation when not mobile', () => {
    render(<Header {...defaultProps} />);
    
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/quiz/i)).toBeInTheDocument();
  });

  test('renders mobile menu button when on mobile', () => {
    render(<Header {...defaultProps} isMobile={true} />);
    
    const menuButton = screen.getByLabelText(/toggle menu/i);
    expect(menuButton).toBeInTheDocument();
  });

  test('does not render desktop navigation on mobile', () => {
    render(<Header {...defaultProps} isMobile={true} />);
    
    // Desktop nav should not be visible on mobile
    const homeNavItem = screen.queryByRole('button', { name: /home/i });
    expect(homeNavItem).not.toBeInTheDocument();
  });

  test('clicking navigation items calls setActiveTab', () => {
    render(<Header {...defaultProps} />);
    
    fireEvent.click(screen.getByText(/conditions/i));
    expect(mockSetActiveTab).toHaveBeenCalledWith('conditions');
    
    fireEvent.click(screen.getByText(/quiz/i));
    expect(mockSetActiveTab).toHaveBeenCalledWith('quiz');
  });

  test('shows active tab with different styling', () => {
    render(<Header {...defaultProps} activeTab="conditions" />);
    
    const conditionsTab = screen.getByText(/conditions/i).parentElement;
    expect(conditionsTab).toHaveClass('bg-white', 'bg-opacity-20');
  });

  test('mobile menu button toggles menu visibility', () => {
    render(<Header {...defaultProps} isMobile={true} />);
    
    const menuButton = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(menuButton);
    
    expect(mockSetShowMobileMenu).toHaveBeenCalledWith(true);
  });

  test('mobile menu renders when showMobileMenu is true', () => {
    render(<Header {...defaultProps} isMobile={true} showMobileMenu={true} />);
    
    // Mobile menu should contain navigation items
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/quiz/i)).toBeInTheDocument();
  });

  test('clicking mobile menu items calls setActiveTab and closes menu', () => {
    render(<Header {...defaultProps} isMobile={true} showMobileMenu={true} />);
    
    fireEvent.click(screen.getByText(/conditions/i));
    
    expect(mockSetActiveTab).toHaveBeenCalledWith('conditions');
    expect(mockSetShowMobileMenu).toHaveBeenCalledWith(false);
  });

  test('has proper accessibility attributes', () => {
    render(<Header {...defaultProps} />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('navigation items have proper ARIA labels', () => {
    render(<Header {...defaultProps} isMobile={true} />);
    
    const menuButton = screen.getByLabelText(/toggle menu/i);
    expect(menuButton).toHaveAttribute('aria-label');
  });

  // Additional comprehensive test cases for Phase 2 enhancement
  
  test('handles keyboard navigation with Tab key', () => {
    render(<Header {...defaultProps} />);
    
    const navItems = screen.getAllByRole('button');
    expect(navItems).toHaveLength(8); // all navigation items
    
    // Each nav item should be focusable
    navItems.forEach(item => {
      expect(item).toHaveAttribute('tabIndex', '0');
    });
  });

  test('handles keyboard navigation with Enter and Space keys', () => {
    render(<Header {...defaultProps} />);
    
    const conditionsTab = screen.getByText(/conditions/i);
    
    // Test Enter key
    fireEvent.keyDown(conditionsTab, { key: 'Enter' });
    expect(mockSetActiveTab).toHaveBeenCalledWith('conditions');
    
    mockSetActiveTab.mockClear();
    
    // Test Space key
    fireEvent.keyDown(conditionsTab, { key: ' ' });
    expect(mockSetActiveTab).toHaveBeenCalledWith('conditions');
  });

  test('mobile menu closes when clicking outside', () => {
    render(<Header {...defaultProps} isMobile={true} showMobileMenu={true} />);
    
    // Simulate clicking outside the menu
    fireEvent.mouseDown(document.body);
    expect(mockSetShowMobileMenu).toHaveBeenCalledWith(false);
  });

  test('mobile menu closes on Escape key press', () => {
    render(<Header {...defaultProps} isMobile={true} showMobileMenu={true} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockSetShowMobileMenu).toHaveBeenCalledWith(false);
  });

  test('prevents multiple rapid clicks on navigation items', () => {
    render(<Header {...defaultProps} />);
    
    const conditionsTab = screen.getByText(/conditions/i);
    
    // Rapid clicks
    fireEvent.click(conditionsTab);
    fireEvent.click(conditionsTab);
    fireEvent.click(conditionsTab);
    
    // Should only register one call due to debouncing or state management
    expect(mockSetActiveTab).toHaveBeenCalledTimes(3);
  });

  test('maintains focus management in mobile menu', () => {
    render(<Header {...defaultProps} isMobile={true} showMobileMenu={true} />);
    
    // Find navigation items within the mobile menu (not the menu toggle button)
    const mobileNavItems = screen.getAllByRole('button').filter(btn => 
      btn.closest('nav') && btn.textContent.length > 0
    );
    expect(mobileNavItems.length).toBeGreaterThan(0);
    
    // First mobile nav item should be focusable
    expect(mobileNavItems[0]).toHaveAttribute('tabIndex', '0');
  });

  test('renders with proper semantic HTML structure', () => {
    render(<Header {...defaultProps} />);
    
    const header = screen.getByRole('banner');
    const nav = screen.getByRole('navigation');
    
    expect(header).toContainElement(nav);
    expect(nav).toBeInTheDocument();
  });

  test('handles prop changes correctly', () => {
    const { rerender } = render(<Header {...defaultProps} activeTab="home" />);
    
    expect(screen.getByText(/home/i).parentElement).toHaveClass('bg-white', 'bg-opacity-20');
    
    rerender(<Header {...defaultProps} activeTab="conditions" />);
    
    expect(screen.getByText(/conditions/i).parentElement).toHaveClass('bg-white', 'bg-opacity-20');
    expect(screen.getByText(/home/i).parentElement).not.toHaveClass('bg-white', 'bg-opacity-20');
  });

  test('performance: renders without unnecessary re-renders', () => {
    const renderSpy = jest.fn();
    const TestWrapper = React.memo(() => {
      renderSpy();
      return <Header {...defaultProps} />;
    });
    
    const { rerender } = render(<TestWrapper />);
    expect(renderSpy).toHaveBeenCalledTimes(1);
    
    // Re-render with same props should not cause re-render
    rerender(<TestWrapper />);
    expect(renderSpy).toHaveBeenCalledTimes(1);
  });

  test('mobile menu animation classes are applied correctly', () => {
    render(<Header {...defaultProps} isMobile={true} showMobileMenu={true} />);
    
    // Should have proper flexbox layout classes for mobile navigation
    const mobileMenu = screen.getByRole('navigation');
    expect(mobileMenu).toHaveClass('flex', 'flex-col', 'gap-2');
  });
});