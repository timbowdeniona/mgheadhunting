import type { Meta, StoryObj } from '@storybook/react';
import { CtaBannerBlock } from './CtaBannerBlock';

const meta: Meta<typeof CtaBannerBlock> = {
  title: 'Page Builder Blocks/CtaBannerBlock',
  component: CtaBannerBlock,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onInitiateSearch: { action: 'onInitiateSearch' },
  },
};

export default meta;
type Story = StoryObj<typeof CtaBannerBlock>;

export const NavyTheme: Story = {
  args: {
    data: {
      type: 'ctaBanner',
      variant: 'navy',
      overline: 'COMMISSION RETAINED SEARCH',
      title: 'Commission a Board or Executive Search Mandate',
      description: 'Discuss your executive talent requirements in strict confidence directly with Managing Partner Mark Goldsmith.',
      primaryCtaText: 'Initiate Search Mandate',
      primaryCtaAction: 'searchModal',
      secondaryCtaText: 'View Practice Specialisms',
      secondaryCtaHref: '/sectors',
      guaranteeNotice: 'Strict Single-Point Confidentiality. NDA Guaranteed.',
    },
  },
};

export const BlueprintTeal: Story = {
  args: {
    data: {
      type: 'ctaBanner',
      variant: 'blueprint',
      overline: 'CONFIDENTIAL ADVISORY',
      title: 'Planning a Board or Executive Succession?',
      description: 'Gain immediate confidential access to our pre-vetted network of 2,400+ building products executive leaders.',
      primaryCtaText: 'Book Confidential Briefing',
      primaryCtaAction: 'searchModal',
      guaranteeNotice: 'AESC Code of Professional Ethics Compliant',
    },
  },
};
