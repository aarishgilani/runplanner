import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { QuickPlanForm } from '../app/tool/quick-plan-form';
import '../app/app.css';

// Wrapper component to handle the setShowQuickForm prop for stories
const QuickPlanFormWrapper = ({ 
  initialShow = true,
  onFormToggle 
}: { 
  initialShow?: boolean;
  onFormToggle?: (show: boolean) => void;
}) => {
  const [showForm, setShowForm] = useState(initialShow);
  
  const handleToggle = (show: boolean) => {
    setShowForm(show);
    onFormToggle?.(show);
  };

  if (!showForm) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-gray-600">Form has been closed</p>
        <button 
          onClick={() => handleToggle(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Show Form Again
        </button>
      </div>
    );
  }

  return <QuickPlanForm setShowQuickForm={handleToggle} />;
};

const meta: Meta<typeof QuickPlanFormWrapper> = {
  title: 'Components/QuickPlanForm',
  component: QuickPlanFormWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form component for quickly generating personalized running plans based on current feeling, target weekly distance, and number of running days.',
      },
    },
  },
  argTypes: {
    initialShow: {
      control: 'boolean',
      description: 'Whether the form is initially visible',
    },
    onFormToggle: {
      action: 'form toggled',
      description: 'Callback when form visibility changes',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof QuickPlanFormWrapper>;

// Default interactive story
export const Default: Story = {
  args: {
    initialShow: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default QuickPlanForm with all interactive elements. Try filling out the form fields and clicking the buttons.',
      },
    },
  },
};

// Form initially hidden
export const InitiallyHidden: Story = {
  args: {
    initialShow: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form starts hidden, showing the state after user cancels. Click "Show Form Again" to reveal the form.',
      },
    },
  },
};

// Demo with pre-filled values (using a custom render)
export const PreFilledForm: Story = {
  render: () => {
    const [showForm, setShowForm] = useState(true);
    
    // Custom component with pre-filled state
    const PreFilledQuickPlanForm = () => {
      return (
        <div className="p-6 mb-6 border-2 border-green-300 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
          <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
            <span className="text-green-600">⚡</span>
            Quick Planner
          </h3>
          <p className="mb-4 text-sm text-gray-600">
            Enter your current feeling and target weekly distance to generate a personalized running plan.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                How did your runs feel this week? Provide an overall feeling.
              </label>
              <select
                value="Good"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                <option value="Good">Good - Ready to run</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Target Weekly Distance (KM)
              </label>
              <input 
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-gray-700"
                type="number"
                value="25"
                step={0.5}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Number of Running Days per Week
              </label>
              <input 
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-gray-700"
                type="number"
                value="4"
                step={1}
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-2 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700">
                <span>⚡</span>
                Generate Plan
              </button>
              <button className="px-6 py-2 text-gray-700 transition-colors bg-gray-300 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    };

    return showForm ? <PreFilledQuickPlanForm /> : (
      <div className="p-6 text-center">
        <p className="mb-4 text-gray-600">Form has been closed</p>
        <button 
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Show Form Again
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing the form with pre-filled values (Good feeling, 25km, 4 days). This demonstrates how the form looks when populated with data.',
      },
    },
  },
};

// Focus states demonstration
export const FocusStates: Story = {
  render: () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold mb-4">Form Field Focus States</h4>
      
      {/* Select focused */}
      <div className="p-6 mb-6 border-2 border-green-300 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
        <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
          <span className="text-green-600">⚡</span>
          Quick Planner - Select Focused
        </h3>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            How did your runs feel this week? Provide an overall feeling.
          </label>
          <select className="w-full px-4 py-2 border-2 border-green-500 rounded-lg focus:border-green-500 focus:outline-none">
            <option value="">Select your feeling...</option>
            <option value="Great">Great - Feeling strong and energized</option>
            <option value="Good">Good - Ready to run</option>
          </select>
        </div>
      </div>

      {/* Input focused */}
      <div className="p-6 mb-6 border-2 border-green-300 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
        <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
          <span className="text-green-600">⚡</span>
          Quick Planner - Input Focused
        </h3>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Target Weekly Distance (KM)
          </label>
          <input 
            className="w-full px-4 py-2 border-2 border-green-500 rounded-lg focus:border-green-500 focus:outline-none text-gray-700"
            type="number"
            placeholder="e.g., 15"
            step={0.5}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the visual focus states of form elements with green border highlighting.',
      },
    },
  },
};

// All feeling options showcase
export const FeelingOptions: Story = {
  render: () => (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold mb-4">All Feeling Options</h4>
      {['Great', 'Good', 'Okay', 'Tired', 'Fatigued'].map((feeling) => (
        <div key={feeling} className="p-4 border border-gray-200 rounded-lg">
          <div className="p-6 mb-6 border-2 border-green-300 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
            <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
              <span className="text-green-600">⚡</span>
              Quick Planner - {feeling}
            </h3>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Current Selection: {feeling}
              </label>
              <select value={feeling} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg">
                <option value="Great">Great - Feeling strong and energized</option>
                <option value="Good">Good - Ready to run</option>
                <option value="Okay">Okay - Moderate energy</option>
                <option value="Tired">Tired - Need easier workouts</option>
                <option value="Fatigued">Fatigued - Very low energy</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcases all available feeling options: Great, Good, Okay, Tired, and Fatigued.',
      },
    },
  },
};
