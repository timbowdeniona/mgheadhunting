import type { Meta, StoryObj } from '@storybook/react';
import { ExecutiveSummaryBlock } from './ExecutiveSummaryBlock';

const meta: Meta<typeof ExecutiveSummaryBlock> = {
  title: 'Page Builder / Blocks / ExecutiveSummaryBlock',
  component: ExecutiveSummaryBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ExecutiveSummaryBlock>;

export const Default: Story = {
  args: {
    data: {
      overline: 'EXECUTIVE BRIEFING // DIRECT ANSWER',
      title: 'How Retained Search Delivers Executive Leaders in Building Products',
      directAnswer:
        'Retained executive search in the UK building products sector relies on partner-led market mapping and direct confidential outreach to non-active C-suite executives. Unlike contingency recruitment, retained mandates commit 100% until completion with a rigorous 12-month retention guarantee.',
      citationSource: 'MG Headhunting Market Intelligence 2026',
      keyPoints: [
        '96% 3-year executive placement retention rate across UK & Europe.',
        '100% partner-led execution by Mark Goldsmith without delegation.',
        'Comprehensive 12-month replacement guarantee on board appointments.',
        'Specialist coverage across HVAC, Fenestration, Merchants, and Offsite Construction.',
      ],
    },
  },
};
