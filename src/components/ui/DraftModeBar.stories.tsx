import type { Meta, StoryObj } from '@storybook/react';
import { DraftModeBar } from './DraftModeBar';

const meta: Meta<typeof DraftModeBar> = {
  title: 'Core UI/DraftModeBar',
  component: DraftModeBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DraftModeBar>;

export const ActiveDraftMode: Story = {
  args: {
    isEnabled: true,
  },
  decorators: [
    (Story) => (
      <div className="h-64 relative bg-canvas-light flex items-center justify-center p-8">
        <p className="text-steel-500 font-mono text-sm">Background Page Content Under Preview</p>
        <Story />
      </div>
    ),
  ],
};
