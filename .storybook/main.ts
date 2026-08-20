import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      'next/image': path.resolve(__dirname, 'shims/next-image.tsx'),
      'next/link': path.resolve(__dirname, 'shims/next-link.tsx'),
      'next/navigation': path.resolve(__dirname, 'shims/next-navigation.ts'),
    };
    return config;
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
