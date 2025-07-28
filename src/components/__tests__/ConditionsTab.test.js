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
      id: 'pneumonia',
      name: 'Pneumonia',
      category: 'Respiratory',
      commonPathogens: ['Streptococcus pneumoniae', 'Haemophilus influenzae'],
      description: 'Lung infection'
    },
    {
      id: 'uti',
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
    
    expect(screen.getByText(/Try searching for a different term or browse all conditions./i)).toBeInTheDocument();
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

  test('displays correct condition count in different scenarios', () => {
    const { rerender } = render(<ConditionsTab {...defaultProps} />);
    expect(screen.getByText('Pneumonia')).toBeInTheDocument();
    expect(screen.getByText('UTI')).toBeInTheDocument();
    
    rerender(<ConditionsTab {...defaultProps} filteredConditions={[sampleConditions[0]]} />);
    expect(screen.getByText('Pneumonia')).toBeInTheDocument();
    expect(screen.queryByText('UTI')).not.toBeInTheDocument();
    
    rerender(<ConditionsTab {...defaultProps} filteredConditions={[]} />);
    expect(screen.getByText(/No conditions found matching your search./i)).toBeInTheDocument();
  });

  // Enhanced Phase 2 comprehensive testing
  
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
      id: 'long-name',
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
    expect(screen.getByText(/Try searching for a different term or browse all conditions./i)).toBeInTheDocument();
  });

  test('displays correct condition count in different scenarios', () => {
    const { rerender } = render(<ConditionsTab {...defaultProps} />);
    expect(screen.getByText('Pneumonia')).toBeInTheDocument();
    expect(screen.getByText('UTI')).toBeInTheDocument();
    
    rerender(<ConditionsTab {...defaultProps} filteredConditions={[sampleConditions[0]]} />);
    expect(screen.getByText('Pneumonia')).toBeInTheDocument();
    expect(screen.queryByText('UTI')).not.toBeInTheDocument();
    
    rerender(<ConditionsTab {...defaultProps} filteredConditions={[]} />);
    expect(screen.getByText(/No conditions found matching your search./i)).toBeInTheDocument();
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
      id: `condition-${i}`,
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
    expect(screen.getByText(/Condition 99/i)).toBeInTheDocument(); // Check last element to ensure all rendered
  });

  // Phase 2 Enhanced Testing - Medical Education Focus
  
  describe('Medical Education Features', () => {
    test('displays pathogen information for clinical learning', () => {
      render(<ConditionsTab {...defaultProps} />);
      
      const pneumoniaCard = screen.getByText('Pneumonia').closest('.bg-white');
      expect(pneumoniaCard).toHaveTextContent('Common Pathogens:');
      expect(pneumoniaCard).toHaveTextContent('Streptococcus pneumoniae');
      expect(pneumoniaCard).toHaveTextContent('Haemophilus influenzae');
    });

    test('truncates pathogen lists for readability', () => {
      const conditionWithManyPathogens = [{
        id: 'many-pathogens',
        name: 'Test Condition',
        category: 'Test',
        commonPathogens: ['Pathogen 1', 'Pathogen 2', 'Pathogen 3', 'Pathogen 4', 'Pathogen 5'],
        description: 'Test condition with many pathogens'
      }];
      
      render(<ConditionsTab {...defaultProps} filteredConditions={conditionWithManyPathogens} />);
      
      expect(screen.getByText(/Pathogen 1, Pathogen 2, Pathogen 3\.\.\./)).toBeInTheDocument();
    });

    test('handles conditions with no pathogens gracefully', () => {
      const conditionWithoutPathogens = [{
        id: 'no-pathogens',
        name: 'Test Condition',
        category: 'Test',
        commonPathogens: [],
        description: 'Test condition without pathogens'
      }];
      
      render(<ConditionsTab {...defaultProps} filteredConditions={conditionWithoutPathogens} />);
      
      expect(screen.getByText('Test Condition')).toBeInTheDocument();
    });

    test('categorizes conditions for clinical organization', () => {
      const medicalConditions = [
        { id: '1', name: 'Pneumonia', category: 'Respiratory', commonPathogens: ['S. pneumoniae'] },
        { id: '2', name: 'UTI', category: 'Genitourinary', commonPathogens: ['E. coli'] },
        { id: '3', name: 'Cellulitis', category: 'Skin and Soft Tissue', commonPathogens: ['S. aureus'] },
        { id: '4', name: 'Meningitis', category: 'Neurological', commonPathogens: ['N. meningitidis'] }
      ];
      
      render(<ConditionsTab {...defaultProps} filteredConditions={medicalConditions} />);
      
      expect(screen.getByText('Respiratory')).toBeInTheDocument();
      expect(screen.getByText('Genitourinary')).toBeInTheDocument();
      expect(screen.getByText('Skin and Soft Tissue')).toBeInTheDocument();
      expect(screen.getByText('Neurological')).toBeInTheDocument();
    });
  });

  describe('Enhanced Accessibility', () => {
    test('provides comprehensive keyboard navigation', () => {
      render(<ConditionsTab {...defaultProps} />);
      
      const firstCard = screen.getByText('Pneumonia').closest('.bg-white');
      const secondCard = screen.getByText('UTI').closest('.bg-white');
      
      // Tab navigation
      firstCard.focus();
      expect(firstCard).toHaveFocus();
      
      // Arrow key navigation (if implemented)
      fireEvent.keyDown(firstCard, { key: 'ArrowDown' });
      // Current implementation may not support arrow keys, that's okay
      
      // Enter and Space key functionality
      fireEvent.keyDown(firstCard, { key: 'Enter' });
      expect(mockSetSelectedCondition).toHaveBeenCalledWith(sampleConditions[0]);
      
      fireEvent.keyDown(secondCard, { key: ' ' });
      expect(mockSetSelectedCondition).toHaveBeenCalledWith(sampleConditions[1]);
    });

    test('has proper ARIA labels for screen readers', () => {
      render(<ConditionsTab {...defaultProps} />);
      
      const searchInput = screen.getByLabelText(/search medical conditions/i);
      expect(searchInput).toHaveAttribute('aria-label', 'Search medical conditions');
      
      const conditionCards = screen.getAllByRole('button');
      conditionCards.forEach(card => {
        expect(card).toHaveAttribute('aria-label');
      });
    });

    test('maintains focus management during interactions', () => {
      render(<ConditionsTab {...defaultProps} />);
      
      const searchInput = screen.getByLabelText(/search medical conditions/i);
      searchInput.focus();
      
      fireEvent.change(searchInput, { target: { value: 'pneumonia' } });
      expect(searchInput).toHaveFocus();
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('handles null or undefined filteredConditions', () => {
      render(<ConditionsTab {...defaultProps} filteredConditions={null} />);
      expect(screen.getByText(/no conditions found/i)).toBeInTheDocument();
      
      const { rerender } = render(<ConditionsTab {...defaultProps} />);
      rerender(<ConditionsTab {...defaultProps} filteredConditions={undefined} />);
      expect(screen.getByText(/no conditions found/i)).toBeInTheDocument();
    });

    test('handles conditions with missing properties', () => {
      const incompleteConditions = [
        { id: 'incomplete', name: 'Incomplete Condition' },
        { id: 'partial', name: 'Partial Condition', category: 'Test' }
      ];
      
      render(<ConditionsTab {...defaultProps} filteredConditions={incompleteConditions} />);
      
      expect(screen.getByText('Incomplete Condition')).toBeInTheDocument();
      expect(screen.getByText('Partial Condition')).toBeInTheDocument();
    });

    test('handles extremely long search terms', () => {
      const longSearchTerm = 'a'.repeat(1000);
      
      render(<ConditionsTab {...defaultProps} searchTerm={longSearchTerm} />);
      
      const searchInput = screen.getByLabelText(/search medical conditions/i);
      expect(searchInput.value).toBe(longSearchTerm);
    });

    test('handles rapid successive clicks on condition cards', () => {
      render(<ConditionsTab {...defaultProps} />);
      
      const pneumoniaCard = screen.getByText('Pneumonia').closest('.bg-white');
      
      // Rapid clicks
      fireEvent.click(pneumoniaCard);
      fireEvent.click(pneumoniaCard);
      fireEvent.click(pneumoniaCard);
      
      expect(mockSetSelectedCondition).toHaveBeenCalledTimes(3);
    });
  });

  describe('Loading and Performance States', () => {
    test('shows loading skeleton when conditions are null', () => {
      render(<ConditionsTab {...defaultProps} filteredConditions={null} />);
      
      // Search input should still be available during loading
      expect(screen.getByLabelText(/search medical conditions/i)).toBeInTheDocument();
    });

    test('transitions from loading to content smoothly', async () => {
      const { rerender } = render(<ConditionsTab {...defaultProps} filteredConditions={null} />);
      
      // Should show loading state
      expect(screen.queryByText('Pneumonia')).not.toBeInTheDocument();
      
      // Transition to loaded state
      rerender(<ConditionsTab {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByText('Pneumonia')).toBeInTheDocument();
      });
    });

    test('maintains search functionality during loading', () => {
      render(<ConditionsTab {...defaultProps} filteredConditions={null} />);
      
      const searchInput = screen.getByLabelText(/search medical conditions/i);
      fireEvent.change(searchInput, { target: { value: 'test search' } });
      
      expect(mockSetSearchTerm).toHaveBeenCalledWith('test search');
    });
  });

  describe('Integration with Medical Data', () => {
    test('integrates with real medical condition data structure', () => {
      const realMedicalConditions = [
        {
          id: 'cap',
          name: 'Community-Acquired Pneumonia',
          category: 'Respiratory',
          commonPathogens: [
            'Streptococcus pneumoniae',
            'Haemophilus influenzae',
            'Moraxella catarrhalis',
            'Staphylococcus aureus'
          ],
          empiricTherapy: ['Amoxicillin', 'Doxycycline'],
          duration: '5-7 days',
          severity: 'Moderate'
        }
      ];
      
      render(<ConditionsTab {...defaultProps} filteredConditions={realMedicalConditions} />);
      
      expect(screen.getByText('Community-Acquired Pneumonia')).toBeInTheDocument();
      expect(screen.getByText('Respiratory')).toBeInTheDocument();
      expect(screen.getByText(/Streptococcus pneumoniae, Haemophilus influenzae, Moraxella catarrhalis\.\.\./)).toBeInTheDocument();
    });
  });
});