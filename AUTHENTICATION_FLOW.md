# EchoForge Authentication Flow

## Overview

This document explains how authentication works in EchoForge using Supabase.

## User Journey

### 1. First Visit (Unauthenticated)

```
User visits http://localhost:6002
          ↓
   middleware.ts checks auth
          ↓
   No session found
          ↓
   Redirect to /login
```

### 2. Signup Flow

```
User clicks "Sign up" link
          ↓
   Navigate to /signup page
          ↓
User enters email & password
          ↓
   Form validation (client-side)
   - Password min 6 chars
   - Passwords match
          ↓
   Submit form → signup() server action
          ↓
   Supabase creates user account
          ↓
   Session created & stored in cookies
          ↓
   Redirect to /dashboard
```

**Files Involved:**
- `app/(auth)/signup/page.tsx` - Signup form UI
- `app/actions/auth.ts` - signup() server action
- `lib/supabase/server.ts` - Supabase server client

### 3. Login Flow

```
User visits /login
          ↓
User enters credentials
          ↓
   Submit form → login() server action
          ↓
   Supabase validates credentials
          ↓
   Session created & stored in cookies
          ↓
   Redirect to /dashboard
```

**Files Involved:**
- `app/(auth)/login/page.tsx` - Login form UI
- `app/actions/auth.ts` - login() server action
- `lib/supabase/server.ts` - Supabase server client

### 4. Accessing Protected Routes

```
User navigates to /dashboard/*
          ↓
   middleware.ts intercepts request
          ↓
   Check session in cookies
          ↓
Is session valid?
   ├─ YES → Continue to page
   │         ↓
   │    Dashboard layout checks auth
   │         ↓
   │    getUser() server action
   │         ↓
   │    Render dashboard
   │
   └─ NO → Redirect to /login
```

**Files Involved:**
- `middleware.ts` - First auth check
- `app/(dashboard)/layout.tsx` - Second auth check
- `app/actions/auth.ts` - getUser() function

### 5. Logout Flow

```
User clicks "Logout" button
          ↓
   logout() server action
          ↓
   Supabase destroys session
          ↓
   Clear cookies
          ↓
   Redirect to /login
```

**Files Involved:**
- `components/dashboard/nav.tsx` - Logout button
- `app/actions/auth.ts` - logout() server action
- `lib/supabase/server.ts` - Supabase server client

## Technical Details

### Session Management

**Where sessions are stored:**
- HTTP-only cookies (secure)
- Managed by Supabase
- Automatic expiration

**Session refresh:**
- Handled by middleware on every request
- Ensures sessions stay valid
- Prevents auth expiration during use

### Route Protection

**Three layers of protection:**

1. **Middleware** (`middleware.ts`)
   - Runs on every request
   - Checks all routes except static files
   - Fast redirect for unauthenticated users

2. **Layout Server Components** (`app/(dashboard)/layout.tsx`)
   - Server-side auth check
   - Fetch user data
   - Pass to child components

3. **Server Actions** (`app/actions/auth.ts`)
   - Handle auth operations
   - Validate on server
   - Secure by default

### Data Flow

```
Browser (Client Component)
    ↓
Server Action (app/actions/auth.ts)
    ↓
Supabase Server Client (lib/supabase/server.ts)
    ↓
Supabase Auth API
    ↓
PostgreSQL Database
```

## File Responsibilities

### Authentication Logic

| File | Purpose |
|------|---------|
| `middleware.ts` | Route protection & session refresh |
| `app/actions/auth.ts` | Server actions for auth operations |
| `lib/supabase/client.ts` | Client-side Supabase instance |
| `lib/supabase/server.ts` | Server-side Supabase instance |

### User Interface

| File | Purpose |
|------|---------|
| `app/(auth)/login/page.tsx` | Login form |
| `app/(auth)/signup/page.tsx` | Signup form |
| `app/(auth)/layout.tsx` | Auth pages wrapper |
| `components/dashboard/nav.tsx` | Navigation with logout |

### Protected Content

| File | Purpose |
|------|---------|
| `app/(dashboard)/layout.tsx` | Protected routes wrapper |
| `app/(dashboard)/dashboard/page.tsx` | Main dashboard |

### Type Safety

| File | Purpose |
|------|---------|
| `types/auth.ts` | Auth-related TypeScript types |
| `types/database.ts` | Database schema types |

## Security Features

### ✅ Implemented Security

1. **Server-Side Validation**
   - All auth happens on server
   - No client-side bypassing possible

2. **HTTP-Only Cookies**
   - Session tokens not accessible to JavaScript
   - Protected from XSS attacks

3. **CSRF Protection**
   - Built into Supabase
   - Automatic token validation

4. **Password Requirements**
   - Minimum 6 characters (configurable)
   - Validated client and server-side

5. **Session Expiration**
   - Automatic timeout
   - Refresh on activity
   - Clean logout

6. **Protected Routes**
   - Middleware prevents access
   - Server components double-check
   - Automatic redirects

### 🔒 Best Practices

- Never expose credentials in client code
- Always validate on server
- Use environment variables for secrets
- Implement rate limiting (future)
- Add 2FA for production (future)
- Enable email confirmation (production)

## Environment Variables

Required for authentication:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

**Why NEXT_PUBLIC?**
- These are safe to expose to the browser
- The anon key is public by design
- Row Level Security (RLS) in Supabase provides actual security

## Error Handling

### Login Errors
- Invalid credentials → Show error message
- Account not found → Generic error (security)
- Network error → Show retry message

### Signup Errors
- Email already exists → Clear message
- Invalid email format → Validation error
- Password too weak → Requirements message
- Network error → Show retry message

### Session Errors
- Expired session → Auto-redirect to login
- Invalid token → Clear and redirect
- Network timeout → Retry with backoff

## Testing the Flow

### Manual Testing Steps

1. **Test Signup:**
   ```
   1. Go to /signup
   2. Enter new email & password
   3. Verify redirect to /dashboard
   4. Check user email displays correctly
   ```

2. **Test Login:**
   ```
   1. Logout
   2. Go to /login
   3. Enter credentials
   4. Verify redirect to /dashboard
   ```

3. **Test Protection:**
   ```
   1. Logout
   2. Try to visit /dashboard directly
   3. Verify redirect to /login
   ```

4. **Test Logout:**
   ```
   1. Login
   2. Click logout
   3. Verify redirect to /login
   4. Try to go back to /dashboard
   5. Verify redirect to /login (session cleared)
   ```

## Future Enhancements

Potential improvements:

- [ ] Password reset flow
- [ ] Email verification
- [ ] OAuth providers (Google, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] Session management page
- [ ] Login history
- [ ] Account deletion
- [ ] Password strength indicator
- [ ] Remember me functionality
- [ ] Multiple sessions management

## Debugging

### Check Session Status

Add this to any server component:

```typescript
import { getUser } from '@/app/actions/auth'

const user = await getUser()
console.log('Current user:', user)
```

### Check Middleware

Add logging to `middleware.ts`:

```typescript
console.log('Path:', request.nextUrl.pathname)
console.log('User:', user ? user.email : 'none')
```

### Supabase Dashboard

Check your Supabase dashboard:
- **Authentication → Users**: See all users
- **Authentication → Logs**: See auth events
- **Logs → Explorer**: Query logs directly

## Summary

EchoForge uses a modern, secure authentication system built on:
- ✅ Supabase Auth for user management
- ✅ Next.js middleware for route protection
- ✅ Server actions for secure operations
- ✅ HTTP-only cookies for session storage
- ✅ TypeScript for type safety
- ✅ Server components for security

The implementation follows Next.js and Supabase best practices for a production-ready authentication system.

