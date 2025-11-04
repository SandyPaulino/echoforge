# EchoForge - Quick Start Guide 🚀

Get up and running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free)

## Setup Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Get Supabase Credentials

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in:
   - Name: `echoforge`
   - Database Password: (create a strong one)
   - Region: (choose closest to you)
4. Wait 2 minutes for setup
5. Go to **Settings** → **API**
6. Copy these two values:
   - **Project URL**
   - **anon/public key**

### 3️⃣ Create Environment File

Create a file named `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Paste your actual values from step 2.

### 4️⃣ Start Development Server
```bash
npm run dev
```

### 5️⃣ Test It Out!

1. Open http://localhost:6002
2. You'll see the login page
3. Click **"Sign up"**
4. Enter your email and a password (min 6 characters)
5. Click **"Create Account"**
6. 🎉 You're in! Check out the dashboard

## Troubleshooting

**"Invalid API credentials"**
- Check your `.env.local` file has the correct values
- Restart the dev server: Stop (Ctrl+C) and run `npm run dev` again

**"Email not confirmed"**
- For development, disable email confirmation:
  1. Go to your Supabase dashboard
  2. **Authentication** → **Settings**
  3. Disable "Enable email confirmations"

**Build errors**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## What's Included

✅ **Authentication System**
- Login page at `/login`
- Signup page at `/signup`
- Protected dashboard at `/dashboard`
- Logout functionality

✅ **Modern UI**
- Tailwind CSS styling
- shadcn/ui components
- Lucide React icons
- Responsive design

✅ **Security**
- Protected routes
- Session management
- Server-side validation

## Project Structure

```
├── app/
│   ├── (auth)/login        → Login page
│   ├── (auth)/signup       → Signup page
│   └── (dashboard)         → Protected dashboard
├── components/ui/          → Reusable UI components
├── lib/supabase/           → Supabase configuration
└── middleware.ts           → Route protection
```

## Next Steps

Now that auth is working, you can:

1. **Customize the dashboard** - Edit `app/(dashboard)/dashboard/page.tsx`
2. **Add new pages** - Create files in `app/(dashboard)/`
3. **Build features** - Start implementing the EchoForge content automation
4. **Add styling** - Modify Tailwind classes and colors

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Check for errors
```

## Resources

- 📖 [Full Documentation](./README.md)
- 🔧 [Detailed Setup Guide](./SETUP.md)
- 📝 [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)
- 🔗 [Supabase Docs](https://supabase.com/docs)
- 🔗 [Next.js Docs](https://nextjs.org/docs)

## Need Help?

1. Check the console for error messages
2. Verify `.env.local` is configured correctly
3. Make sure your Supabase project is active
4. Check Supabase logs in the dashboard

---

**Ready to build?** Start editing `app/(dashboard)/dashboard/page.tsx` and make it your own! 🎨

