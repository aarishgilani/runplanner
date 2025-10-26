import { Heart } from "lucide-react";


export function ResultOverview({ readinessPercentage, weeklyMileage }: {
    readinessPercentage: number;
    weeklyMileage: number;
}) {
    return (
        <div className={`${getColorScheme(readinessPercentage).bgColor} ${getColorScheme(readinessPercentage).borderColor} text-black border-2 rounded-lg p-6 mb-6 max-w-screen-xl w-full`}>
            <div className="flex items-center justify-between mr-8">
                <div className="space-y-1.5 h-full">
                    <div className="inline-flex items-center gap-2">
                        <span className="text-xl font-bold">{getReadinessEmoji(readinessPercentage)}</span>
                        <h2 className="text-lg font-semibold text-gray-700">Next Week's Readiness</h2>

                    </div>
                    {/* readiness percentage */}
                    <div className="flex items-start justify-between gap-5 ml-8">
                        <div>
                            <p className={`text-4xl font-bold text-black ${getColorScheme(readinessPercentage).color}`}>
                                {formatReadiness(readinessPercentage)}
                            </p>
                            <p className={`text-sm font-medium ${getColorScheme(readinessPercentage).color}`}>
                                {getFormattedReadinessLevel(readinessPercentage)} Readiness
                            </p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-gray-800">{weeklyMileage} <span className="text-lg text-gray-500">KMs</span></p>
                            <p className="text-sm text-gray-500 mr-auto">Weekly Total</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// readiness emoji
const getReadinessEmoji = (readinessPercentage: number) => {
    if (readinessPercentage >= 85) return '🟢';
    if (readinessPercentage >= 70) return '🟡';
    return '🔴';
}

// format readiness display
const formatReadiness = (readinessPercentage: number): string => {
    if (!readinessPercentage) return 'N/A';
    return `${readinessPercentage}%`;
};

// decide which colors to use based on readiness
const getColorScheme = (readinessPercentage: number): {
    bgColor: string;
    borderColor: string;
    color: string;
} => {
    if (readinessPercentage >= 85) return { bgColor: 'bg-green-50', borderColor: 'border-green-200', color: 'text-green-600' };
    if (readinessPercentage >= 70) return { bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', color: 'text-yellow-600' };
    return { bgColor: 'bg-red-50', borderColor: 'border-red-200', color: 'text-red-600' };
}

// get formatted readiness level
const getFormattedReadinessLevel = (readinessPercentage: number): string => {
    if (readinessPercentage >= 85) return 'High';
    if (readinessPercentage >= 70) return 'Moderate';
    if (readinessPercentage >= 55) return 'Low';
    return 'Critical';
}