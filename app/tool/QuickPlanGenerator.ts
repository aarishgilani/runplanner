/**
 * Logic module houses the core functions
 *  and algorithms for the Quick Plan Tool.
 */

class GenerateQuickPlan {
    /**
     * ========= PRIVATE PROPERTIES ==========
     */
    #feeling: string;
    #weeklyKms: number;
    #numberOfDays: number;
    #readinessPercent: number;

    /**
     * ========== Class Constants ==========
     */
    static readonly FEELING_MAP = (feeling: string): number => {
        switch (feeling) {
            case 'great':
            case 'strong':
            case 'excellent':
                return 90;
            case 'good':
            case 'fine':
                return 75;
            case 'okay':
            case 'moderate':
            case 'normal':
                return 60;
            case 'tired':
            case 'fatigued':
                return 40;
            case 'exhausted':
                return 40;
        }

        return 70;
    };

    static readonly DAILY_MILEAGE_RATIOS = (numDays: number): number[] => {
        const ratios: { [key: number]: number[] } = {
            1: [1.0],
            2: [0.6, 0.4],
            3: [0.35, 0.35, 0.3],
            4: [0.28, 0.24, 0.24, 0.24],
            5: [0.2, 0.2, 0.2, 0.2, 0.2]
        };
        return ratios[numDays] || [];
    }

    /**
     * Uses 80/20 principle to determine the ratio
     *  of easy to types of runs based on readiness.
     * 
     * Valid types:
     *  - easy
     *  - tempo
     *  - highIntensity
     * 
     * @returns Object -- run type splits
     */
    static readonly RUN_TYPE_SPLITS = (readinessPercentage: number): { [key: string]: any } => {
        const splitMap: { [key: number]: any } = {
            80: {
                0.333: 'Easy Run',
                0.533: 'Tempo Run',
                1: 'Progressive Run',
            },

            70: {
                0.333: 'Very Easy Run',
                0.533: 'Easy Run',
                1: 'Progressive Run',
            },

            50: {
                0.333: 'Very Easy Run',
                0.533: 'Recovery Run',
                1: 'Easy Run',
            },

            0: {
                0.533: 'Recovery Run',
                1: 'Very Easy Run',
            }
        };

        return splitMap[readinessPercentage] || {};
    };

    /**
     * Creates an instance of QuickPlanBuilder.
     * 
     * @param String -- how is the user feeling overall
     * @param Number -- kms ran past week
     * @param Number -- how many days they want to run this week
     */
    constructor(feeling: string, weeklyKms: number, numberOfDays: number) {
        this.#feeling = feeling;
        this.#weeklyKms = weeklyKms;
        this.#numberOfDays = numberOfDays;

        this.#readinessPercent = GenerateQuickPlan.getReadinessPercent(feeling);
    }

    /**
     * ========== Instance Methods ==========
     */

    /**
     * Calculate whether to increase, maintain or decrease weekly load
     *  based on readiness percentage.
     * 
     * @returns {number} - Adjusted weekly mileage based on readiness.
     */
    calculateWeeklyMileage() {
        let ratio = 1;

        if (this.#readinessPercent >= 85) {
            ratio = 1.1; // increase load by 10%
        } else if (this.#readinessPercent >= 70) {
            ratio = 1.0; // maintain load
        } else if (this.#readinessPercent >= 45) {
            ratio = 0.9; // decrease load by 10%
        } else {
            ratio = 0.8; // decrease load by 20%
        }

        return Math.round((this.#weeklyKms * ratio) * 100) / 100;
    }

    generatePlan() {
        // Pyramidal Training: Apply 80/20 principle to weekly VOLUME, not days
        // Zone 1 (easy intensity): 75-80% of total weekly volume
        // Zone 2 (moderate intensity): 15-20% of total weekly volume  
        // Zone 3 (high intensity): 5-10% of total weekly volume

        const newWeeklyMileage = this.calculateWeeklyMileage();
        
        // Calculate volume allocation per intensity zone
        const zone1Volume = newWeeklyMileage * 0.80; // 80% easy volume
        const zone2Volume = newWeeklyMileage * 0.15; // 15% moderate volume
        const zone3Volume = newWeeklyMileage * 0.05; // 5% high intensity volume
        
        let remainingZone1 = zone1Volume;
        let remainingZone2 = zone2Volume; 
        let remainingZone3 = zone3Volume;
        
        const plan: { day: number; mileage: number; runType: string; intensityBreakdown?: { easy: number; moderate: number; hard: number } }[] = [];

        for (let i = 0; i < this.#numberOfDays; i++) {
            const dailyRatio = GenerateQuickPlan.DAILY_MILEAGE_RATIOS(this.#numberOfDays)[i];
            const dailyMileage = newWeeklyMileage * dailyRatio;
            
            // Distribute intensity zones within this day's mileage
            let easyVolume = 0;
            let moderateVolume = 0; 
            let hardVolume = 0;
            let runType = 'Easy Run';
            
            // Apply readiness adjustments
            if (this.#readinessPercent < 50) {
                // Low readiness: all easy running
                easyVolume = dailyMileage;
                runType = i === 0 ? 'Recovery Run' : 'Easy Run';
            } else {
                // Allocate intensity based on available volume and daily portion
                
                // First, allocate easy volume (always gets priority)
                easyVolume = Math.min(remainingZone1, dailyMileage * 0.80);
                remainingZone1 -= easyVolume;
                
                // Then allocate moderate intensity if there's remaining distance and volume
                const remainingDailyDistance = dailyMileage - easyVolume;
                if (remainingDailyDistance > 0 && remainingZone2 > 0 && this.#readinessPercent >= 70) {
                    moderateVolume = Math.min(remainingZone2, remainingDailyDistance * 0.80);
                    remainingZone2 -= moderateVolume;
                }
                
                // Finally, allocate high intensity if there's still remaining distance
                const stillRemainingDistance = dailyMileage - easyVolume - moderateVolume;
                if (stillRemainingDistance > 0 && remainingZone3 > 0 && this.#readinessPercent >= 85) {
                    hardVolume = Math.min(remainingZone3, stillRemainingDistance);
                    remainingZone3 -= hardVolume;
                }
                
                // If there's still unallocated distance, make it easy
                const unallocatedDistance = dailyMileage - easyVolume - moderateVolume - hardVolume;
                if (unallocatedDistance > 0) {
                    easyVolume += unallocatedDistance;
                }
                
                // Determine run type based on composition
                if (hardVolume > 0) {
                    runType = 'Interval Run';
                } else if (moderateVolume > 0) {
                    runType = moderateVolume > easyVolume * 0.25 ? 'Tempo Run' : 'Progressive Run';
                } else {
                    runType = dailyMileage > newWeeklyMileage * 0.4 ? 'Long Easy Run' : 'Easy Run';
                }
            }

            plan.push({ 
                day: i + 1, 
                mileage: parseFloat(dailyMileage.toFixed(2)), 
                runType,
                intensityBreakdown: {
                    easy: parseFloat(easyVolume.toFixed(2)),
                    moderate: parseFloat(moderateVolume.toFixed(2)), 
                    hard: parseFloat(hardVolume.toFixed(2))
                }
            });
        }

        return plan;
    }

    /**
     * ========== STATIC METHODS ==========
     */


    /**
     * Get the number of allowed training days based on readiness percentage.
     * @param readinessPercent 
     * @returns 
     */
    static getNumberOfAllowedTrainingDays(readinessPercent: number): number {
        const numAllowedDays = {
            80: 5,
            70: 4,
            50: 3,
            0: 2
        } // mapping for max allowed training days

        // calculate readiness based on threshold
        const thresholds = () => {
            if (readinessPercent >= 80) return 80;
            if (readinessPercent >= 70) return 70;
            if (readinessPercent >= 50) return 50;
            return 0;
        }

        // return the number of allowed days based on readiness
        return numAllowedDays[thresholds()] || 0;
    }

    /**
     * Get readiness percentage based on feeling.
     *  Check the FEELING_MAP for valid feelings.
     * 
     * Valid feelings are:
     * 'great', 'strong', 'excellent', 'good', 'fine',
     *  'okay', 'moderate', 'normal', 'tired',
     *  'fatigued', 'exhausted'
     * 
     * @param feeling 
     * @returns Number -- readiness percentage (0-100)
     */
    static getReadinessPercent(feeling: string): number {
        return GenerateQuickPlan.FEELING_MAP(feeling) || 70;
    }
}

export default GenerateQuickPlan;