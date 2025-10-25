import { describe, test, expect } from 'vitest';
import GenerateQuickPlan from '../app/tool/QuickPlanGenerator';

describe('GenerateQuickPlan - Static Methods', () => {
  describe('FEELING_MAP', () => {
    test('should return 90 for excellent feelings', () => {
      expect(GenerateQuickPlan.FEELING_MAP('great')).toBe(90);
      expect(GenerateQuickPlan.FEELING_MAP('strong')).toBe(90);
      expect(GenerateQuickPlan.FEELING_MAP('excellent')).toBe(90);
    });

    test('should return 75 for good feelings', () => {
      expect(GenerateQuickPlan.FEELING_MAP('good')).toBe(75);
      expect(GenerateQuickPlan.FEELING_MAP('fine')).toBe(75);
    });

    test('should return 60 for moderate feelings', () => {
      expect(GenerateQuickPlan.FEELING_MAP('okay')).toBe(60);
      expect(GenerateQuickPlan.FEELING_MAP('moderate')).toBe(60);
      expect(GenerateQuickPlan.FEELING_MAP('normal')).toBe(60);
    });

    test('should return 40 for tired feelings', () => {
      expect(GenerateQuickPlan.FEELING_MAP('tired')).toBe(40);
      expect(GenerateQuickPlan.FEELING_MAP('fatigued')).toBe(40);
      expect(GenerateQuickPlan.FEELING_MAP('exhausted')).toBe(40);
    });

    test('should return 70 for unrecognized feelings', () => {
      expect(GenerateQuickPlan.FEELING_MAP('unknown')).toBe(70);
      expect(GenerateQuickPlan.FEELING_MAP('')).toBe(70);
      expect(GenerateQuickPlan.FEELING_MAP('random')).toBe(70);
    });
  });

  describe('DAILY_MILEAGE_RATIOS', () => {
    test('should return correct ratios for 1 day', () => {
      const ratios = GenerateQuickPlan.DAILY_MILEAGE_RATIOS(1);
      expect(ratios).toEqual([1.0]);
    });

    test('should return correct ratios for 2 days', () => {
      const ratios = GenerateQuickPlan.DAILY_MILEAGE_RATIOS(2);
      expect(ratios).toEqual([0.6, 0.4]);
    });

    test('should return correct ratios for 3 days', () => {
      const ratios = GenerateQuickPlan.DAILY_MILEAGE_RATIOS(3);
      expect(ratios).toEqual([0.3, 0.3, 0.2]);
    });

    test('should return correct ratios for 4 days', () => {
      const ratios = GenerateQuickPlan.DAILY_MILEAGE_RATIOS(4);
      expect(ratios).toEqual([0.25, 0.21, 0.21, 0.333]);
    });

    test('should return correct ratios for 5 days', () => {
      const ratios = GenerateQuickPlan.DAILY_MILEAGE_RATIOS(5);
      expect(ratios).toEqual([0.18, 0.18, 0.2, 0.22, 0.22]);
    });

    test('should return empty array for unsupported days', () => {
      expect(GenerateQuickPlan.DAILY_MILEAGE_RATIOS(0)).toEqual([]);
      expect(GenerateQuickPlan.DAILY_MILEAGE_RATIOS(6)).toEqual([]);
      expect(GenerateQuickPlan.DAILY_MILEAGE_RATIOS(-1)).toEqual([]);
    });

    test('should ensure ratios sum appropriately', () => {
      for (let days = 1; days <= 5; days++) {
        const ratios = GenerateQuickPlan.DAILY_MILEAGE_RATIOS(days);
        const sum = ratios.reduce((acc, ratio) => acc + ratio, 0);
        expect(sum).toBeCloseTo(1.0, 2); // Allow for small rounding differences
      }
    });
  });

  describe('RUN_TYPE_SPLITS', () => {
    test('should return correct splits for 80% readiness', () => {
      const splits = GenerateQuickPlan.RUN_TYPE_SPLITS(80);
      expect(splits).toEqual({
        0.333: 'Easy Run',
        0.533: 'Tempo Run',
        1: 'Progressive Run',
      });
    });

    test('should return correct splits for 70% readiness', () => {
      const splits = GenerateQuickPlan.RUN_TYPE_SPLITS(70);
      expect(splits).toEqual({
        0.333: 'Very Easy Run',
        0.533: 'Easy Run',
        1: 'Progressive Run',
      });
    });

    test('should return correct splits for 50% readiness', () => {
      const splits = GenerateQuickPlan.RUN_TYPE_SPLITS(50);
      expect(splits).toEqual({
        0.333: 'Very Easy Run',
        0.533: 'Recovery Run',
        1: 'Easy Run',
      });
    });

    test('should return correct splits for 0% readiness', () => {
      const splits = GenerateQuickPlan.RUN_TYPE_SPLITS(0);
      expect(splits).toEqual({
        0.533: 'Recovery Run',
        1: 'Very Easy Run',
      });
    });

    test('should return empty object for unrecognized readiness levels', () => {
      expect(GenerateQuickPlan.RUN_TYPE_SPLITS(45)).toEqual({});
      expect(GenerateQuickPlan.RUN_TYPE_SPLITS(85)).toEqual({});
      expect(GenerateQuickPlan.RUN_TYPE_SPLITS(-10)).toEqual({});
    });
  });

  describe('getReadinessPercent', () => {
    test('should return correct percentages for all feeling categories', () => {
      expect(GenerateQuickPlan.getReadinessPercent('great')).toBe(90);
      expect(GenerateQuickPlan.getReadinessPercent('good')).toBe(75);
      expect(GenerateQuickPlan.getReadinessPercent('okay')).toBe(60);
      expect(GenerateQuickPlan.getReadinessPercent('tired')).toBe(40);
    });

    test('should return default 70 for unknown feelings', () => {
      expect(GenerateQuickPlan.getReadinessPercent('unknown')).toBe(70);
      expect(GenerateQuickPlan.getReadinessPercent('')).toBe(70);
    });
  });

  describe('getNumberOfAllowedTrainingDays', () => {
    test('should return correct days for high readiness (≥80%)', () => {
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(80)).toBe(5);
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(85)).toBe(5);
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(100)).toBe(5);
    });

    test('should return correct days for good readiness (≥70%)', () => {
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(70)).toBe(4);
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(75)).toBe(4);
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(79)).toBe(4);
    });

    test('should return correct days for moderate readiness (≥50%)', () => {
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(50)).toBe(3);
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(60)).toBe(3);
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(69)).toBe(3);
    });

    test('should return correct days for low readiness (<50%)', () => {
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(0)).toBe(2);
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(30)).toBe(2);
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(49)).toBe(2);
    });

    test('should handle edge cases', () => {
      expect(GenerateQuickPlan.getNumberOfAllowedTrainingDays(-10)).toBe(2);
    });
  });
});