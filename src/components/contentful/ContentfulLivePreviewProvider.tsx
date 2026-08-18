'use client';

import React from 'react';
import { ContentfulLivePreviewProvider as BaseProvider } from '@contentful/live-preview/react';

export interface LivePreviewProviderProps {
  children: React.ReactNode;
  locale?: string;
  enableInspectorMode?: boolean;
  enableLiveUpdates?: boolean;
}

export const ContentfulLivePreviewProvider: React.FC<LivePreviewProviderProps> = ({
  children,
  locale = 'en-US',
  enableInspectorMode = true,
  enableLiveUpdates = true,
}) => {
  return (
    <BaseProvider
      locale={locale}
      enableInspectorMode={enableInspectorMode}
      enableLiveUpdates={enableLiveUpdates}
      targetOrigin={[
        'https://app.contentful.com',
        'https://app.eu.contentful.com',
        'http://localhost:3000',
      ]}
    >
      {children}
    </BaseProvider>
  );
};
