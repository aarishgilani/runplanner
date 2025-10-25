import { describe, test, expect } from 'vitest';
import GenerateQuickPlan from '../app/tool/QuickPlanGenerator';

describe('GenerateQuickPlan - Integration Tests', () => {
  describe('Complete Workflow Scenarios', () => {
    test('should create a complete training plan for a beginner runner feeling great', () => {
      const planner = new GenerateQuickPlan('great', 20, 3);
      const plan = planner.generatePlan();
      
      // Verify plan structure
      expect(plan).toHaveLength(3);
      
      // Calculate expected adjusted mileage: 20km * 1.1 (great feeling) = 22km
      const expectedTotalMileage = 22;
      const actualTotalMileage = plan.reduce((sum, day) => sum + day.mileage, 0);
      expect(actualTotalMileage).toBeCloseTo(expectedTotalMileage, 1);
      
      // Verify mileage distribution follows ratios [0.3, 0.3, 0.2]
      expect(plan[0].mileage).toBeCloseTo(6.6, 1); // 22 * 0.3
      expect(plan[1].mileage).toBeCloseTo(6.6, 1); // 22 * 0.3
      expect(plan[2].mileage).toBeCloseTo(4.4, 1); // 22 * 0.2
      
      // All days should have appropriate run types
      plan.forEach(day => {
        expect(day.runType).toBeTruthy();
        expect(typeof day.runType).toBe('string');
      });
    });

    test('should create a recovery plan for an exhausted experienced runner', () => {
      const planner = new GenerateQuickPlan('exhausted', 80, 2);
      const plan = planner.generatePlan();
      
      // Verify plan structure
      expect(plan).toHaveLength(2);
      
      // Calculate expected adjusted mileage: 80km * 0.8 (exhausted feeling) = 64km
      const expectedTotalMileage = 64;
      const actualTotalMileage = plan.reduce((sum, day) => sum + day.mileage, 0);
      expect(actualTotalMileage).toBeCloseTo(expectedTotalMileage, 1);
      
      // Verify mileage distribution follows ratios [0.6, 0.4]
      expect(plan[0].mileage).toBeCloseTo(38.4, 1); // 64 * 0.6
      expect(plan[1].mileage).toBeCloseTo(25.6, 1); // 64 * 0.4
    });

    test('should handle optimal training scenario for experienced runner', () => {
      const planner = new GenerateQuickPlan('good', 60, 5);
      const plan = planner.generatePlan();
      
      // Verify plan structure
      expect(plan).toHaveLength(5);
      
      // Good feeling maintains mileage: 60km * 1.0 = 60km
      const expectedTotalMileage = 60;
      const actualTotalMileage = plan.reduce((sum, day) => sum + day.mileage, 0);
      expect(actualTotalMileage).toBeCloseTo(expectedTotalMileage, 1);
      
      // Verify all days have progressive difficulty structure
      expect(plan[0].day).toBe(1);
      expect(plan[4].day).toBe(5);
      
      // Verify mileage follows 5-day ratios [0.18, 0.18, 0.2, 0.22, 0.22]
      expect(plan[0].mileage).toBeCloseTo(10.8, 1); // 60 * 0.18
      expect(plan[1].mileage).toBeCloseTo(10.8, 1); // 60 * 0.18
      expect(plan[2].mileage).toBeCloseTo(12, 1);   // 60 * 0.2
      expect(plan[3].mileage).toBeCloseTo(13.2, 1); // 60 * 0.22
      expect(plan[4].mileage).toBeCloseTo(13.2, 1); // 60 * 0.22
    });

    test('should validate training days recommendation matches readiness', () => {
      // Test high readiness scenario
      const highReadinessPlanner = new GenerateQuickPlan('excellent', 50, 5);
      const maxAllowedDays = GenerateQuickPlan.getNumberOfAllowedTrainingDays(
        GenerateQuickPlan.getReadinessPercent('excellent')
      );
      
      expect(maxAllowedDays).toBe(5); // Should allow 5 days for excellent feeling (90% readiness)
      
      const plan = highReadinessPlanner.generatePlan();
      expect(plan).toHaveLength(5); // Should be able to create a 5-day plan
      
      // Test low readiness scenario
      const lowReadinessPercent = GenerateQuickPlan.getReadinessPercent('exhausted');
      const lowAllowedDays = GenerateQuickPlan.getNumberOfAllowedTrainingDays(lowReadinessPercent);
      
      expect(lowAllowedDays).toBe(2); // Should only allow 2 days for exhausted feeling
    });
  });

  describe('Real-world Training Scenarios', () => {
    test('should handle comeback training after injury', () => {
      // Simulating someone returning to training with low weekly volume and cautious feeling
      const planner = new GenerateQuickPlan('okay', 15, 3);
      const plan = planner.generatePlan();
      
      // Should reduce mileage due to okay feeling (60% readiness -> 0.9 ratio)
      const expectedMileage = 15 * 0.9; // 13.5km
      const actualTotal = plan.reduce((sum, day) => sum + day.mileage, 0);
      expect(actualTotal).toBeCloseTo(expectedMileage, 1);
      
      // Should have conservative run types
      plan.forEach(day => {
        expect(day.runType).toBeTruthy();
      });
    });

    test('should handle peak training week', () => {
      // Experienced runner feeling strong with high weekly volume
      const planner = new GenerateQuickPlan('strong', 100, 5);
      const plan = planner.generatePlan();
      
      // Should increase mileage due to strong feeling (90% readiness -> 1.1 ratio)
      const expectedMileage = 100 * 1.1; // 110km
      const actualTotal = plan.reduce((sum, day) => sum + day.mileage, 0);
      expect(actualTotal).toBeCloseTo(expectedMileage, 1);
      
      // Should distribute across 5 days
      expect(plan).toHaveLength(5);
    });

    test('should handle moderate maintenance week', () => {
      // Regular training week with moderate feeling
      const planner = new GenerateQuickPlan('fine', 45, 4);
      const plan = planner.generatePlan();
      
      // Fine feeling maintains mileage (75% readiness -> 1.0 ratio)
      const expectedMileage = 45;
      const actualTotal = plan.reduce((sum, day) => sum + day.mileage, 0);
      expect(actualTotal).toBeCloseTo(expectedMileage, 1);
      
      // Should follow 4-day distribution
      expect(plan).toHaveLength(4);
      const ratios = GenerateQuickPlan.DAILY_MILEAGE_RATIOS(4);
      plan.forEach((day, index) => {
        expect(day.mileage).toBeCloseTo(expectedMileage * ratios[index], 1);
      });
    });
  });

  describe('Boundary Condition Integration Tests', () => {
    test('should handle minimum viable training plan', () => {
      const planner = new GenerateQuickPlan('tired', 10, 1);
      const plan = planner.generatePlan();
      
      expect(plan).toHaveLength(1);
      expect(plan[0].mileage).toBe(8); // 10 * 0.8 (tired = 40% readiness)
      expect(plan[0].day).toBe(1);
      expect(plan[0].runType).toBeTruthy();
    });

    test('should handle high-volume training plan', () => {
      const planner = new GenerateQuickPlan('excellent', 150, 5);
      const plan = planner.generatePlan();
      
      // Should increase to 165km (150 * 1.1)
      const expectedTotal = 165;
      const actualTotal = plan.reduce((sum, day) => sum + day.mileage, 0);
      expect(actualTotal).toBeCloseTo(expectedTotal, 1);
      
      expect(plan).toHaveLength(5);
      
      // Highest single day should be reasonable (last two days get 0.22 ratio each)
      const maxDayMileage = Math.max(...plan.map(day => day.mileage));
      expect(maxDayMileage).toBeCloseTo(36.3, 1); // 165 * 0.22
    });

    test('should handle edge case of unsupported day count gracefully', () => {
      const planner = new GenerateQuickPlan('good', 50, 6); // 6 days not supported
      const plan = planner.generatePlan();
      
      // Should handle gracefully by returning empty plan or fallback behavior
      expect(Array.isArray(plan)).toBe(true);
    });
  });

  describe('Data Consistency and Validation', () => {
    test('should ensure mileage conservation across all scenarios', () => {
      const scenarios = [
        { feeling: 'great', weekly: 30, days: 3 },
        { feeling: 'good', weekly: 50, days: 4 },
        { feeling: 'okay', weekly: 40, days: 2 },
        { feeling: 'tired', weekly: 60, days: 5 },
      ];

      scenarios.forEach(({ feeling, weekly, days }) => {
        const planner = new GenerateQuickPlan(feeling, weekly, days);
        const plan = planner.generatePlan();
        const expectedTotal = planner.calculateWeeklyMileage();
        const actualTotal = plan.reduce((sum, day) => sum + day.mileage, 0);
        
        expect(actualTotal).toBeCloseTo(expectedTotal, 1);
      });
    });

    test('should ensure all generated plans have valid structure', () => {
      const feelings = ['great', 'good', 'okay', 'tired', 'exhausted'];
      const weeklyKms = [20, 50, 80];
      const dayOptions = [1, 2, 3, 4, 5];

      feelings.forEach(feeling => {
        weeklyKms.forEach(weekly => {
          dayOptions.forEach(days => {
            const planner = new GenerateQuickPlan(feeling, weekly, days);
            const plan = planner.generatePlan();

            // Verify structure
            expect(Array.isArray(plan)).toBe(true);
            
            if (days <= 5) { // Only test supported day counts
              expect(plan).toHaveLength(days);
              
              plan.forEach((day, index) => {
                expect(day).toHaveProperty('day');
                expect(day).toHaveProperty('mileage');
                expect(day).toHaveProperty('runType');
                expect(day.day).toBe(index + 1);
                expect(typeof day.mileage).toBe('number');
                expect(typeof day.runType).toBe('string');
                expect(day.mileage).toBeGreaterThanOrEqual(0);
              });
            }
          });
        });
      });
    });
  });
});