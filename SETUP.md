# EchoForge Setup Guide

## Quick Start (5 Minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project:

   - Enter a project name (e.g., "echoforge")
   - Set a strong database password
   - Choose a region close to you
   - Click "Create new project"

4. Wait ~2 minutes for your database to initialize

5. Get your API credentials:
   - Click on "Project Settings" (gear icon in left sidebar)
   - Click "API" in the left menu
   - Copy the following:
     - Project URL (looks like: `https://xxxxx.supabase.co`)
     - `anon` / `public` key (the long string under "Project API keys")

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual Supabase credentials from step 2.

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Test the Application

1. Open [http://localhost:6002](http://localhost:6002) in your browser
2. You'll be redirected to the login page
3. Click "Sign up" to create an account
4. Enter your email and password (min 6 characters)
5. Click "Create Account"
6. You'll be automatically logged in and redirected to the dashboard

## Supabase Configuration (Optional)

### Enable Email Confirmation (Production)

By default, Supabase requires email confirmation for new signups. For development:

1. Go to Authentication > Settings in your Supabase dashboard
2. Scroll to "Email Auth"
3. Disable "Enable email confirmations" for testing
4. Remember to re-enable this for production!

### Customize Email Templates

1. Go to Authentication > Email Templates
2. Customize the confirmation and reset password emails
3. Add your brand colors and messaging

### Set Up OAuth Providers (Optional)

To add social login:

1. Go to Authentication > Providers
2. Enable providers (Google, GitHub, etc.)
3. Add the required credentials
4. Update the login/signup pages to include OAuth buttons

## Troubleshooting

### "Invalid API credentials"

- Double-check your `.env.local` file
- Make sure you copied the correct URL and anon key
- Restart the dev server after changing `.env.local`

### "Email not confirmed"

- Check your Supabase email confirmation settings
- Look in your email spam folder
- Or disable email confirmation in development

### Build errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### TypeScript errors

- Make sure all dependencies are installed
- Run `npm install` again if needed
- Check that TypeScript is version 5+

## Next Steps

Once your authentication is working:

1. ✅ Customize the dashboard UI
2. ✅ Add more protected routes
3. ✅ Implement the content upload feature
4. ✅ Connect AI services
5. ✅ Add platform integrations

## Project Structure

```
├── app/
│   ├── (auth)/              # Public auth pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/         # Protected pages
│   │   └── dashboard/
│   └── actions/             # Server actions
├── components/
│   ├── ui/                  # Reusable UI components
│   └── dashboard/           # Dashboard components
├── lib/
│   └── supabase/            # Supabase configuration
└── middleware.ts            # Auth protection
```

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## Support

If you run into issues:

1. Check the console for error messages
2. Verify your environment variables
3. Make sure Supabase project is active
4. Check the Supabase logs in the dashboard
