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
            3: [0.3, 0.3, 0.2],
            4: [0.25, 0.21, 0.21, 0.333], 
            5: [0.18, 0.18, 0.2, 0.22, 0.22]
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
        // Zone 1 (low intensity): ≥ 60–75% of total volume
        // Zone 2 (moderate/threshold intensity): 15–25%
        // Zone 3 (high intensity): 5–10%
        const intensityZones = [
            { zone: 1, minPercent: 0.60, maxPercent: 0.75 },
            { zone: 2, minPercent: 0.15, maxPercent: 0.25 },
            { zone: 3, minPercent: 0.05, maxPercent: 0.10 },
        ]

        const newWeeklyMileage = this.calculateWeeklyMileage();
        let currentLoad = 0; // cumulative mileage 
        const runSplits = GenerateQuickPlan.RUN_TYPE_SPLITS(this.#readinessPercent); // run split based on readiness
        const plan: { day: number; mileage: number; runType: string }[] = []; // final plan array

        for (let i = 0; i < this.#numberOfDays; i++) {
            const dailyRatio = GenerateQuickPlan.DAILY_MILEAGE_RATIOS(this.#numberOfDays)[i];
            
            // Find the appropriate run type based on daily ratio
            let runType = 'Easy Run'; // default
            const ratioThresholds = Object.keys(runSplits).map(key => parseFloat(key)).sort((a, b) => a - b);
            
            for (const threshold of ratioThresholds) {
                if (dailyRatio <= threshold) {
                    runType = runSplits[threshold];
                    break;
                }
            }

            const dailyMileage = newWeeklyMileage * dailyRatio;
            
            currentLoad += dailyMileage;

            plan.push({ day: i + 1, mileage: parseFloat(dailyMileage.toFixed(2)), runType });
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