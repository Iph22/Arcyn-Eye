# ARCYN EYE Setup Guide

This guide will walk you through setting up ARCYN EYE from scratch.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [Google OAuth Setup](#google-oauth-setup)
4. [Local Development](#local-development)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- A **Google account** for OAuth setup
- A **Supabase account** (free tier is fine)

## Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the details:
   - **Name**: `arcyn-eye` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait for setup to complete

### Step 2: Get Your Project Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values (you'll need them later):
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 3: Enable Google OAuth

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** in the list
3. Toggle it **ON**
4. Keep this page open - you'll need to add credentials here after setting up Google OAuth

## Google OAuth Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click "New Project"
4. Name it "ARCYN EYE" and click "Create"

### Step 2: Enable Google+ API

1. In the Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click on it and press "Enable"

### Step 3: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type (unless you have a Google Workspace)
3. Click "Create"
4. Fill in the required fields:
   - **App name**: ARCYN EYE
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click "Save and Continue"
6. Skip "Scopes" for now (click "Save and Continue")
7. Add test users if needed
8. Click "Save and Continue"

### Step 4: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click "Create Credentials" → "OAuth client ID"
3. Choose **Web application**
4. Name it "ARCYN EYE Web Client"
5. Add **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   ```
6. Add **Authorized redirect URIs**:
   ```
   http://localhost:3000/auth/callback
   https://xxxxx.supabase.co/auth/v1/callback
   ```
   (Replace `xxxxx` with your actual Supabase project ID)
7. Click "Create"
8. **Save your Client ID and Client Secret**

### Step 5: Add Google Credentials to Supabase

1. Go back to your Supabase project
2. Navigate to **Authentication** → **Providers** → **Google**
3. Paste your **Client ID** and **Client Secret**
4. Click "Save"

## Local Development

### Step 1: Clone and Install

```bash
# Navigate to your project directory
cd /home/i22/Documents/Arcyn-Eye

# Install dependencies (if not already done)
npm install
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### Step 3: Run the Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Step 4: Test Authentication

1. Open [http://localhost:3000](http://localhost:3000)
2. You should be redirected to the login page
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected to the dashboard

## Troubleshooting

### Issue: "Invalid redirect URI"

**Solution**: Make sure you've added the correct redirect URIs in Google Cloud Console:
- `http://localhost:3000/auth/callback`
- `https://xxxxx.supabase.co/auth/v1/callback`

### Issue: "Supabase client error"

**Solution**: 
1. Check that your `.env.local` file exists and has the correct values
2. Restart the development server after changing environment variables
3. Verify your Supabase project URL and anon key are correct

### Issue: "Google OAuth not working"

**Solution**:
1. Ensure Google+ API is enabled in Google Cloud Console
2. Verify OAuth consent screen is configured
3. Check that your Google OAuth credentials are correctly added to Supabase
4. Make sure you're using the correct redirect URI

### Issue: "Page not loading / Build errors"

**Solution**:
1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check for TypeScript errors: `npm run build`

### Issue: "Cannot find module errors"

**Solution**:
1. Ensure all dependencies are installed: `npm install`
2. Check that the import paths are correct
3. Restart your IDE/editor

## Next Steps

Once you have the basic setup working:

1. **Add AI Model API Keys**: Configure OpenAI, Claude, or other AI model APIs
2. **Customize Design**: Modify the design tokens in `app/globals.css`
3. **Add Features**: Implement conversation history, file uploads, etc.
4. **Deploy**: Deploy to Vercel or your preferred hosting platform

## Production Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Update Google OAuth redirect URIs to include your production URL
6. Deploy!

### Environment Variables for Production

Make sure to add these in your hosting platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL` (your production URL)

## Support

If you encounter issues not covered here:

1. Check the [main README](./README.md)
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Check [Supabase documentation](https://supabase.com/docs)
4. Open an issue on GitHub

---

**Happy building! 🚀**
