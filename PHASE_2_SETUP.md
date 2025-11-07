# Phase 2 Quick Setup Guide

## 🚀 5-Minute Setup

### Step 1: Database Migration (2 minutes)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/002_ai_connections.sql`
4. Click **Run**
5. Verify tables created: `ai_connections`, `conversations`, `messages`

### Step 2: Test the Application (3 minutes)

1. Start the dev server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/dashboard/settings`

3. You should see:
   - **Auto-Connected** section with Gemini models
   - **Quick Connect** section with OAuth models
   - **Connect Manually** section with API key models

4. Try connecting a model:
   - Click on any model in the "Connect Manually" section
   - Enter your API key (get from provider dashboard)
   - Click "Test Connection"
   - If successful, click "Save & Connect"

5. Navigate to `http://localhost:3000/dashboard`
   - You should see your connected model in the selector
   - Try sending a message!

---

## 🔑 Getting API Keys

### OpenAI
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-`)
4. Paste in ARCYN EYE connection modal

### Anthropic
1. Go to https://console.anthropic.com/settings/keys
2. Click "Create Key"
3. Copy the key (starts with `sk-ant-`)
4. Paste in ARCYN EYE connection modal

### Google AI
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API key"
3. Copy the key
4. Paste in ARCYN EYE connection modal

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Database tables created successfully
- [ ] Settings page loads without errors
- [ ] Can see auto-connected models
- [ ] Connection modal opens
- [ ] API key test works
- [ ] Can save connections
- [ ] Chat interface loads
- [ ] Model selector shows connected models
- [ ] Can send messages
- [ ] AI responses appear

---

## 🐛 Troubleshooting

### "Table does not exist" error
- Run the database migration in Supabase SQL editor

### "Unauthorized" error
- Make sure you're logged in
- Check RLS policies are enabled

### "Failed to connect" error
- Verify API key is correct
- Check provider is spelled correctly
- Ensure API key has proper permissions

### Models not showing in chat
- Refresh the page
- Check `/api/ai-connections` returns data
- Verify database has connections

---

## 🎨 What You'll See

### Settings Page
- Beautiful glass morphism cards
- Three sections: Auto, Quick Connect, Manual
- Smooth animations on hover
- Connection status indicators

### Chat Interface
- Pure black background
- Glass morphism message bubbles
- Animated model selector
- Smooth spring animations
- Real-time AI responses

---

## 📝 Next Steps

1. **Connect your first model** via Settings
2. **Start chatting** on the Dashboard
3. **Explore the code** to understand the architecture
4. **Customize** the design tokens to your liking
5. **Build** additional features on top

---

## 💡 Tips

- Use **Gemini Pro** (auto-connected) for free testing
- **OpenAI GPT-3.5** is cheapest for API key testing
- **Claude 3 Haiku** is fastest for quick responses
- Keep API keys secure - never commit to git

---

**Ready to build the future of AI interfaces!** ✨
