import { Zap } from "lucide-react";
import { useState } from "react";

export function QuickPlanForm({ setShowQuickForm }: { setShowQuickForm: (show: boolean) => void }) {

    const [quickFormData, setQuickFormData] = useState({
        feeling: '', // e.g., "Great", "Good", "Okay", "Tired", "Fatigued" type string
        weeklyKms: '', // e.g., '10', '15', '20' type int
        numberOfDays: '',  // e.g., '3', '4', '5' type int
        goalType: '', // e.g., "Maintain", "Improve", "Recover" type string
    });

    function handleQuickFormSubmit() {
        // TODO: Implement form submission logic
    }

    return (
        <div className="p-6 mb-6 border-2 border-green-300 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
            <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
                <Zap className="text-green-600" size={24} />
                Quick Planner
            </h3>
            {/* // TODO: Extract default paragraph styles */}
            <p className="mb-4 text-sm text-gray-600">
                Enter your current feeling and target weekly distance to generate a personalized running plan.
            </p>

            <div className="space-y-4">
                <div>
                    {label("How did your runs feel this week? Provide an overall feeling.")}
                    <select
                        value={quickFormData.feeling}
                        onChange={(e) => setQuickFormData({ ...quickFormData, feeling: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                    >
                        <option value="">Select your feeling...</option>
                        <option value="Great">Great - Feeling strong and energized</option>
                        <option value="Good">Good - Ready to run</option>
                        <option value="Okay">Okay - Moderate energy</option>
                        <option value="Tired">Tired - Need easier workouts</option>
                        <option value="Fatigued">Fatigued - Very low energy</option>
                    </select>
                </div>
                <div>
                    {label("Target Weekly Distance (KM)")}
                    {input (
                        "e.g., 15",
                        quickFormData.weeklyKms,
                        (e) => setQuickFormData({ ...quickFormData, weeklyKms: e.target.value }),
                        "number",
                        0.5
                    )}
                </div>
                <div>
                    {label("Number of Running Days per Week")}
                    {input(
                        "e.g., 3",
                        quickFormData.numberOfDays,
                        (e) => setQuickFormData({ ...quickFormData, numberOfDays: e.target.value }),
                        "number",
                        1
                    )}

                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleQuickFormSubmit}
                        className="flex items-center gap-2 px-6 py-2 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                    >
                        <Zap size={20} />
                        Generate Plan
                    </button>
                    <button
                        onClick={() => {
                            setShowQuickForm(false);
                            setQuickFormData({ ...quickFormData, feeling: '', weeklyKms: '' });
                        }}
                        className="px-6 py-2 text-gray-700 transition-colors bg-gray-300 rounded-lg hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )

}

// form labels
const label = (text: string) => {
    return (
        <label className="block mb-2 text-sm font-semibold text-gray-700">
            {text}
        </label>
    )
}

// input field
const input = (placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type: string, step: number | undefined) => {
    return (
        <input className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-gray-700"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...(type === 'number' ? { step: step } : {})}
        />
    )
}