import { ImageLoaderProps } from 'next/image';

export interface ContentfulImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'png' | 'jpg';
  fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
  focus?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'face' | 'faces';
}

/**
 * Checks if a given URL is hosted on Contentful's Assets CDN.
 */
export function isContentfulAssetUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('images.ctfassets.net') || url.includes('ctfassets.net');
}

/**
 * Normalizes protocol-relative URLs (e.g. "//images.ctfassets.net/...") to absolute HTTPS URLs.
 */
export function normalizeImageUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  return url;
}

/**
 * Custom Next.js Image loader that delegates responsive resizing, format conversion (WebP),
 * and quality compression (q=80 sweet spot) directly to Contentful's global Images API CDN.
 */
export function contentfulImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src) return '';

  const normalized = normalizeImageUrl(src);

  if (!isContentfulAssetUrl(normalized)) {
    return normalized;
  }

  try {
    const url = new URL(normalized);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', (quality || 80).toString());
    
    // Only set format if not already explicitly specified in the src
    if (!url.searchParams.has('fm')) {
      url.searchParams.set('fm', 'webp');
    }

    return url.toString();
  } catch {
    // If URL parsing fails, return normalized original
    return normalized;
  }
}

/**
 * Helper to build custom Contentful Image API URLs with explicit dimensions, format, fit, and focus.
 * Ideal for OpenGraph metadata, fixed banners, and custom focal-point image transforms.
 */
export function getContentfulImageUrl(src: string, options: ContentfulImageOptions = {}): string {
  if (!src) return '';

  const normalized = normalizeImageUrl(src);

  if (!isContentfulAssetUrl(normalized)) {
    return normalized;
  }

  try {
    const url = new URL(normalized);

    if (options.width) {
      url.searchParams.set('w', options.width.toString());
    }
    if (options.height) {
      url.searchParams.set('h', options.height.toString());
    }
    url.searchParams.set('q', (options.quality || 80).toString());
    url.searchParams.set('fm', options.format || 'webp');

    if (options.fit) {
      url.searchParams.set('fit', options.fit);
    }
    if (options.focus) {
      url.searchParams.set('f', options.focus);
    }

    return url.toString();
  } catch {
    return normalized;
  }
}
