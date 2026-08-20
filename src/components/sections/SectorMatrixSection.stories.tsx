import type { Meta, StoryObj } from '@storybook/react';
import { SectorMatrixSection } from './SectorMatrixSection';
import { fallbackSpecialisms, fallbackSubDisciplines } from '../../lib/contentful/fallbacks';

const meta: Meta<typeof SectorMatrixSection> = {
  title: 'Page Sections/SectorMatrixSection',
  component: SectorMatrixSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelectSector: { action: 'onSelectSector' },
  },
};

export default meta;
type Story = StoryObj<typeof SectorMatrixSection>;

export const Default: Story = {
  args: {
    data: {
      sectionLabel: 'Sector Specialism Matrix',
      title: 'Core Practice Matrix',
      description: 'Specialized search focused exclusively on executive roles across manufacturing, distribution, and contracting in the Building Products & Construction materials ecosystem.',
      subDisciplines: fallbackSubDisciplines,
      specialisms: fallbackSpecialisms,
    },
    specialisms: fallbackSpecialisms,
  },
};
