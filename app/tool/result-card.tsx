import { Calendar, CalendarPlus, TrendingUp } from "lucide-react";


//TODO: Build add to calendar logic
export function ResultCard({ day, runType, distance, zoneSplits, note }: {
    day: string;
    runType: string;
    distance: number;
    zoneSplits: string;
    note: string;
}) {
    return (
        <div className="p-5 transition-shadow bg-white border-2 border-gray-200 rounded-lg hover:shadow-md">
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
                <Calendar className="text-blue-600" size={24} />
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{day}</h3>
                    <p className="text-sm text-gray-500">{runType}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{distance} km</p>
                <p className="text-xs text-gray-500">Distance</p>
            </div>
        </div>
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
                <TrendingUp size={16} className="text-gray-500" />
                <span className="text-gray-700">{zoneSplits}</span>
            </div>
            <p className="text-sm italic text-gray-600">{note}</p>
        </div>
        <button
            // onClick={() => addToGoogleCalendar('monday', recommendations.monday)}
            className="flex items-center gap-2 px-4 py-2 mt-3 text-sm font-medium text-blue-700 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200"
        >
            <CalendarPlus size={16} />
            Add to Calendar
        </button>
        </div>
    );
}