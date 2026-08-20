import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

const customViewports = {
  mobile: {
    name: 'Mobile (375px)',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  tablet: {
    name: 'Tablet (768px)',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  desktop: {
    name: 'Desktop (1280px)',
    styles: {
      width: '1280px',
      height: '800px',
    },
  },
  wide: {
    name: 'Ultrawide (1536px)',
    styles: {
      width: '1536px',
      height: '960px',
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: customViewports,
    },
    backgrounds: {
      default: 'canvas-light',
      values: [
        {
          name: 'canvas-light',
          value: '#F8F9FA',
        },
        {
          name: 'navy-dark',
          value: '#080E1A',
        },
        {
          name: 'pure-white',
          value: '#FFFFFF',
        },
      ],
    },
    layout: 'fullscreen',
  },
};

export default preview;
