import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Update session
  const supabaseResponse = await updateSession(request)

  // Get user from the response (we need to create a new client to check auth)
  const { createServerClient } = await import('@supabase/ssr')
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll() {
          // Not needed for checking auth
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect dashboard routes
  if (!user && pathname.startsWith('/dashboard-routes')) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth-routes/login'
    return NextResponse.redirect(url)
  }

  // Redirect to dashboard if already logged in and trying to access auth pages
  if (user && (pathname === '/auth-routes/login' || pathname === '/auth-routes/signup')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard-routes/dashboard'
    return NextResponse.redirect(url)
  }

  // Redirect root to dashboard if logged in, otherwise to login
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = user ? '/dashboard-routes/dashboard' : '/auth-routes/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

