import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ArrowRight, Briefcase, Mail } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Core UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Initiate Retained Mandate',
    variant: 'primary',
    size: 'md',
    icon: <ArrowRight className="w-4 h-4" />,
  },
};

export const Secondary: Story = {
  args: {
    children: 'View Sector Specialisms',
    variant: 'secondary',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    children: 'Contact Author',
    variant: 'outline',
    size: 'md',
    icon: <Mail className="w-4 h-4" />,
    iconPosition: 'left',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Explore Insights',
    variant: 'ghost',
    size: 'md',
    icon: <ArrowRight className="w-4 h-4" />,
  },
};
