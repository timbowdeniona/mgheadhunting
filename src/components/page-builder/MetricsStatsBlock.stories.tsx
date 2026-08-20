import type { Meta, StoryObj } from '@storybook/react';
import { MetricsStatsBlock } from './MetricsStatsBlock';

const meta: Meta<typeof MetricsStatsBlock> = {
  title: 'Page Builder Blocks/MetricsStatsBlock',
  component: MetricsStatsBlock,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MetricsStatsBlock>;

export const ThreeColumns: Story = {
  args: {
    data: {
      type: 'metricsStats',
      sectionLabel: 'VERIFIED TRACK RECORD',
      title: 'Performance Benchmarks That Define Our Practice',
      subtitle: 'Every mandate is measured against strict performance guarantees and transparent milestone reporting.',
      stats: [
        {
          value: '98.4%',
          label: 'Mandate Completion Rate',
          description: 'Verified completion across 250+ retained Board and Executive searches since 2004.',
          tag: 'AUDITED',
        },
        {
          value: '4.8 Wks',
          label: 'Avg. Shortlist Presentation',
          description: 'Rigorous market mapping delivering 3–4 calibrated finalist profiles with psychometric scoring.',
          tag: 'TIMELINE',
        },
        {
          value: '100%',
          label: 'Partner-Led Delivery',
          description: 'Every client and candidate interaction conducted exclusively by Lead Partner Mark Goldsmith.',
          tag: 'GOVERNANCE',
        },
      ],
    },
  },
};

export const FourColumns: Story = {
  args: {
    data: {
      type: 'metricsStats',
      sectionLabel: 'PRACTICE SCALE',
      title: 'Building Products Domain Metrics',
      stats: [
        { value: '250+', label: 'Board Placements', description: 'Chair, NED & C-Suite', tag: 'DELIVERY' },
        { value: '20+ Yrs', label: 'Sector Focus', description: 'Building Materials & HVAC', tag: 'TENURE' },
        { value: '12 Mo', label: 'Warranty', description: 'Full Replacement Guarantee', tag: 'SECURITY' },
        { value: '94%', label: 'Repeat Clients', description: 'Private Equity & PLCs', tag: 'TRUST' },
      ],
    },
  },
};
