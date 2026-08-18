import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const redirectPath = searchParams.get('redirect') || '/';

  // Disable Next.js Draft Mode (clears bypass cookie)
  const draft = await draftMode();
  draft.disable();

  redirect(redirectPath);
}
