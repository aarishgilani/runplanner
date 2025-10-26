import type { Meta, StoryObj } from '@storybook/react';
import { ResultCard } from '../app/tool/result-card';
import '../app/app.css';

// Define the component props type
type ResultCardProps = {
  day: string;
  runType: string;
  distance: number;
  zoneSplits: string;
  note: string;
};

const meta: Meta<ResultCardProps> = {
  title: 'Components/ResultCard',
  component: ResultCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component that displays a single day\'s running plan with day, run type, distance, zone splits, and notes. Includes an "Add to Calendar" button for scheduling.',
      },
    },
  },
  argTypes: {
    day: {
      control: 'text',
      description: 'The day of the week or date for the run',
    },
    runType: {
      control: 'select',
      options: [
        'Easy Run',
        'Long Run',
        'Tempo Run',
        'Interval Training',
        'Recovery Run',
        'Fartlek',
        'Hill Training',
        'Rest Day',
        'Cross Training',
      ],
      description: 'The type of running workout',
    },
    distance: {
      control: { type: 'number', min: 0, max: 50, step: 0.5 },
      description: 'Distance in kilometers',
    },
    zoneSplits: {
      control: 'text',
      description: 'Zone distribution or pace information',
    },
    note: {
      control: 'text',
      description: 'Additional notes or instructions for the workout',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ResultCardProps>;

// Default story with typical values
export const Default: Story = {
  args: {
    day: 'Monday',
    runType: 'Easy Run',
    distance: 8,
    zoneSplits: '80% Zone 1, 20% Zone 2',
    note: 'Keep it comfortable and focus on form',
  },
};

// Easy run scenario
export const EasyRun: Story = {
  args: {
    day: 'Tuesday',
    runType: 'Easy Run',
    distance: 6,
    zoneSplits: '90% Zone 1, 10% Zone 2',
    note: 'Recovery pace, listen to your body',
  },
  parameters: {
    docs: {
      description: {
        story: 'A typical easy run for active recovery with low intensity zones.',
      },
    },
  },
};

// Long run scenario
export const LongRun: Story = {
  args: {
    day: 'Sunday',
    runType: 'Long Run',
    distance: 18,
    zoneSplits: '70% Zone 1, 25% Zone 2, 5% Zone 3',
    note: 'Build endurance, practice race nutrition',
  },
  parameters: {
    docs: {
      description: {
        story: 'A long run for building aerobic base and endurance.',
      },
    },
  },
};

// Tempo run scenario
export const TempoRun: Story = {
  args: {
    day: 'Wednesday',
    runType: 'Tempo Run',
    distance: 10,
    zoneSplits: '30% Zone 1, 40% Zone 2, 30% Zone 3',
    note: 'Comfortably hard effort, sustainable pace',
  },
  parameters: {
    docs: {
      description: {
        story: 'A tempo run for lactate threshold training.',
      },
    },
  },
};

// Interval training scenario
export const IntervalTraining: Story = {
  args: {
    day: 'Thursday',
    runType: 'Interval Training',
    distance: 12,
    zoneSplits: '40% Zone 1, 30% Zone 2, 20% Zone 4, 10% Zone 5',
    note: '6x800m at 5K pace with 400m recovery jogs',
  },
  parameters: {
    docs: {
      description: {
        story: 'High-intensity interval training with speed work.',
      },
    },
  },
};

// Recovery run scenario
export const RecoveryRun: Story = {
  args: {
    day: 'Friday',
    runType: 'Recovery Run',
    distance: 4,
    zoneSplits: '100% Zone 1',
    note: 'Very easy pace, focus on staying loose',
  },
  parameters: {
    docs: {
      description: {
        story: 'A short, very easy recovery run to promote blood flow.',
      },
    },
  },
};

// Rest day scenario
export const RestDay: Story = {
  args: {
    day: 'Saturday',
    runType: 'Rest Day',
    distance: 0,
    zoneSplits: 'Complete rest',
    note: 'Focus on sleep, nutrition, and hydration',
  },
  parameters: {
    docs: {
      description: {
        story: 'A rest day with no running for recovery.',
      },
    },
  },
};

// Cross training scenario
export const CrossTraining: Story = {
  args: {
    day: 'Saturday',
    runType: 'Cross Training',
    distance: 0,
    zoneSplits: '60 minutes moderate intensity',
    note: 'Swimming, cycling, or strength training',
  },
  parameters: {
    docs: {
      description: {
        story: 'Cross training day with alternative exercises.',
      },
    },
  },
};

// High volume training day
export const HighVolume: Story = {
  args: {
    day: 'Sunday',
    runType: 'Long Run',
    distance: 25,
    zoneSplits: '60% Zone 1, 30% Zone 2, 8% Zone 3, 2% Zone 4',
    note: 'Marathon pace segments in final 8km',
  },
  parameters: {
    docs: {
      description: {
        story: 'A high-volume long run with race pace elements.',
      },
    },
  },
};

// Short workout
export const ShortWorkout: Story = {
  args: {
    day: 'Tuesday',
    runType: 'Fartlek',
    distance: 5,
    zoneSplits: '50% Zone 1, 30% Zone 3, 20% Zone 4',
    note: 'Play with pace, listen to how you feel',
  },
  parameters: {
    docs: {
      description: {
        story: 'A short, playful fartlek run with varied paces.',
      },
    },
  },
};

// Hill training
export const HillTraining: Story = {
  args: {
    day: 'Thursday',
    runType: 'Hill Training',
    distance: 9,
    zoneSplits: '40% Zone 1, 30% Zone 3, 30% Zone 4',
    note: '8x90sec hill repeats with full recovery',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hill training for building strength and power.',
      },
    },
  },
};