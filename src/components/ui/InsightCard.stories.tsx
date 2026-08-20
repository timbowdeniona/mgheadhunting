import type { Meta, StoryObj } from '@storybook/react';
import { InsightCard } from './InsightCard';

const meta: Meta<typeof InsightCard> = {
  title: 'Core UI/InsightCard',
  component: InsightCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-md w-full">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InsightCard>;

export const WithCoverImage: Story = {
  args: {
    category: 'EXECUTIVE COMPENSATION',
    readTime: '6 min read',
    date: 'February 2026',
    title: '2026/2027 Building Products Executive Salary & Retention Benchmark',
    excerpt: 'Comprehensive compensation analysis covering 400+ board appointments across UK & European manufacturing, merchants, and fabricators.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    author: {
      name: 'Mark Goldsmith',
      title: 'Managing Partner',
    },
    keyTakeaways: [
      'Base salaries for heavyside Managing Directors rose 8.2% across 2025.',
      'Long-term incentive plans (LTIPs) now tied to sustainability & Building Safety Act compliance.',
    ],
  },
};

export const TextOnly: Story = {
  args: {
    category: 'REGULATORY & COMPLIANCE',
    readTime: '4 min read',
    date: 'January 2026',
    title: 'Building Safety Act 2022: Technical Director Succession Risks',
    excerpt: 'How new statutory gateway liabilities have triggered an executive shortage for qualified Technical & Compliance Directors in high-risk construction.',
    author: {
      name: 'MGH Research Desk',
      title: 'Governance Briefing',
    },
  },
};
