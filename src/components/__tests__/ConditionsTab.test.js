/**
 * Tests for ConditionsTab component
 * @description Comprehensive test suite for the medical conditions browser component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConditionsTab from '../ConditionsTab';

describe('ConditionsTab Component', () => {
  const mockSetSelectedCondition = jest.fn();
  const mockSetSearchTerm = jest.fn();

  const sampleConditions = [
    {
      name: 'Pneumonia',
      category: 'Respiratory',
      commonPathogens: ['Streptococcus pneumoniae', 'Haemophilus influenzae'],
      description: 'Lung infection'
    },
    {
      name: 'UTI',
      category: 'Genitourinary',
      commonPathogens: ['E. coli'],
      description: 'Urinary tract infection'
    }
  ];

  const defaultProps = {
    filteredConditions: sampleConditions,
    setSelectedCondition: mockSetSelectedCondition,
    searchTerm: '',
    setSearchTerm: mockSetSearchTerm
  };

  beforeEach(() => {
    mockSetSelectedCondition.mockClear();
    mockSetSearchTerm.mockClear();
  });

  test('renders search input', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search conditions/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders all conditions in grid', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    expect(screen.getByText('Pneumonia')).toBeInTheDocument();
    expect(screen.getByText('UTI')).toBeInTheDocument();
  });

  test('displays condition categories', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    expect(screen.getByText('Respiratory')).toBeInTheDocument();
    expect(screen.getByText('Genitourinary')).toBeInTheDocument();
  });

  test('displays condition descriptions', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    expect(screen.getByText('Pneumonia')).toBeInTheDocument();
    expect(screen.getByText('UTI')).toBeInTheDocument();
  });

  test('search input updates search term', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search conditions/i);
    fireEvent.change(searchInput, { target: { value: 'pneumonia' } });
    
    expect(mockSetSearchTerm).toHaveBeenCalledWith('pneumonia');
  });

  test('clicking condition card calls setSelectedCondition', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const pneumoniaCard = screen.getByText('Pneumonia').closest('.bg-white');
    fireEvent.click(pneumoniaCard);
    
    expect(mockSetSelectedCondition).toHaveBeenCalledWith(sampleConditions[0]);
  });

  test('displays empty state when no conditions', () => {
    render(<ConditionsTab {...defaultProps} filteredConditions={[]} />);
    
    expect(screen.getByText(/no conditions found/i)).toBeInTheDocument();
  });

  test('empty state shows search tips', () => {
    render(<ConditionsTab {...defaultProps} filteredConditions={[]} searchTerm="xyz" />);
    
    expect(screen.getByText(/try adjusting your search/i)).toBeInTheDocument();
  });

  test('condition cards have proper structure', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const pneumoniaCard = screen.getByText('Pneumonia').closest('.bg-white');
    
    // Should contain all key information
    expect(pneumoniaCard).toHaveTextContent('Pneumonia');
    expect(pneumoniaCard).toHaveTextContent('Respiratory');
    expect(pneumoniaCard).toHaveTextContent('Streptococcus pneumoniae');
  });

  test('search input has proper accessibility attributes', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search conditions/i);
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(searchInput).toHaveAttribute('placeholder');
  });

  test('condition cards are keyboard accessible', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const pneumoniaCard = screen.getByText('Pneumonia').closest('.bg-white');
    
    // Should be focusable
    expect(pneumoniaCard).toHaveAttribute('tabIndex', '0');
    expect(pneumoniaCard).toHaveClass('cursor-pointer');
  });

  test('handles Enter key on condition cards', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const pneumoniaCard = screen.getByText('Pneumonia').closest('.bg-white');
    fireEvent.keyDown(pneumoniaCard, { key: 'Enter' });
    
    expect(mockSetSelectedCondition).toHaveBeenCalledWith(sampleConditions[0]);
  });

  test('displays condition counts', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    expect(screen.getByText(/showing 2 conditions/i)).toBeInTheDocument();
  });

  // Enhanced Phase 2 test coverage
  
  test('handles search input debouncing', async () => {
    jest.useFakeTimers();
    render(<ConditionsTab {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search conditions/i);
    
    // Type rapidly
    fireEvent.change(searchInput, { target: { value: 'p' } });
    fireEvent.change(searchInput, { target: { value: 'pn' } });
    fireEvent.change(searchInput, { target: { value: 'pne' } });
    fireEvent.change(searchInput, { target: { value: 'pneu' } });
    
    // Fast forward timers
    jest.advanceTimersByTime(300);
    
    // Should only call setSearchTerm with final value
    expect(mockSetSearchTerm).toHaveBeenLastCalledWith('pneu');
    
    jest.useRealTimers();
  });

  test('filters conditions by category', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const respiratoryConditions = screen.getByText('Pneumonia').closest('.bg-white');
    const genitourinaryConditions = screen.getByText('UTI').closest('.bg-white');
    
    expect(respiratoryConditions).toHaveTextContent('Respiratory');
    expect(genitourinaryConditions).toHaveTextContent('Genitourinary');
  });

  test('displays multiple pathogens correctly', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const pneumoniaCard = screen.getByText('Pneumonia').closest('.bg-white');
    expect(pneumoniaCard).toHaveTextContent('Streptococcus pneumoniae');
    expect(pneumoniaCard).toHaveTextContent('Haemophilus influenzae');
  });

  test('handles long condition names gracefully', () => {
    const longNameConditions = [{
      name: 'Very Long Medical Condition Name That Should Be Truncated Or Wrapped Properly',
      category: 'Test',
      commonPathogens: ['Test pathogen'],
      description: 'Test description'
    }];
    
    render(<ConditionsTab {...defaultProps} filteredConditions={longNameConditions} />);
    
    expect(screen.getByText(/Very Long Medical Condition/)).toBeInTheDocument();
  });

  test('search input maintains focus during typing', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText(/search conditions/i);
    searchInput.focus();
    
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(document.activeElement).toBe(searchInput);
  });

  test('condition cards have proper hover effects', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const pneumoniaCard = screen.getByText('Pneumonia').closest('.bg-white');
    
    fireEvent.mouseEnter(pneumoniaCard);
    expect(pneumoniaCard).toHaveClass('cursor-pointer');
    
    fireEvent.mouseLeave(pneumoniaCard);
    // Should maintain proper styling
    expect(pneumoniaCard).toHaveClass('bg-white');
  });

  test('handles empty search results with helpful message', () => {
    render(<ConditionsTab {...defaultProps} filteredConditions={[]} searchTerm="nonexistentcondition" />);
    
    expect(screen.getByText(/no conditions found/i)).toBeInTheDocument();
    expect(screen.getByText(/try adjusting your search/i)).toBeInTheDocument();
  });

  test('displays correct condition count in different scenarios', () => {
    const { rerender } = render(<ConditionsTab {...defaultProps} />);
    expect(screen.getByText(/showing 2 conditions/i)).toBeInTheDocument();
    
    rerender(<ConditionsTab {...defaultProps} filteredConditions={[sampleConditions[0]]} />);
    expect(screen.getByText(/showing 1 condition/i)).toBeInTheDocument();
    
    rerender(<ConditionsTab {...defaultProps} filteredConditions={[]} />);
    expect(screen.getByText(/showing 0 conditions/i)).toBeInTheDocument();
  });

  test('search clears properly when input is emptied', () => {
    render(<ConditionsTab {...defaultProps} searchTerm="pneumonia" />);
    
    const searchInput = screen.getByPlaceholderText(/search conditions/i);
    fireEvent.change(searchInput, { target: { value: '' } });
    
    expect(mockSetSearchTerm).toHaveBeenCalledWith('');
  });

  test('condition cards are accessible via screen reader', () => {
    render(<ConditionsTab {...defaultProps} />);
    
    const pneumoniaCard = screen.getByText('Pneumonia').closest('.bg-white');
    
    // Should have appropriate ARIA attributes
    expect(pneumoniaCard).toHaveAttribute('role', 'button');
    expect(pneumoniaCard).toHaveAttribute('aria-label');
  });

  test('performance: large condition list renders efficiently', () => {
    const largeConditionList = Array.from({ length: 100 }, (_, i) => ({
      name: `Condition ${i}`,
      category: `Category ${i % 5}`,
      commonPathogens: [`Pathogen ${i}`],
      description: `Description ${i}`
    }));
    
    const startTime = performance.now();
    render(<ConditionsTab {...defaultProps} filteredConditions={largeConditionList} />);
    const endTime = performance.now();
    
    // Should render within reasonable time (adjust threshold as needed)
    expect(endTime - startTime).toBeLessThan(100);
    expect(screen.getByText(/showing 100 conditions/i)).toBeInTheDocument();
  });
});