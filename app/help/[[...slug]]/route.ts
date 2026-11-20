import { type NextRequest, NextResponse } from 'next/server'
import { resolveHelpPath } from '@/lib/help-routing.mjs'

/**
 * `/help/<surface>/<app path>`: the apps' way into the docs. It sends the
 * reader to the guide for the screen they came from; see
 * `lib/help-routing.mjs` for the rules.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug = [] } = await params
  const { searchParams } = request.nextUrl
  // Segments arrive decoded; re-encode them so a `%23` or `%3F` inside one
  // stays part of it instead of cutting the path short.
  const [surface, ...rest] = slug.map(encodeURIComponent)
  const queryPath = searchParams.get('path')
  const target = resolveHelpPath({
    surface,
    from: searchParams.get('from'),
    path: queryPath ?? `/${rest.join('/')}`,
    explicitPath: queryPath !== null,
    topic: searchParams.get('topic'),
    referer: request.headers.get('referer')
  })
  // Temporary, and never cached: the rules change as the docs grow, and the
  // answer can depend on the Referer.
  const response = NextResponse.redirect(new URL(target, request.url), 307)
  response.headers.set('Cache-Control', 'no-store, private')
  return response
}
