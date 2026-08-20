import type { Meta, StoryObj } from '@storybook/react';
import { Wordmark } from './Wordmark';

const meta: Meta<typeof Wordmark> = {
  title: 'Brand Identity/Wordmark',
  component: Wordmark,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showSubtitle: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Wordmark>;

export const DefaultDark: Story = {
  args: {
    variant: 'dark',
    size: 'md',
    showSubtitle: true,
  },
};

export const Large: Story = {
  args: {
    variant: 'dark',
    size: 'lg',
    showSubtitle: true,
  },
};

export const LightOnDark: Story = {
  args: {
    variant: 'light',
    size: 'md',
    showSubtitle: true,
  },
  parameters: {
    backgrounds: { default: 'navy-dark' },
  },
};
