import type { Meta, StoryObj } from '@storybook/react';
import { PageHeaderBlock } from './PageHeaderBlock';

const meta: Meta<typeof PageHeaderBlock> = {
  title: 'Page Builder Blocks/PageHeaderBlock',
  component: PageHeaderBlock,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageHeaderBlock>;

export const WithBreadcrumbs: Story = {
  args: {
    data: {
      type: 'pageHeader',
      title: 'Practice Specialisms & Sector Matrix',
      overline: 'SECTOR COVERAGE',
      highlightedPhrase: 'Board, Managing Director & C-Suite Retained Search',
      subtitle: 'Exclusively dedicated to the UK and European Building Products, Heavy Materials, and Specialist Distribution sectors.',
      coordinate: 'MGH // SECTOR MATRIX',
      breadcrumbs: [
        { label: 'PRACTICE AREAS', href: '/sectors' },
        { label: 'HEAVY BUILDING PRODUCTS' },
      ],
    },
  },
};

export const MinimalBadge: Story = {
  args: {
    data: {
      type: 'pageHeader',
      badge: 'MARKET INTELLIGENCE',
      title: 'Executive Remuneration & Succession Planning',
      subtitle: 'Proprietary compensation and retention analyses across 400+ board appointments.',
      coordinate: 'MGH // RESEARCH DESK',
    },
  },
};
