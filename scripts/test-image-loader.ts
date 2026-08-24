import { contentfulImageLoader, getContentfulImageUrl, normalizeImageUrl, isContentfulAssetUrl } from '../src/lib/contentful/imageLoader';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ ${message}`);
  }
}

console.log('--- Testing Contentful Image Loader ---');

// 1. Contentful URL loader transformation
const rawCtfUrl = '//images.ctfassets.net/space_id/asset_id/token/architecture.jpg';
const transformed = contentfulImageLoader({ src: rawCtfUrl, width: 800, quality: 80 });
console.log('Result 1:', transformed);
assert(transformed.startsWith('https://images.ctfassets.net/'), 'Normalizes protocol-relative URL to HTTPS');
assert(transformed.includes('w=800'), 'Sets width param w=800');
assert(transformed.includes('q=80'), 'Sets quality param q=80');
assert(transformed.includes('fm=webp'), 'Sets next-gen format fm=webp');

// 2. Custom quality override
const transformedQ90 = contentfulImageLoader({ src: 'https://images.ctfassets.net/s/a/t/photo.png', width: 1200, quality: 90 });
console.log('Result 2:', transformedQ90);
assert(transformedQ90.includes('q=90'), 'Respects quality override q=90');
assert(transformedQ90.includes('w=1200'), 'Sets width param w=1200');

// 3. Non-Contentful URL pass-through (e.g. Unsplash)
const unsplashUrl = 'https://images.unsplash.com/photo-12345?w=800';
const nonCtfTransformed = contentfulImageLoader({ src: unsplashUrl, width: 800, quality: 80 });
console.log('Result 3:', nonCtfTransformed);
assert(nonCtfTransformed === unsplashUrl, 'Passes through non-Contentful URLs unchanged');

// 4. getContentfulImageUrl helper test (OpenGraph 1200x630)
const ogImageUrl = getContentfulImageUrl(rawCtfUrl, {
  width: 1200,
  height: 630,
  fit: 'fill',
  quality: 85,
  format: 'jpg',
});
console.log('Result 4:', ogImageUrl);
assert(ogImageUrl.includes('w=1200'), 'OG image has w=1200');
assert(ogImageUrl.includes('h=630'), 'OG image has h=630');
assert(ogImageUrl.includes('fit=fill'), 'OG image has fit=fill');
assert(ogImageUrl.includes('q=85'), 'OG image has q=85');
assert(ogImageUrl.includes('fm=jpg'), 'OG image has fm=jpg');

console.log('\nAll image loader unit tests passed successfully!');
