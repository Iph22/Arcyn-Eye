# ARCYN EYE - Quick Start

## 🚀 Get Started in 5 Minutes

### 1. Set Up Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com) → Create new project
2. Copy your **Project URL** and **anon key** from Settings → API
3. Enable Google OAuth in Authentication → Providers

### 2. Configure Environment (1 minute)

```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local and add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Run the App (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✅ What's Working

- ✅ Beautiful glass morphism UI
- ✅ Google OAuth authentication
- ✅ Responsive chat interface
- ✅ Model selector (UI ready)
- ✅ Sidebar with conversations
- ✅ User profile dropdown

## 🔜 Next Steps

### To Enable Google Sign-In:

1. **Google Cloud Console** ([console.cloud.google.com](https://console.cloud.google.com))
   - Create new project
   - Enable Google+ API
   - Create OAuth credentials
   - Add redirect URI: `https://[your-project].supabase.co/auth/v1/callback`

2. **Add to Supabase**
   - Paste Client ID and Secret in Supabase → Authentication → Google

### To Add AI Models:

**OpenAI:**
```bash
npm install openai
```

**Anthropic (Claude):**
```bash
npm install @anthropic-ai/sdk
```

**Google (Gemini):**
```bash
npm install @google/generative-ai
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `app/globals.css` | ARCYN design system & theme |
| `lib/supabase/` | Supabase client configuration |
| `components/auth/` | Authentication components |
| `components/chat/` | Chat interface |
| `app/dashboard/` | Main application |

## 🎨 Customization

### Change Colors

Edit `app/globals.css`:
```css
:root {
  --primary: #06b6d4;    /* Main accent color */
  --accent: #22d3ee;     /* Secondary accent */
  --background: #000000; /* Background */
}
```

### Modify Layout

- **Sidebar**: `components/dashboard/sidebar.tsx`
- **Top Nav**: `app/dashboard/layout.tsx`
- **Chat**: `components/chat/chat-interface.tsx`

## 🐛 Common Issues

**"Module not found"**
```bash
npm install
```

**"Supabase error"**
- Check `.env.local` exists and has correct values
- Restart dev server

**"Build failed"**
```bash
rm -rf .next
npm run dev
```

## 📚 Full Documentation

- [Complete Setup Guide](./SETUP_GUIDE.md)
- [Main README](./README.md)

---

**Need help?** Open an issue on GitHub
