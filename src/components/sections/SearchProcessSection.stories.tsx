import type { Meta, StoryObj } from '@storybook/react';
import { SearchProcessSection } from './SearchProcessSection';
import { fallbackProcessSteps } from '../../lib/contentful/fallbacks';

const meta: Meta<typeof SearchProcessSection> = {
  title: 'Page Sections/SearchProcessSection',
  component: SearchProcessSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchProcessSection>;

export const Default: Story = {
  args: {
    steps: fallbackProcessSteps,
  },
};
