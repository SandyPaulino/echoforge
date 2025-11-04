# 🚀 Getting Started with EchoForge

## Quick Setup (5 Minutes)

### Step 1: Install Dependencies ✅
Already done! All packages are installed.

### Step 2: Set Up Supabase

#### 2.1 Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - **Name**: `echoforge`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
4. Click "Create new project"
5. Wait ~2 minutes for setup

#### 2.2 Get Your Credentials
1. In Supabase dashboard, click **Settings** (gear icon)
2. Click **API** in the left menu
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string under "Project API keys")

#### 2.3 Create Environment File
Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Paste your actual values from step 2.2.

#### 2.4 Run Database Schema
1. In Supabase dashboard, click **SQL Editor**
2. Click **New query**
3. Open `lib/supabase/schema.sql` in your code editor
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. Wait for "Success. No rows returned"

✅ Your database is ready!

### Step 3: Start the App

```bash
npm run dev
```

Open http://localhost:6002

## First-Time Use

### 1. Create Your Account
1. Visit http://localhost:6002
2. You'll be redirected to `/login`
3. Click **"Sign up"**
4. Enter:
   - Email: your-email@example.com
   - Password: (min 6 characters)
   - Confirm password: (same password)
5. Click **"Create Account"**
6. You're in! 🎉

### 2. Create a Brand Voice
1. Click **"Brand Voice"** in the nav
2. Click **"New Profile"**
3. Fill in:
   - **Name**: "My Professional Voice"
   - **Tone**: Professional
   - **Target Audience**: "Business professionals"
   - **Style Guide**: "Clear, concise, authoritative"
   - **Examples**: Add 2-3 sample texts in your style
4. Check **"Set as default"**
5. Click **"Create Profile"**

### 3. Upload Your First Content
1. Click **"Upload"** in the nav
2. Choose **"Text"** tab
3. Fill in:
   - **Title**: "My First Content"
   - **Content**: Paste or type your content (article, post, etc.)
4. Click **"Upload Content"**
5. You'll be redirected to the Generate page

### 4. Generate Platform Content
1. Click on your uploaded content
2. Select your brand voice (or use default)
3. Check platforms you want (Twitter, LinkedIn, Instagram, etc.)
4. Click **"Generate Content"**
5. Wait 2-3 seconds...
6. See your content transformed for each platform! ✨

### 5. Use Generated Content
For each platform:
- **View**: Click platform tabs
- **Copy**: Click "Copy" button
- **Edit**: Click menu → Edit
- **Download**: Click menu → Download
- **Regenerate**: Click menu → Regenerate

## Features Overview

### 📤 Upload
- **Text**: Direct input with word count
- **File**: Upload TXT, MD, PDF, DOC, DOCX
- **URL**: Import from YouTube, blogs (simplified in MVP)

### 🎙️ Brand Voice
- Create unlimited voice profiles
- 8 tone options (Professional, Casual, Friendly, etc.)
- Define style guide & target audience
- Provide example texts
- Set default voice

### ✨ Generate
- Transform one content into many
- Support for 6 platforms
- Platform-specific formats
- Brand voice consistency
- Real-time generation

### 📝 Platform Cards
- Copy to clipboard (one click)
- Download as text file
- Edit inline
- Regenerate with one click
- Track status (draft/edited/exported)

### 💰 Credits
- Track usage
- View history
- See breakdown by operation
- Upgrade plans (UI ready)

## Supported Platforms

### Twitter/X
- Threads (multi-tweet)
- Single posts
- Replies

### LinkedIn
- Posts (with formatting)
- Long-form articles
- Comments

### Instagram
- Captions (with hashtags)
- Stories
- Reels

### Email
- Newsletters
- Announcements
- Follow-ups

### Blog
- Articles
- Listicles
- Tutorials

### Facebook
- Posts
- Stories

## Tips & Tricks

### 💡 Best Practices

1. **Content Quality**
   - Use well-structured source content
   - 200-1000 words works best
   - Clear main points

2. **Brand Voice**
   - Provide diverse example texts
   - Be specific in style guide
   - Update as your brand evolves

3. **Platform Selection**
   - Start with 2-3 platforms
   - Test different formats
   - Adapt based on results

4. **Editing**
   - Review generated content
   - Personalize when needed
   - Save edited versions

### 🎯 Workflows

**Quick Post Workflow:**
```
Upload → Generate → Copy → Paste to platform
```

**Content Campaign Workflow:**
```
Upload → Generate all platforms → Edit each → Download all → Schedule
```

**Testing Workflow:**
```
Upload → Generate → Try different voices → Compare results
```

## Troubleshooting

### "Invalid API credentials"
- Check `.env.local` exists
- Verify URL and key are correct
- No extra spaces or quotes
- Restart dev server: Stop (Ctrl+C) then `npm run dev`

### Database errors
- Run schema.sql again in Supabase
- Check table names match
- Verify RLS policies enabled

### "Not authenticated"
- Logout and login again
- Clear browser cache
- Check Supabase project is active

### Generation not working
- Check you have remaining credits
- Verify source content uploaded
- Try creating a brand voice first
- Check console for errors

### Can't copy to clipboard
- Make sure you're on HTTPS or localhost
- Try download instead
- Check browser permissions

## Keyboard Shortcuts

- `Ctrl/Cmd + K` - Quick search (future)
- `Escape` - Close dialogs
- `Enter` - Submit forms
- `Tab` - Navigate forms

## Project Structure

```
echoforge/
├── app/
│   ├── (auth)/          # Login, Signup
│   ├── (dashboard)/     # Protected pages
│   │   ├── dashboard/   # Home
│   │   ├── upload/      # Upload content
│   │   ├── generate/    # View & generate
│   │   ├── brand-voice/ # Voice management
│   │   └── credits/     # Usage & billing
│   └── actions/         # Server actions
├── components/          # React components
├── lib/                 # AI, mocks, utils
├── types/               # TypeScript types
└── utils/supabase/      # Supabase clients
```

## What's Next?

### Immediate Actions
1. ✅ Create account
2. ✅ Set up brand voice
3. ✅ Upload content
4. ✅ Generate your first outputs
5. ✅ Share your results!

### Future Features
- Real AI integration (OpenAI/Claude)
- Direct platform publishing
- Analytics dashboard
- Team collaboration
- Content calendar
- Template library
- API access

## Need Help?

- **Documentation**: See `README.md` for full docs
- **Setup Issues**: Check `SETUP.md`
- **Technical Details**: See `AUTHENTICATION_FLOW.md`
- **Database**: Refer to `lib/supabase/schema.sql`

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## Success Checklist

- [ ] Supabase project created
- [ ] Environment variables set
- [ ] Database schema executed
- [ ] Dev server running
- [ ] Account created
- [ ] Brand voice created
- [ ] Content uploaded
- [ ] First generation complete
- [ ] Content copied/downloaded

**All checked?** You're ready to scale your content! 🚀

---

**Questions?** Check the docs or review the code - everything is documented!

**Ready to build?** Start transforming your messages into platform-native content! ✨



