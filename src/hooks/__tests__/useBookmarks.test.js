/**
 * Tests for useBookmarks hook
 * @description Comprehensive test suite for bookmark management functionality
 */

import { renderHook, act } from '@testing-library/react';
import useBookmarks from '../useBookmarks';

// Mock localStorage
const mockStorage = {};
Storage.prototype.setItem = jest.fn((key, value) => {
  mockStorage[key] = value;
});
Storage.prototype.getItem = jest.fn((key) => mockStorage[key] || null);
Storage.prototype.removeItem = jest.fn((key) => {
  delete mockStorage[key];
});

describe('useBookmarks Hook', () => {
  const sampleConditions = [
    {
      id: 'pneumonia',
      name: 'Community-Acquired Pneumonia',
      category: 'Respiratory',
      commonPathogens: ['Streptococcus pneumoniae'],
      description: 'Lung infection'
    },
    {
      id: 'uti',
      name: 'Urinary Tract Infection',
      category: 'Genitourinary',
      commonPathogens: ['E. coli'],
      description: 'UTI infection'
    },
    {
      id: 'cellulitis',
      name: 'Cellulitis',
      category: 'Skin and Soft Tissue',
      commonPathogens: ['Staphylococcus aureus'],
      description: 'Skin infection'
    }
  ];

  beforeEach(() => {
    // Clear localStorage before each test
    Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    test('initializes with empty bookmarks array', () => {
      const { result } = renderHook(() => useBookmarks());
      
      expect(result.current.bookmarkedConditions).toEqual([]);
      expect(result.current.bookmarkStats.totalBookmarks).toBe(0);
      expect(result.current.bookmarkStats.categories).toEqual([]);
    });

    test('loads existing bookmarks from localStorage', () => {
      const existingBookmarks = [
        {
          ...sampleConditions[0],
          bookmarkedAt: '2025-07-28T10:00:00Z',
          bookmarkId: 'pneumonia_1234567890'
        }
      ];
      
      mockStorage['bookmarkedConditions'] = JSON.stringify(existingBookmarks);
      
      const { result } = renderHook(() => useBookmarks());
      
      expect(result.current.bookmarkedConditions).toEqual(existingBookmarks);
      expect(result.current.bookmarkStats.totalBookmarks).toBe(1);
    });
  });

  describe('Adding Bookmarks', () => {
    test('adds a new bookmark', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(1);
      expect(result.current.bookmarkedConditions[0].name).toBe('Community-Acquired Pneumonia');
      expect(result.current.bookmarkedConditions[0].bookmarkedAt).toBeDefined();
      expect(result.current.bookmarkedConditions[0].bookmarkId).toBeDefined();
    });

    test('adds bookmark with timestamp and unique ID', () => {
      const { result } = renderHook(() => useBookmarks());
      const beforeTime = new Date().toISOString();
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
      });
      
      const afterTime = new Date().toISOString();
      const bookmark = result.current.bookmarkedConditions[0];
      
      expect(bookmark.bookmarkedAt).toBeGreaterThanOrEqual(beforeTime);
      expect(bookmark.bookmarkedAt).toBeLessThanOrEqual(afterTime);
      expect(bookmark.bookmarkId).toContain(sampleConditions[0].name);
    });

    test('does not add duplicate bookmarks', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
        result.current.addBookmark(sampleConditions[0]);
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(1);
    });

    test('adds multiple different bookmarks', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
        result.current.addBookmark(sampleConditions[1]);
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(2);
      expect(result.current.bookmarkedConditions[0].name).toBe('Community-Acquired Pneumonia');
      expect(result.current.bookmarkedConditions[1].name).toBe('Urinary Tract Infection');
    });
  });

  describe('Removing Bookmarks', () => {
    test('removes existing bookmark by name', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
        result.current.addBookmark(sampleConditions[1]);
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(2);
      
      act(() => {
        result.current.removeBookmark('Community-Acquired Pneumonia');
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(1);
      expect(result.current.bookmarkedConditions[0].name).toBe('Urinary Tract Infection');
    });

    test('does nothing when removing non-existent bookmark', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(1);
      
      act(() => {
        result.current.removeBookmark('Non-existent Condition');
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(1);
    });
  });

  describe('Toggle Bookmark', () => {
    test('toggles bookmark on and off', () => {
      const { result } = renderHook(() => useBookmarks());
      
      // Toggle on
      let toggleResult;
      act(() => {
        toggleResult = result.current.toggleBookmark(sampleConditions[0]);
      });
      
      expect(toggleResult).toBe(true);
      expect(result.current.bookmarkedConditions).toHaveLength(1);
      
      // Toggle off
      act(() => {
        toggleResult = result.current.toggleBookmark(sampleConditions[0]);
      });
      
      expect(toggleResult).toBe(false);
      expect(result.current.bookmarkedConditions).toHaveLength(0);
    });

    test('returns correct bookmark status', () => {
      const { result } = renderHook(() => useBookmarks());
      
      expect(result.current.isBookmarked('Community-Acquired Pneumonia')).toBe(false);
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
      });
      
      expect(result.current.isBookmarked('Community-Acquired Pneumonia')).toBe(true);
      expect(result.current.isBookmarked('Urinary Tract Infection')).toBe(false);
    });
  });

  describe('Bookmark Statistics', () => {
    test('calculates correct statistics', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]); // Respiratory
        result.current.addBookmark(sampleConditions[1]); // Genitourinary
        result.current.addBookmark(sampleConditions[2]); // Skin and Soft Tissue
      });
      
      const stats = result.current.bookmarkStats;
      expect(stats.totalBookmarks).toBe(3);
      expect(stats.categories).toContain('Respiratory');
      expect(stats.categories).toContain('Genitourinary');
      expect(stats.categories).toContain('Skin and Soft Tissue');
      expect(stats.recentBookmarks).toHaveLength(3);
    });

    test('orders recent bookmarks by timestamp', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
      });
      
      // Wait a moment then add another
      setTimeout(() => {
        act(() => {
          result.current.addBookmark(sampleConditions[1]);
        });
      }, 10);
      
      const stats = result.current.bookmarkStats;
      // Most recent should be first
      expect(stats.recentBookmarks[0].name).toBe('Urinary Tract Infection');
    });

    test('limits recent bookmarks to 5', () => {
      const { result } = renderHook(() => useBookmarks());
      
      const manyConditions = Array.from({ length: 10 }, (_, i) => ({
        id: `condition-${i}`,
        name: `Condition ${i}`,
        category: 'Test',
        description: `Description ${i}`
      }));
      
      act(() => {
        manyConditions.forEach(condition => {
          result.current.addBookmark(condition);
        });
      });
      
      expect(result.current.bookmarkStats.recentBookmarks).toHaveLength(5);
    });
  });

  describe('Category Filtering', () => {
    test('filters bookmarks by category', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]); // Respiratory
        result.current.addBookmark(sampleConditions[1]); // Genitourinary
        result.current.addBookmark(sampleConditions[2]); // Skin and Soft Tissue
      });
      
      const respiratoryBookmarks = result.current.getBookmarksByCategory('Respiratory');
      expect(respiratoryBookmarks).toHaveLength(1);
      expect(respiratoryBookmarks[0].name).toBe('Community-Acquired Pneumonia');
      
      const genitourinaryBookmarks = result.current.getBookmarksByCategory('Genitourinary');
      expect(genitourinaryBookmarks).toHaveLength(1);
      expect(genitourinaryBookmarks[0].name).toBe('Urinary Tract Infection');
    });

    test('handles case-insensitive category filtering', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
      });
      
      const bookmarks = result.current.getBookmarksByCategory('respiratory');
      expect(bookmarks).toHaveLength(1);
    });

    test('returns empty array for non-existent category', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
      });
      
      const bookmarks = result.current.getBookmarksByCategory('Non-existent');
      expect(bookmarks).toEqual([]);
    });
  });

  describe('Clear All Bookmarks', () => {
    test('clears all bookmarks', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
        result.current.addBookmark(sampleConditions[1]);
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(2);
      
      act(() => {
        result.current.clearAllBookmarks();
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(0);
      expect(result.current.bookmarkStats.totalBookmarks).toBe(0);
    });
  });

  describe('Export/Import Functionality', () => {
    test('exports bookmarks as JSON', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
        result.current.addBookmark(sampleConditions[1]);
      });
      
      const exportedData = result.current.exportBookmarks();
      const parsedData = JSON.parse(exportedData);
      
      expect(parsedData.bookmarks).toHaveLength(2);
      expect(parsedData.totalCount).toBe(2);
      expect(parsedData.exportDate).toBeDefined();
    });

    test('imports bookmarks successfully', () => {
      const { result } = renderHook(() => useBookmarks());
      
      const importData = {
        bookmarks: [
          { ...sampleConditions[0], bookmarkedAt: '2025-07-28T10:00:00Z', bookmarkId: 'test_1' },
          { ...sampleConditions[1], bookmarkedAt: '2025-07-28T10:01:00Z', bookmarkId: 'test_2' }
        ],
        exportDate: '2025-07-28T10:00:00Z',
        totalCount: 2
      };
      
      let importResult;
      act(() => {
        importResult = result.current.importBookmarks(JSON.stringify(importData));
      });
      
      expect(importResult.success).toBe(true);
      expect(importResult.imported).toBe(2);
      expect(result.current.bookmarkedConditions).toHaveLength(2);
    });

    test('merges imported bookmarks with existing ones', () => {
      const { result } = renderHook(() => useBookmarks());
      
      // Add existing bookmark
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
      });
      
      // Import additional bookmarks
      const importData = {
        bookmarks: [
          { ...sampleConditions[1], bookmarkedAt: '2025-07-28T10:00:00Z', bookmarkId: 'test_1' },
          { ...sampleConditions[2], bookmarkedAt: '2025-07-28T10:01:00Z', bookmarkId: 'test_2' }
        ]
      };
      
      act(() => {
        result.current.importBookmarks(JSON.stringify(importData), { merge: true });
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(3);
    });

    test('replaces bookmarks when merge is false', () => {
      const { result } = renderHook(() => useBookmarks());
      
      // Add existing bookmark
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
      });
      
      // Import with replace
      const importData = {
        bookmarks: [
          { ...sampleConditions[1], bookmarkedAt: '2025-07-28T10:00:00Z', bookmarkId: 'test_1' }
        ]
      };
      
      act(() => {
        result.current.importBookmarks(JSON.stringify(importData), { merge: false });
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(1);
      expect(result.current.bookmarkedConditions[0].name).toBe('Urinary Tract Infection');
    });

    test('handles invalid import data', () => {
      const { result } = renderHook(() => useBookmarks());
      
      let importResult;
      act(() => {
        importResult = result.current.importBookmarks('invalid json');
      });
      
      expect(importResult.success).toBe(false);
      expect(importResult.error).toBeDefined();
    });

    test('handles import data with missing bookmarks array', () => {
      const { result } = renderHook(() => useBookmarks());
      
      const invalidData = { exportDate: '2025-07-28T10:00:00Z' };
      
      let importResult;
      act(() => {
        importResult = result.current.importBookmarks(JSON.stringify(invalidData));
      });
      
      expect(importResult.success).toBe(false);
      expect(importResult.error).toBe('Invalid bookmark data format');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('handles conditions with missing properties', () => {
      const { result } = renderHook(() => useBookmarks());
      
      const incompleteCondition = {
        name: 'Incomplete Condition'
        // Missing other properties
      };
      
      act(() => {
        result.current.addBookmark(incompleteCondition);
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(1);
      expect(result.current.bookmarkedConditions[0].name).toBe('Incomplete Condition');
    });

    test('handles very long condition names', () => {
      const { result } = renderHook(() => useBookmarks());
      
      const longNameCondition = {
        name: 'A'.repeat(1000),
        category: 'Test'
      };
      
      act(() => {
        result.current.addBookmark(longNameCondition);
      });
      
      expect(result.current.bookmarkedConditions).toHaveLength(1);
      expect(result.current.isBookmarked('A'.repeat(1000))).toBe(true);
    });

    test('persists bookmarks to localStorage', () => {
      const { result } = renderHook(() => useBookmarks());
      
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
      });
      
      expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        'bookmarkedConditions',
        expect.stringContaining('Community-Acquired Pneumonia')
      );
    });

    test('handles localStorage failures gracefully', () => {
      // Mock localStorage failure
      Storage.prototype.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });
      
      const { result } = renderHook(() => useBookmarks());
      
      // Should not crash when localStorage fails
      act(() => {
        result.current.addBookmark(sampleConditions[0]);
      });
      
      // Reset mock
      Storage.prototype.setItem.mockImplementation((key, value) => {
        mockStorage[key] = value;
      });
    });
  });

  describe('Performance', () => {
    test('handles large numbers of bookmarks efficiently', () => {
      const { result } = renderHook(() => useBookmarks());
      
      const largeConditionSet = Array.from({ length: 1000 }, (_, i) => ({
        id: `condition-${i}`,
        name: `Condition ${i}`,
        category: `Category ${i % 10}`,
        description: `Description ${i}`
      }));
      
      const startTime = performance.now();
      
      act(() => {
        largeConditionSet.forEach(condition => {
          result.current.addBookmark(condition);
        });
      });
      
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
      expect(result.current.bookmarkedConditions).toHaveLength(1000);
    });

    test('category filtering is efficient with many bookmarks', () => {
      const { result } = renderHook(() => useBookmarks());
      
      const manyConditions = Array.from({ length: 100 }, (_, i) => ({
        id: `condition-${i}`,
        name: `Condition ${i}`,
        category: i % 2 === 0 ? 'Even' : 'Odd',
        description: `Description ${i}`
      }));
      
      act(() => {
        manyConditions.forEach(condition => {
          result.current.addBookmark(condition);
        });
      });
      
      const startTime = performance.now();
      const evenBookmarks = result.current.getBookmarksByCategory('Even');
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(10); // Should be very fast
      expect(evenBookmarks).toHaveLength(50);
    });
  });
});