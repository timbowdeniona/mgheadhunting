import type { Meta, StoryObj } from '@storybook/react';
import { InsightsSection } from './InsightsSection';
import { fallbackInsightArticles } from '../../lib/contentful/fallbacks';

const meta: Meta<typeof InsightsSection> = {
  title: 'Page Sections/InsightsSection',
  component: InsightsSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onReadArticle: { action: 'onReadArticle' },
    onRequestReport: { action: 'onRequestReport' },
  },
};

export default meta;
type Story = StoryObj<typeof InsightsSection>;

export const Default: Story = {
  args: {
    articles: fallbackInsightArticles,
  },
};
