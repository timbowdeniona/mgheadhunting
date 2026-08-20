import type { Meta, StoryObj } from '@storybook/react';
import { ContactFooterSection } from './ContactFooterSection';
import { fallbackContactFooterData } from '../../lib/contentful/fallbacks';

const meta: Meta<typeof ContactFooterSection> = {
  title: 'Page Sections/ContactFooterSection',
  component: ContactFooterSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onInitiateSearch: { action: 'onInitiateSearch' },
  },
};

export default meta;
type Story = StoryObj<typeof ContactFooterSection>;

export const Default: Story = {
  args: {
    data: fallbackContactFooterData,
  },
};
