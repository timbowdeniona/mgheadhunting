import type { Meta, StoryObj } from '@storybook/react';
import { AboutPartnerSection } from './AboutPartnerSection';
import { fallbackAboutPartnerData } from '../../lib/contentful/fallbacks';

const meta: Meta<typeof AboutPartnerSection> = {
  title: 'Page Sections/AboutPartnerSection',
  component: AboutPartnerSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onInitiateSearch: { action: 'onInitiateSearch' },
  },
};

export default meta;
type Story = StoryObj<typeof AboutPartnerSection>;

export const Default: Story = {
  args: {
    data: fallbackAboutPartnerData,
  },
};
