/**
 * Tests for useQuizProgress hook
 * @description Comprehensive test suite for quiz progress tracking and analytics
 */

import { renderHook, act } from '@testing-library/react';
import useQuizProgress from '../useQuizProgress';

// Mock localStorage
const mockStorage = {};
Storage.prototype.setItem = jest.fn((key, value) => {
  mockStorage[key] = value;
});
Storage.prototype.getItem = jest.fn((key) => mockStorage[key] || null);
Storage.prototype.removeItem = jest.fn((key) => {
  delete mockStorage[key];
});

describe('useQuizProgress Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    test('initializes with empty state', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      expect(result.current.quizHistory).toEqual([]);
      expect(result.current.currentSession).toBeNull();
      expect(result.current.stats.totalQuizzes).toBe(0);
      expect(result.current.stats.averageScore).toBe(0);
      expect(result.current.stats.bestScore).toBe(0);
    });

    test('loads existing history from localStorage', () => {
      const existingHistory = [
        {
          quizId: 'test-1',
          scorePercentage: 85,
          completedAt: '2025-07-28T10:00:00Z'
        }
      ];
      
      mockStorage['quizHistory'] = JSON.stringify(existingHistory);
      
      const { result } = renderHook(() => useQuizProgress());
      
      expect(result.current.quizHistory).toEqual(existingHistory);
      expect(result.current.stats.totalQuizzes).toBe(1);
      expect(result.current.stats.averageScore).toBe(85);
    });
  });

  describe('Starting a Quiz', () => {
    test('starts a new quiz session', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      act(() => {
        const session = result.current.startQuiz('quiz-1', 10);
        expect(session.quizId).toBe('quiz-1');
        expect(session.totalQuestions).toBe(10);
        expect(session.answers).toEqual([]);
        expect(session.currentQuestion).toBe(0);
      });
      
      expect(result.current.currentSession).not.toBeNull();
      expect(result.current.currentSession.quizId).toBe('quiz-1');
    });

    test('includes start timestamp when starting quiz', () => {
      const { result } = renderHook(() => useQuizProgress());
      const beforeTime = new Date().toISOString();
      
      act(() => {
        result.current.startQuiz('quiz-1', 5);
      });
      
      const afterTime = new Date().toISOString();
      const sessionTime = result.current.currentSession.startTime;
      
      expect(sessionTime).toBeGreaterThanOrEqual(beforeTime);
      expect(sessionTime).toBeLessThanOrEqual(afterTime);
    });
  });

  describe('Recording Answers', () => {
    test('records correct answer', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      act(() => {
        result.current.startQuiz('quiz-1', 3);
      });
      
      act(() => {
        result.current.recordAnswer(0, 2, 2, 'What is the first-line treatment for UTI?');
      });
      
      const session = result.current.currentSession;
      expect(session.answers).toHaveLength(1);
      expect(session.answers[0].isCorrect).toBe(true);
      expect(session.answers[0].selectedAnswer).toBe(2);
      expect(session.answers[0].correctAnswer).toBe(2);
      expect(session.currentQuestion).toBe(1);
    });

    test('records incorrect answer', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      act(() => {
        result.current.startQuiz('quiz-1', 3);
      });
      
      act(() => {
        result.current.recordAnswer(0, 1, 2, 'Test question');
      });
      
      const answer = result.current.currentSession.answers[0];
      expect(answer.isCorrect).toBe(false);
      expect(answer.selectedAnswer).toBe(1);
      expect(answer.correctAnswer).toBe(2);
    });

    test('handles recording multiple answers', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      act(() => {
        result.current.startQuiz('quiz-1', 3);
      });
      
      act(() => {
        result.current.recordAnswer(0, 1, 1, 'Question 1');
        result.current.recordAnswer(1, 2, 2, 'Question 2');
        result.current.recordAnswer(2, 1, 2, 'Question 3');
      });
      
      const session = result.current.currentSession;
      expect(session.answers).toHaveLength(3);
      expect(session.currentQuestion).toBe(3);
      expect(session.answers.filter(a => a.isCorrect)).toHaveLength(2);
    });

    test('does not record answer without active session', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      act(() => {
        result.current.recordAnswer(0, 1, 2, 'Test question');
      });
      
      expect(result.current.currentSession).toBeNull();
    });
  });

  describe('Completing Quiz', () => {
    test('completes quiz and saves to history', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      act(() => {
        result.current.startQuiz('quiz-1', 3);
        result.current.recordAnswer(0, 1, 1, 'Question 1');
        result.current.recordAnswer(1, 2, 2, 'Question 2');
        result.current.recordAnswer(2, 1, 2, 'Question 3');
      });
      
      let completedQuiz;
      act(() => {
        completedQuiz = result.current.completeQuiz();
      });
      
      expect(completedQuiz).not.toBeNull();
      expect(completedQuiz.correctAnswers).toBe(2);
      expect(completedQuiz.scorePercentage).toBe(67);
      expect(result.current.quizHistory).toHaveLength(1);
      expect(result.current.currentSession).toBeNull();
    });

    test('calculates duration correctly', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      act(() => {
        result.current.startQuiz('quiz-1', 1);
        result.current.recordAnswer(0, 1, 1, 'Question 1');
      });
      
      let completedQuiz;
      act(() => {
        completedQuiz = result.current.completeQuiz();
      });
      
      expect(completedQuiz.duration).toMatch(/\d+m \d+s/);
    });

    test('does not complete quiz without session', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      let completedQuiz;
      act(() => {
        completedQuiz = result.current.completeQuiz();
      });
      
      expect(completedQuiz).toBeNull();
      expect(result.current.quizHistory).toHaveLength(0);
    });

    test('does not complete quiz without answers', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      act(() => {
        result.current.startQuiz('quiz-1', 3);
      });
      
      let completedQuiz;
      act(() => {
        completedQuiz = result.current.completeQuiz();
      });
      
      expect(completedQuiz).toBeNull();
    });
  });

  describe('Statistics Calculation', () => {
    test('calculates statistics correctly with multiple quizzes', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      // Complete first quiz (80%)
      act(() => {
        result.current.startQuiz('quiz-1', 5);
        result.current.recordAnswer(0, 1, 1, 'Q1');
        result.current.recordAnswer(1, 1, 1, 'Q2');
        result.current.recordAnswer(2, 1, 1, 'Q3');
        result.current.recordAnswer(3, 1, 1, 'Q4');
        result.current.recordAnswer(4, 0, 1, 'Q5');
        result.current.completeQuiz();
      });
      
      // Complete second quiz (100%)
      act(() => {
        result.current.startQuiz('quiz-2', 2);
        result.current.recordAnswer(0, 1, 1, 'Q1');
        result.current.recordAnswer(1, 1, 1, 'Q2');
        result.current.completeQuiz();
      });
      
      const stats = result.current.stats;
      expect(stats.totalQuizzes).toBe(2);
      expect(stats.averageScore).toBe(90); // (80 + 100) / 2 = 90
      expect(stats.bestScore).toBe(100);
      expect(stats.recentQuizzes).toHaveLength(2);
    });

    test('calculates improvement trend', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      // Simulate improving trend - lower scores followed by higher scores
      const quizData = [
        { scores: [50, 55, 60], trend: 'insufficient_data' },
        { scores: [50, 55, 60, 65, 70], trend: 'insufficient_data' },
        { scores: [50, 55, 60, 65, 70, 75, 80, 85, 90, 95], trend: 'improving' }
      ];
      
      quizData.forEach(({ scores, trend }) => {
        // Reset state
        act(() => {
          result.current.clearHistory();
        });
        
        // Add quizzes with scores
        scores.forEach((score, index) => {
          act(() => {
            result.current.startQuiz(`quiz-${index}`, 10);
            const correctAnswers = Math.floor((score / 100) * 10);
            for (let i = 0; i < 10; i++) {
              result.current.recordAnswer(i, i < correctAnswers ? 1 : 0, 1, `Question ${i}`);
            }
            result.current.completeQuiz();
          });
        });
        
        expect(result.current.stats.improvementTrend).toBe(trend);
      });
    });

    test('calculates streak count correctly', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      // Create quizzes with scores: 70, 85, 90, 95 (streak should be 3)
      const scores = [70, 85, 90, 95];
      scores.forEach((score, index) => {
        act(() => {
          result.current.startQuiz(`quiz-${index}`, 10);
          const correctAnswers = Math.floor((score / 100) * 10);
          for (let i = 0; i < 10; i++) {
            result.current.recordAnswer(i, i < correctAnswers ? 1 : 0, 1, `Question ${i}`);
          }
          result.current.completeQuiz();
        });
      });
      
      expect(result.current.stats.streakCount).toBe(3); // 85, 90, 95 are >= 80%
    });
  });

  describe('Topic Performance', () => {
    test('tracks topic performance', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      act(() => {
        result.current.startQuiz('quiz-1', 3);
        result.current.recordAnswer(0, 1, 1, 'What is the treatment for pneumonia?');
        result.current.recordAnswer(1, 0, 1, 'Pneumonia complications include?');
        result.current.recordAnswer(2, 1, 1, 'UTI treatment involves?');
        result.current.completeQuiz();
      });
      
      const pneumoniaPerformance = result.current.getTopicPerformance('pneumonia');
      expect(pneumoniaPerformance).not.toBeNull();
      expect(pneumoniaPerformance.topic).toBe('pneumonia');
      expect(pneumoniaPerformance.totalQuestions).toBe(2);
      expect(pneumoniaPerformance.correctAnswers).toBe(1);
      expect(pneumoniaPerformance.accuracy).toBe(50);
    });

    test('returns null for unknown topic', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      const performance = result.current.getTopicPerformance('unknown-topic');
      expect(performance).toBeNull();
    });
  });

  describe('Session Management', () => {
    test('resets current session', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      act(() => {
        result.current.startQuiz('quiz-1', 5);
        result.current.recordAnswer(0, 1, 1, 'Question 1');
      });
      
      expect(result.current.currentSession).not.toBeNull();
      
      act(() => {
        result.current.resetCurrentSession();
      });
      
      expect(result.current.currentSession).toBeNull();
    });

    test('clears all history', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      // Add some quiz history
      act(() => {
        result.current.startQuiz('quiz-1', 2);
        result.current.recordAnswer(0, 1, 1, 'Q1');
        result.current.recordAnswer(1, 1, 1, 'Q2');
        result.current.completeQuiz();
      });
      
      expect(result.current.quizHistory).toHaveLength(1);
      
      act(() => {
        result.current.clearHistory();
      });
      
      expect(result.current.quizHistory).toHaveLength(0);
      expect(result.current.stats.totalQuizzes).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    test('handles empty quiz history gracefully', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      expect(result.current.stats.improvementTrend).toBe('insufficient_data');
      expect(result.current.stats.weakAreas).toEqual([]);
      expect(result.current.stats.streakCount).toBe(0);
    });

    test('handles malformed localStorage data', () => {
      mockStorage['quizHistory'] = 'invalid-json';
      
      const { result } = renderHook(() => useQuizProgress());
      
      // Should fall back to empty array
      expect(result.current.quizHistory).toEqual([]);
    });

    test('persists data to localStorage correctly', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      act(() => {
        result.current.startQuiz('quiz-1', 1);
        result.current.recordAnswer(0, 1, 1, 'Question 1');
        result.current.completeQuiz();
      });
      
      expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        'quizHistory',
        expect.stringContaining('quiz-1')
      );
    });
  });

  describe('Performance', () => {
    test('handles large quiz history efficiently', () => {
      const { result } = renderHook(() => useQuizProgress());
      
      // Create 100 quiz entries
      const largeHistory = Array.from({ length: 100 }, (_, i) => ({
        quizId: `quiz-${i}`,
        scorePercentage: 50 + (i % 50),
        completedAt: new Date(Date.now() - i * 1000).toISOString(),
        answers: [{ isCorrect: true, questionText: 'Sample question' }]
      }));
      
      mockStorage['quizHistory'] = JSON.stringify(largeHistory);
      
      const startTime = performance.now();
      renderHook(() => useQuizProgress());
      const endTime = performance.now();
      
      // Should render efficiently even with large dataset
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('memoizes statistics calculation', () => {
      const { result, rerender } = renderHook(() => useQuizProgress());
      
      const initialStats = result.current.stats;
      
      // Rerender without changing quiz history
      rerender();
      
      // Stats object should be the same reference (memoized)
      expect(result.current.stats).toBe(initialStats);
    });
  });
});