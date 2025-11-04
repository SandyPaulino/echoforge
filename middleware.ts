import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl

    // Create response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    // Create Supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => {
              request.cookies.set(name, value)
            })
            response = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    // Refresh session
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    // If there's an error getting the user, allow the request to continue
    if (error) {
      console.error('Middleware auth error:', error)
    }

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

    return response
  } catch (error) {
    // If middleware fails, log error and allow request to continue
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

