import type { Meta, StoryObj } from '@storybook/react';
import { HeaderNav } from './HeaderNav';

const meta: Meta<typeof HeaderNav> = {
  title: 'Page Sections/HeaderNav',
  component: HeaderNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onInitiateSearch: { action: 'onInitiateSearch' },
  },
};

export default meta;
type Story = StoryObj<typeof HeaderNav>;

export const Default: Story = {
  args: {
    directEmail: 'mark.goldsmith@mgheadhunting.com',
    siteName: 'MG Headhunting',
    tagline: 'Building Products',
    navLinks: [
      { label: 'Specialisms', href: '/#specialisms' },
      { label: 'The Difference', href: '/#difference' },
      { label: 'Search Process', href: '/#process' },
      { label: 'Market Intelligence', href: '/insights' },
      { label: 'About', href: '/about' },
    ],
  },
  decorators: [
    (Story) => (
      <div className="h-64 pt-24 bg-canvas-light p-8">
        <p className="text-steel-500 font-mono text-sm text-center">
          Main content area below sticky navigation
        </p>
        <Story />
      </div>
    ),
  ],
};
