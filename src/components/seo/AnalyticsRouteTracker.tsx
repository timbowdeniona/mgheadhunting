'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '../../lib/analytics';

/**
 * Tracks client-side App Router route transitions in GA4,
 * skipping initial mount (handled by gtag config) and internal/staging paths.
 */
export function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!pathname) return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const qs = searchParams?.toString();
    const fullPath = qs ? `${pathname}?${qs}` : pathname;
    trackPageView(fullPath);
  }, [pathname, searchParams]);

  return null;
}
