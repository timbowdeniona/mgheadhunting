import { createClient, ContentfulClientApi } from 'contentful';

const SPACE_ID =
  process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
  process.env.VITE_CONTENTFUL_SPACE_ID ||
  'hssdcxeme8fc';

const ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
  process.env.VITE_CONTENTFUL_ACCESS_TOKEN ||
  'dNLw9i3MlYkVWfwwfRZsAUQ4Rgxfyhk03P17acDxW_k';

const PREVIEW_TOKEN =
  process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN ||
  process.env.VITE_CONTENTFUL_PREVIEW_TOKEN ||
  'HLX-xI3sY5STYGnKlUN2vWr0oOaHjxVAz-jHC_zTuoI';

const ENVIRONMENT =
  process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ||
  process.env.CONTENTFUL_ENVIRONMENT ||
  'master';

let deliveryClient: ContentfulClientApi<undefined> | null = null;
let previewClient: ContentfulClientApi<undefined> | null = null;

export function getContentfulClient(preview = false): ContentfulClientApi<undefined> {
  if (preview) {
    if (!previewClient && SPACE_ID && PREVIEW_TOKEN) {
      previewClient = createClient({
        space: SPACE_ID,
        accessToken: PREVIEW_TOKEN,
        host: 'preview.contentful.com',
        environment: ENVIRONMENT,
      });
    }
    return previewClient!;
  }

  if (!deliveryClient && SPACE_ID && ACCESS_TOKEN) {
    deliveryClient = createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN,
      environment: ENVIRONMENT,
    });
  }

  return deliveryClient!;
}
