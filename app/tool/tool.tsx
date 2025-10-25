import { Calendar, TrendingUp, Activity, Heart, Clock, Plus, Zap, CalendarPlus } from 'lucide-react';
import {useState} from "react";
import { QuickPlanForm } from './quick-plan-form';

export function Tool() {

    const [showQuickForm, setShowQuickForm] = useState(true);

    return (
        <main>
            <section className="runplanner-tool-section bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-6">
                <div className="max-w-screen-xl p-6 mx-auto bg-white shadow-lg rounded-lg mt-10">
                    <div className="flex items-center justify-between mb-6" >
                        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
                            <Activity className="text-blue-600" size={36} />
                            Run Planner
                        </h1>
                        <button
                            onClick={() => setShowQuickForm(!showQuickForm)}
                            className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                        >
                            <Zap size={20} />
                            Quick Plan
                        </button>
                    </div>

                    {showQuickForm && (
                        <QuickPlanForm setShowQuickForm={setShowQuickForm} />
                    )}
                </div>
            </section>
        </main>

    )
}