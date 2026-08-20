import type { Meta, StoryObj } from '@storybook/react';
import { EditorialRichTextBlock } from './EditorialRichTextBlock';

const meta: Meta<typeof EditorialRichTextBlock> = {
  title: 'Page Builder Blocks/EditorialRichTextBlock',
  component: EditorialRichTextBlock,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EditorialRichTextBlock>;

export const SidebarLayout: Story = {
  args: {
    data: {
      type: 'editorialRichText',
      sectionLabel: 'OPERATING ETHOS',
      title: 'Why Deep Domain Expertise Outperforms Generalist Agencies',
      subtitle: 'The building materials sector is defined by complex distribution channels, regulatory compliance, and tight margins.',
      layout: 'sidebar',
      leadParagraph: 'In an industry undergoing rapid decarbonisation, regulatory scrutiny under the Building Safety Act, and channel consolidation, generic recruitment algorithms fail.',
      quoteCallout: {
        quote: 'We do not operate as CV brokers. We act as confidential strategic advisors to boards making decisive leadership appointments.',
        attribution: 'Mark Goldsmith',
        role: 'Managing Partner',
      },
      keyTakeaways: [
        'Proprietary network across 2,400+ verified C-suite & Director-level executives',
        'Strict off-limits protection ensuring uncompromised talent access',
        'Direct partner accountability with zero junior consultant delegation',
        'Comprehensive 12-month post-placement warranty on all mandates',
      ],
    },
  },
};

export const SingleColumnLayout: Story = {
  args: {
    data: {
      type: 'editorialRichText',
      sectionLabel: 'METHODOLOGY',
      title: 'The Discipline of Off-Limits & Talent Access',
      layout: 'single',
      leadParagraph: 'Global agency conglomerates are constrained by massive client off-limits lists, preventing them from approaching top performers at competitor organizations.',
      quoteCallout: {
        quote: 'Boutique retained search is the only model that aligns 100% with client exclusivity and unfettered candidate access.',
        attribution: 'Mark Goldsmith',
        role: 'Managing Partner',
      },
      keyTakeaways: [
        'Full access to 95%+ of target organizations in the sector',
        'Zero passive reliance on job boards or inbound applications',
      ],
    },
  },
};
