# EchoForge - The AI Engine of Modern Communication

Amplify a single message into infinite impact.

## Features

- ✅ **Supabase Authentication** - Email/password authentication with secure session management
- ✅ **Next.js 14** - Modern React framework with App Router
- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **Tailwind CSS** - Utility-first styling with custom design system
- ✅ **shadcn/ui** - Beautiful, accessible UI components
- ✅ **Protected Routes** - Middleware-based authentication and route protection
- ✅ **Responsive Design** - Mobile-first, modern interface

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project (free tier works great)

### Setup Instructions

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up Supabase:**

   - Go to [supabase.com](https://supabase.com) and create a new project
   - Wait for the database to be ready (takes ~2 minutes)
   - Go to Project Settings > API
   - Copy your project URL and anon/public key

3. **Configure environment variables:**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Run the development server:**

```bash
npm run dev
```

5. **Open your browser:**

Navigate to [http://localhost:6002](http://localhost:6002)

## Project Structure

```
├── app/
│   ├── (auth)/              # Authentication routes (login, signup)
│   ├── (dashboard)/         # Protected dashboard routes
│   ├── actions/             # Server actions for auth
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── dashboard/           # Dashboard-specific components
├── lib/
│   ├── supabase/            # Supabase client configuration
│   └── utils.ts             # Utility functions
├── types/                   # TypeScript type definitions
└── middleware.ts            # Auth middleware
```

## Authentication Flow

1. **Signup**: Users create an account with email/password
2. **Login**: Users sign in with their credentials
3. **Protected Routes**: Middleware checks authentication status
4. **Session Management**: Supabase handles secure session storage
5. **Logout**: Users can securely sign out

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)

## Key Features Implemented

### Authentication

- Email/password signup and login
- Protected routes with middleware
- Secure session management
- Server-side and client-side auth handling

### UI/UX

- Modern, gradient-based design
- Responsive layouts
- Loading states and error handling
- Accessible components

### Developer Experience

- Full TypeScript support
- Type-safe Supabase client
- Server actions for auth
- Clean project structure

## Next Steps

To continue building EchoForge, consider:

1. **Content Upload**: Add file upload for videos, podcasts, articles
2. **AI Integration**: Connect to AI services for content transformation
3. **Platform Connections**: Integrate with social media APIs
4. **Brand Voice**: Implement AI brand voice learning
5. **Scheduling**: Add content scheduling functionality
6. **Analytics**: Track content performance
7. **Team Features**: Add collaboration and team management

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.

## License

MIT License - feel free to use this project as a foundation for your own applications.
