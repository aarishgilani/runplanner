import type { Meta, StoryObj } from '@storybook/react';
import { ResultOverview } from '../app/tool/result-overview';
import '../app/app.css';

// Define the component props type
type ResultOverviewProps = {
  readinessPercentage: number;
  weeklyMileage: number;
};

const meta: Meta<ResultOverviewProps> = {
  title: 'Components/ResultOverview',
  component: ResultOverview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component that displays readiness percentage and weekly mileage with visual feedback including emojis and color coding.',
      },
    },
  },
  argTypes: {
    readinessPercentage: {
      control: { 
        type: 'range', 
        min: 0, 
        max: 100, 
        step: 5 
      },
      description: 'The readiness percentage (0-100)',
    },
    weeklyMileage: {
      control: { 
        type: 'number', 
        min: 0, 
        max: 150 
      },
      description: 'The weekly mileage in miles',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ResultOverviewProps>;

// Default story with interactive controls
export const Default: Story = {
  args: {
    readinessPercentage: 90,
    weeklyMileage: 50,
  },
};

// High readiness scenario
export const HighReadiness: Story = {
  args: {
    readinessPercentage: 95,
    weeklyMileage: 55,
  },
  parameters: {
    docs: {
      description: {
        story: 'Excellent readiness level - ready for high training load.',
      },
    },
  },
};

// Moderate readiness scenario
export const ModerateReadiness: Story = {
  args: {
    readinessPercentage: 75,
    weeklyMileage: 35,
  },
  parameters: {
    docs: {
      description: {
        story: 'Good readiness level - suitable for moderate training.',
      },
    },
  },
};

// Low readiness scenario
export const LowReadiness: Story = {
  args: {
    readinessPercentage: 40,
    weeklyMileage: 20,
  },
  parameters: {
    docs: {
      description: {
        story: 'Lower readiness level - should consider easier training.',
      },
    },
  },
};

// Critical readiness scenario
export const CriticalReadiness: Story = {
  args: {
    readinessPercentage: 20,
    weeklyMileage: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Very low readiness - rest or very light training recommended.',
      },
    },
  },
};

// Edge cases
export const PerfectReadiness: Story = {
  args: {
    readinessPercentage: 100,
    weeklyMileage: 60,
  },
};

export const ZeroReadiness: Story = {
  args: {
    readinessPercentage: 0,
    weeklyMileage: 0,
  },
};