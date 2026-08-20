import type { Meta, StoryObj } from '@storybook/react';
import { CookieConsent } from './CookieConsent';

const meta: Meta<typeof CookieConsent> = {
  title: 'Core UI/CookieConsent',
  component: CookieConsent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CookieConsent>;

export const Default: Story = {
  decorators: [
    (Story) => {
      // Clear localStorage so banner appears
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mgh_cookie_consent');
      }
      return (
        <div className="h-96 relative bg-canvas-light p-8">
          <p className="text-steel-500 font-mono text-sm">Main Website Canvas Background</p>
          <Story />
        </div>
      );
    },
  ],
};
