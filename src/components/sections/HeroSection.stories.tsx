import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'Page Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onInitiateSearch: { action: 'onInitiateSearch' },
    onExploreSpecialisms: { action: 'onExploreSpecialisms' },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    data: {
      badgeOverline: 'EXCLUSIVE RETAINED SEARCH',
      badgeCategory: 'BUILDING PRODUCTS & CONSTRUCTION',
      headline: 'Board, Managing Director & C-Suite Appointments for the',
      highlightedPhrase: 'Building Products Ecosystem.',
      subtitle: 'Retained executive search engineered exclusively for heavy building materials manufacturers, merchants, fabricators, and private equity portfolio companies across the UK and Europe.',
      keyValues: [
        'Direct Partner Delivery',
        '3-Tier Scientific Assessment',
        '12-Month Placement Guarantee',
        'Strict Non-Disclosure',
      ],
      ctaPrimaryText: 'Initiate Search Mandate',
      ctaSecondaryText: 'Explore Sector Specialisms',
      complianceNotice: 'Registered with the Information Commissioner’s Office (ICO). Strictly confidential under AESC Professional Practice.',
      partnerName: 'Mark Goldsmith',
      partnerTitle: 'Managing Partner',
      partnerBio: '20+ years dedicated executive search across UK & European building materials and manufacturing.',
      metricPlacements: '250+',
      metricTenure: '20+',
      metricRetention: '98.4%',
      metricCoverage: 'UK & EU',
    },
  },
};
