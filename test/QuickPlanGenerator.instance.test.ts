import { describe, test, expect, beforeEach } from 'vitest';
import GenerateQuickPlan from '../app/tool/QuickPlanGenerator';

describe('GenerateQuickPlan - Instance Methods', () => {
  describe('Constructor', () => {
    test('should initialize with correct properties', () => {
      const planner = new GenerateQuickPlan('great', 50, 4);
      
      // Test internal state by checking behavior
      expect(planner.calculateWeeklyMileage()).toBe(55); // 50 * 1.1 (great feeling = 90% readiness = 1.1 ratio)
    });

    test('should handle different feeling inputs', () => {
      const greatPlanner = new GenerateQuickPlan('great', 50, 4);
      const tiredPlanner = new GenerateQuickPlan('tired', 50, 4);
      
      // Great feeling should increase mileage (90% readiness -> 1.1 ratio)
      expect(greatPlanner.calculateWeeklyMileage()).toBe(55);
      
      // Tired feeling should decrease mileage (40% readiness -> 0.8 ratio)
      expect(tiredPlanner.calculateWeeklyMileage()).toBe(40);
    });
  });

  describe('calculateWeeklyMileage', () => {
    test('should increase mileage by 10% for high readiness (≥85%)', () => {
      const planner = new GenerateQuickPlan('great', 50, 4); // great = 90% readiness
      expect(planner.calculateWeeklyMileage()).toBe(55); // 50 * 1.1
    });

    test('should maintain mileage for good readiness (≥70%)', () => {
      const planner = new GenerateQuickPlan('good', 50, 4); // good = 75% readiness
      expect(planner.calculateWeeklyMileage()).toBe(50); // 50 * 1.0
    });

    test('should decrease mileage by 10% for moderate readiness (≥45%)', () => {
      const planner = new GenerateQuickPlan('okay', 50, 4); // okay = 60% readiness
      expect(planner.calculateWeeklyMileage()).toBe(45); // 50 * 0.9
    });

    test('should decrease mileage by 20% for low readiness (<45%)', () => {
      const planner = new GenerateQuickPlan('tired', 50, 4); // tired = 40% readiness
      expect(planner.calculateWeeklyMileage()).toBe(40); // 50 * 0.8
    });

    test('should handle zero weekly kilometers', () => {
      const planner = new GenerateQuickPlan('great', 0, 4);
      expect(planner.calculateWeeklyMileage()).toBe(0);
    });

    test('should handle different weekly mileage amounts', () => {
      const lowMileage = new GenerateQuickPlan('good', 20, 3);
      const highMileage = new GenerateQuickPlan('good', 100, 5);
      
      expect(lowMileage.calculateWeeklyMileage()).toBe(20);
      expect(highMileage.calculateWeeklyMileage()).toBe(100);
    });
  });

  describe('generatePlan', () => {
    test('should generate correct number of days', () => {
      const planner3Days = new GenerateQuickPlan('good', 50, 3);
      const planner5Days = new GenerateQuickPlan('good', 50, 5);
      
      expect(planner3Days.generatePlan()).toHaveLength(3);
      expect(planner5Days.generatePlan()).toHaveLength(5);
    });

    test('should generate plan with correct structure', () => {
      const planner = new GenerateQuickPlan('good', 50, 3);
      const plan = planner.generatePlan();
      
      plan.forEach((day, index) => {
        expect(day).toHaveProperty('day', index + 1);
        expect(day).toHaveProperty('mileage');
        expect(day).toHaveProperty('runType');
        expect(typeof day.mileage).toBe('number');
        expect(typeof day.runType).toBe('string');
        expect(day.mileage).toBeGreaterThanOrEqual(0);
      });
    });

    test('should distribute mileage according to daily ratios', () => {
      const planner = new GenerateQuickPlan('good', 60, 3); // 60km, 3 days, good feeling (no change in mileage)
      const plan = planner.generatePlan();
      
      // For 3 days: ratios are [0.3, 0.3, 0.2]
      // Expected mileages: [18, 18, 12]
      expect(plan[0].mileage).toBeCloseTo(18, 1);
      expect(plan[1].mileage).toBeCloseTo(18, 1);
      expect(plan[2].mileage).toBeCloseTo(12, 1);
    });

    test('should assign appropriate run types based on readiness', () => {
      // Test with different readiness levels
      const highReadiness = new GenerateQuickPlan('great', 50, 3); // 90% readiness
      const lowReadiness = new GenerateQuickPlan('tired', 50, 3); // 40% readiness
      
      const highPlan = highReadiness.generatePlan();
      const lowPlan = lowReadiness.generatePlan();
      
      // All plans should have run types assigned
      highPlan.forEach(day => {
        expect(day.runType).toBeTruthy();
        expect(typeof day.runType).toBe('string');
      });
      
      lowPlan.forEach(day => {
        expect(day.runType).toBeTruthy();
        expect(typeof day.runType).toBe('string');
      });
    });

    test('should handle single day plan', () => {
      const planner = new GenerateQuickPlan('good', 50, 1);
      const plan = planner.generatePlan();
      
      expect(plan).toHaveLength(1);
      expect(plan[0].day).toBe(1);
      expect(plan[0].mileage).toBe(50); // All mileage in one day
    });

    test('should handle maximum days plan', () => {
      const planner = new GenerateQuickPlan('good', 50, 5);
      const plan = planner.generatePlan();
      
      expect(plan).toHaveLength(5);
      expect(plan[0].day).toBe(1);
      expect(plan[4].day).toBe(5);
    });

    test('should return mileage rounded to 2 decimal places', () => {
      const planner = new GenerateQuickPlan('good', 33.33, 3);
      const plan = planner.generatePlan();
      
      plan.forEach(day => {
        expect(day.mileage.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
      });
    });

    test('should handle zero mileage input', () => {
      const planner = new GenerateQuickPlan('good', 0, 3);
      const plan = planner.generatePlan();
      
      expect(plan).toHaveLength(3);
      plan.forEach(day => {
        expect(day.mileage).toBe(0);
        expect(day.runType).toBeTruthy();
      });
    });

    test('should assign default run type when no matching type found', () => {
      // This tests the fallback case in the run type assignment
      const planner = new GenerateQuickPlan('unknown_feeling', 50, 3);
      const plan = planner.generatePlan();
      
      plan.forEach(day => {
        expect(day.runType).toBeTruthy();
        // Should default to 'Easy Run' when no matching type is found
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle invalid number of days gracefully', () => {
      const planner = new GenerateQuickPlan('good', 50, 0);
      const plan = planner.generatePlan();
      expect(plan).toHaveLength(0);
    });

    test('should handle negative weekly mileage', () => {
      const planner = new GenerateQuickPlan('good', -50, 3);
      const adjustedMileage = planner.calculateWeeklyMileage();
      expect(adjustedMileage).toBe(-50); // Should maintain the negative value
    });

    test('should handle very large mileage numbers', () => {
      const planner = new GenerateQuickPlan('good', 1000, 5);
      const plan = planner.generatePlan();
      
      expect(plan).toHaveLength(5);
      const totalMileage = plan.reduce((sum, day) => sum + day.mileage, 0);
      expect(totalMileage).toBeCloseTo(1000, 1);
    });
  });
});