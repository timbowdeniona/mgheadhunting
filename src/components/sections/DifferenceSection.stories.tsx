import type { Meta, StoryObj } from '@storybook/react';
import { DifferenceSection } from './DifferenceSection';
import { fallbackDifferencePillars } from '../../lib/contentful/fallbacks';

const meta: Meta<typeof DifferenceSection> = {
  title: 'Page Sections/DifferenceSection',
  component: DifferenceSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onInitiateSearch: { action: 'onInitiateSearch' },
  },
};

export default meta;
type Story = StoryObj<typeof DifferenceSection>;

export const Default: Story = {
  args: {
    pillars: fallbackDifferencePillars,
  },
};
