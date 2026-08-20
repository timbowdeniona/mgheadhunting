import type { Meta, StoryObj } from '@storybook/react';
import { ContactDeskBlock } from './ContactDeskBlock';

const meta: Meta<typeof ContactDeskBlock> = {
  title: 'Page Builder Blocks/ContactDeskBlock',
  component: ContactDeskBlock,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onInitiateSearch: { action: 'onInitiateSearch' },
  },
};

export default meta;
type Story = StoryObj<typeof ContactDeskBlock>;

export const Default: Story = {
  args: {
    data: {
      type: 'contactDesk',
      sectionLabel: 'DIRECT PARTNER DESK',
      title: 'Engage Mark Goldsmith Directly',
      description: 'For confidential Board, C-Suite, or Managing Director retained search inquiries across the UK and European Building Products market.',
      email: 'mark.goldsmith@mgheadhunting.com',
      phone: '+44 (0) 20 7946 0192',
      headquarters: 'London & Midlands, United Kingdom',
      ndaNotice: 'All initial inquiries and strategic mandates are handled under strict partner-level non-disclosure with ICO-registered compliance.',
    },
  },
};
