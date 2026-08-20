import type { Meta, StoryObj } from '@storybook/react';
import { Monogram } from './Monogram';

const meta: Meta<typeof Monogram> = {
  title: 'Brand Identity/Monogram',
  component: Monogram,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light', 'outline', 'solid-teal'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Monogram>;

export const DefaultDark: Story = {
  args: {
    variant: 'dark',
    size: 'lg',
  },
};

export const SolidTeal: Story = {
  args: {
    variant: 'solid-teal',
    size: 'lg',
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
    size: 'lg',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'xl',
  },
};
