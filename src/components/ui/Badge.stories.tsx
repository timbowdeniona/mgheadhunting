import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Core UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['teal', 'navy', 'steel', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    dot: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const TealWithDot: Story = {
  args: {
    children: 'EXECUTIVE SEARCH PRACTICE',
    variant: 'teal',
    size: 'md',
    dot: true,
  },
};

export const NavyExecutive: Story = {
  args: {
    children: 'AESC MEMBER',
    variant: 'navy',
    size: 'md',
    dot: true,
  },
};

export const SteelSecondary: Story = {
  args: {
    children: 'BOARD & C-SUITE',
    variant: 'steel',
    size: 'sm',
    dot: false,
  },
};

export const MinimalOutline: Story = {
  args: {
    children: '12-MONTH WARRANTY',
    variant: 'outline',
    size: 'sm',
  },
};
