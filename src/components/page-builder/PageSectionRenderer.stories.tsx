import type { Meta, StoryObj } from '@storybook/react';
import { PageSectionRenderer } from './PageSectionRenderer';

const meta: Meta<typeof PageSectionRenderer> = {
  title: 'Page Builder Blocks/PageSectionRenderer',
  component: PageSectionRenderer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onInitiateSearch: { action: 'onInitiateSearch' },
    onReadArticle: { action: 'onReadArticle' },
  },
};

export default meta;
type Story = StoryObj<typeof PageSectionRenderer>;

export const HeaderBlockRender: Story = {
  args: {
    section: {
      type: 'pageHeader',
      title: 'Practice Governance & Advisory',
      overline: 'GOVERNANCE & ETHICS',
      subtitle: 'AESC-certified executive search methodology ensuring strict confidentiality and talent exclusivity.',
    },
  },
};

export const MetricsBlockRender: Story = {
  args: {
    section: {
      type: 'metricsStats',
      title: 'Practice Benchmarks',
      stats: [
        { value: '250+', label: 'Executive Appointments', tag: 'DELIVERY' },
        { value: '20+ Yrs', label: 'Sector Dedication', tag: 'TENURE' },
        { value: '98.4%', label: 'Retention Rate', tag: 'RELIABILITY' },
      ],
    },
  },
};
