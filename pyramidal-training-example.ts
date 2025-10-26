/**
 * CORRECTED IMPLEMENTATION BASED ON PYRAMIDAL TRAINING RESEARCH
 * 
 * Research shows optimal intensity distribution should be:
 * - Zone 1 (Easy/Recovery): 70-80% of total volume
 * - Zone 2 (Tempo/Threshold): 15-25% of total volume  
 * - Zone 3 (High Intensity): 5-10% of total volume
 */

class ImprovedQuickPlanGenerator {
    
    // Fixed daily ratios that sum to 1.0
    static readonly DAILY_MILEAGE_RATIOS = (numDays: number): number[] => {
        const ratios: { [key: number]: number[] } = {
            1: [1.0],
            2: [0.6, 0.4],
            3: [0.35, 0.35, 0.3],  // Fixed: was [0.3, 0.3, 0.2]
            4: [0.28, 0.24, 0.24, 0.24], // Fixed: was [0.25, 0.21, 0.21, 0.333]
            5: [0.2, 0.2, 0.2, 0.2, 0.2] // Fixed: was [0.18, 0.18, 0.2, 0.22, 0.22]
        };
        return ratios[numDays] || [];
    };

    // Pyramidal training intensity distribution
    static readonly INTENSITY_DISTRIBUTION = {
        ZONE_1_PERCENT: 0.75, // 75% easy running (middle of 70-80% range)
        ZONE_2_PERCENT: 0.20, // 20% moderate intensity (middle of 15-25% range)
        ZONE_3_PERCENT: 0.05  // 5% high intensity (minimum of 5-10% range)
    };

    // Run types based on pyramidal training zones
    static readonly RUN_TYPES_BY_ZONE = {
        ZONE_1: ['Recovery Run', 'Easy Run', 'Long Easy Run'],
        ZONE_2: ['Tempo Run', 'Threshold Run', 'Steady State'],
        ZONE_3: ['Interval Run', 'Fartlek', 'Hill Repeats', 'Track Workout']
    };

    // Assign run types based on readiness and pyramidal principles
    static getRunTypeForDay(dayIndex: number, totalDays: number, readinessPercent: number): string {
        const weeklyIntensityBudget = {
            zone1Sessions: Math.floor(totalDays * this.INTENSITY_DISTRIBUTION.ZONE_1_PERCENT),
            zone2Sessions: Math.floor(totalDays * this.INTENSITY_DISTRIBUTION.ZONE_2_PERCENT), 
            zone3Sessions: Math.floor(totalDays * this.INTENSITY_DISTRIBUTION.ZONE_3_PERCENT)
        };

        // Adjust based on readiness
        if (readinessPercent < 50) {
            // Low readiness: mostly zone 1, no zone 3
            return dayIndex === 0 ? 'Recovery Run' : 'Easy Run';
        } else if (readinessPercent < 70) {
            // Moderate readiness: mostly zone 1, minimal zone 2
            if (dayIndex < weeklyIntensityBudget.zone1Sessions) {
                return 'Easy Run';
            } else {
                return 'Tempo Run';
            }
        } else {
            // High readiness: follow pyramidal distribution
            if (dayIndex < weeklyIntensityBudget.zone1Sessions) {
                return dayIndex === totalDays - 1 ? 'Long Easy Run' : 'Easy Run';
            } else if (dayIndex < weeklyIntensityBudget.zone1Sessions + weeklyIntensityBudget.zone2Sessions) {
                return 'Tempo Run';
            } else {
                return 'Interval Run';
            }
        }
    }

    generatePyramidalPlan() {
        const newWeeklyMileage = this.calculateWeeklyMileage();
        const plan: { day: number; mileage: number; runType: string; intensityZone: number }[] = [];

        // Calculate total volume per zone
        const zone1Volume = newWeeklyMileage * this.INTENSITY_DISTRIBUTION.ZONE_1_PERCENT;
        const zone2Volume = newWeeklyMileage * this.INTENSITY_DISTRIBUTION.ZONE_2_PERCENT;
        const zone3Volume = newWeeklyMileage * this.INTENSITY_DISTRIBUTION.ZONE_3_PERCENT;

        let remainingZone1 = zone1Volume;
        let remainingZone2 = zone2Volume;
        let remainingZone3 = zone3Volume;

        for (let i = 0; i < this.#numberOfDays; i++) {
            const dailyRatio = this.DAILY_MILEAGE_RATIOS(this.#numberOfDays)[i];
            const dailyMileage = newWeeklyMileage * dailyRatio;
            
            // Assign intensity zone and run type based on pyramidal principles
            let intensityZone: number;
            let runType: string;
            
            if (remainingZone1 >= dailyMileage && (remainingZone2 < dailyMileage && remainingZone3 < dailyMileage)) {
                intensityZone = 1;
                runType = this.getRunTypeForDay(i, this.#numberOfDays, this.#readinessPercent);
                remainingZone1 -= dailyMileage;
            } else if (remainingZone2 >= dailyMileage && remainingZone3 < dailyMileage) {
                intensityZone = 2;
                runType = 'Tempo Run';
                remainingZone2 -= dailyMileage;
            } else if (remainingZone3 >= dailyMileage) {
                intensityZone = 3;
                runType = 'Interval Run';
                remainingZone3 -= dailyMileage;
            } else {
                // Default to easy run if volume allocation is exhausted
                intensityZone = 1;
                runType = 'Easy Run';
            }

            plan.push({ 
                day: i + 1, 
                mileage: parseFloat(dailyMileage.toFixed(2)), 
                runType,
                intensityZone 
            });
        }

        return plan;
    }
}