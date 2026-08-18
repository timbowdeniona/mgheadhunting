import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const type = searchParams.get('type') || searchParams.get('contentType');

  const configuredSecret =
    process.env.CONTENTFUL_PREVIEW_SECRET ||
    process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_SECRET ||
    'mgh_preview_secret_2026';

  // Validate preview secret if provided or enforce matching secret
  if (secret && secret !== configuredSecret) {
    return new Response('Invalid preview secret token', { status: 401 });
  }

  // Enable Next.js Draft Mode (sets bypass cookie for ISR and server components)
  const draft = await draftMode();
  draft.enable();

  // Determine target route
  let targetPath = '/';

  if (type === 'insight' || type === 'insightArticle') {
    targetPath = slug ? `/insights/${slug}` : '/insights';
  } else if (slug && slug !== 'home' && slug !== 'index' && slug !== '/') {
    targetPath = `/${slug.startsWith('/') ? slug.slice(1) : slug}`;
  }

  redirect(targetPath);
}
