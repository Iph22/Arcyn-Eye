# 🚀 ARCYN EYE - Quick Reference Guide

## 📍 Current Status: ✅ COMPLETE

Your dashboard at `localhost:3000/dashboard` now has the **full v0 design** with all features!

---

## 🎯 Quick Start

```bash
# Start development server
npm run dev

# Open dashboard
http://localhost:3000/dashboard
```

---

## 🗺️ Navigation Map

### **Left Sidebar (from layout.tsx):**
- 🏠 **Home** → Chat page
- 🤖 **Models** → Models management
- ⚙️ **Settings** → Settings pages

### **Bottom Navigation (in page.tsx):**
- 💬 **Chat** → Main chat interface
- 🤖 **Models** → Models page with search
- ⚙️ **Settings** → Settings with 4 tabs

### **Conversations Sidebar (collapsible):**
- **+ New Chat** button
- List of conversations
- **← / →** collapse button

---

## 📄 Pages Overview

### 1. **Chat Page** (Default)
**Location:** Main content area when "Chat" selected

**Features:**
- Collapsible conversations sidebar (280px)
- Chat messages area
- Input bar with send button
- Welcome screen (no messages)
- Loading animation (3 bouncing dots)

**Actions:**
- Type message → Press Enter → AI responds
- Click conversation → Load history
- Click "New Chat" → Start fresh
- Click ← → Collapse sidebar

---

### 2. **Models Page**
**Location:** Click "Models" in bottom nav

**Features:**
- Search bar (by name/description)
- Filter buttons (All, Auto, Connect, Manual)
- Model count display
- Grouped model cards:
  - ✓ Auto-Connected
  - ⚡ Quick Connect
  - \+ Manual Connection

**Actions:**
- Type in search → Filter results
- Click filter → Show specific type
- Click "Connect" → Open connection modal
- Enter API key → Test → Save

---

### 3. **Settings Page**
**Location:** Click "Settings" in bottom nav

**Structure:**
```
┌─────────────┬──────────────────────┐
│  Settings   │                      │
│  Sidebar    │   Settings Content   │
│             │                      │
│  Profile    │   [Active Tab]       │
│  Account    │                      │
│  Preferences│                      │
│  App        │                      │
└─────────────┴──────────────────────┘
```

#### **Tab 1: Profile Settings**
- Avatar upload (click to select image)
- Full name input
- Username input
- Bio textarea
- Save button

**Database:** `user_profiles` table

#### **Tab 2: Account Settings**
- Current password input
- New password input
- Confirm password input
- Update password button
- Email change section
- Send verification email button

**Database:** Supabase Auth

#### **Tab 3: Preferences**
- Theme toggle (Light/Dark)
- Notifications toggle
- Sound effects toggle
- Auto-save toggle
- Save button

**Database:** `user_preferences` table

#### **Tab 4: App Settings**
- API caching toggle
- Data retention selector (7/30/90/forever)
- Security mode (Standard/Enhanced)
- Save button

**Database:** `app_settings` table

---

## 🔌 Backend Connections

### **Hooks (in lib/hooks/):**
```typescript
// Load AI models
const { models, loading, refetch } = useModels()

// Manage conversations
const { conversations, createConversation, deleteConversation } = useConversations()

// Chat functionality
const { messages, sendMessage, loading } = useChat(conversationId, modelId)
```

### **Database Tables:**
1. `ai_connections` - AI models
2. `conversations` - Chat conversations
3. `messages` - Chat messages
4. `user_profiles` - User profile data
5. `user_preferences` - User preferences
6. `app_settings` - App settings

### **API Endpoints:**
- `GET /api/ai-connections` - List models
- `POST /api/ai-connections` - Add model
- `POST /api/ai-connections/test` - Test API key
- `POST /api/chat` - Send message to AI

---

## 🎨 Design System

### **Colors:**
- Background: `#000000` (pure black)
- Primary: `#06b6d4` (cyan)
- Accent: Cyan → Blue gradient
- Text: White with opacity variations
- Borders: `white/10`
- Panels: `white/5`

### **Glass Effect:**
```css
background: rgba(10, 10, 10, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### **Animations:**
- Page transitions: Framer Motion
- Hover effects: scale(1.05)
- Loading: Bouncing dots
- Sidebar: Width animation (280px ↔ 0px)

---

## 🛠️ Common Tasks

### **Add a New Model:**
1. Go to Models page
2. Find model in list
3. Click "Connect" or "Add API Key"
4. Enter API key
5. Click "Test Connection"
6. Click "Save & Connect"

### **Start a New Chat:**
1. Click "+ New Chat" button
2. Type message
3. Press Enter
4. AI responds automatically

### **Change Profile Picture:**
1. Go to Settings → Profile
2. Click "Upload Photo"
3. Select image file
4. Click "Save Changes"

### **Change Password:**
1. Go to Settings → Account
2. Enter current password
3. Enter new password (min 8 chars)
4. Confirm new password
5. Click "Update Password"

### **Toggle Preferences:**
1. Go to Settings → Preferences
2. Click toggle switches
3. Click "Save Preferences"

---

## 📊 File Structure Reference

```
app/dashboard/
├── page.tsx                      ← Main dashboard
├── layout.tsx                    ← Auth check + layout
└── components/
    ├── profile-settings.tsx      ← Profile tab
    ├── account-settings.tsx      ← Account tab
    ├── preferences.tsx           ← Preferences tab
    ├── app-settings.tsx          ← App settings tab
    └── models-page.tsx           ← Models page

lib/hooks/
├── useModels.ts                  ← Models hook
├── useConversations.ts           ← Conversations hook
└── useChat.ts                    ← Chat hook

components/
├── chat/
│   ├── chat-message-v0.tsx       ← Message bubbles
│   └── model-selector-v0.tsx     ← Model picker
├── dashboard/
│   └── sidebar.tsx               ← Left nav bar
└── settings/
    ├── model-card-v0.tsx         ← Model cards
    └── model-connection-modal.tsx ← Connection modal
```

---

## 🐛 Troubleshooting

### **Issue: Dashboard shows blank**
**Solution:** Check Supabase connection in `.env.local`

### **Issue: No models showing**
**Solution:** Add models via Settings or check `ai_connections` table

### **Issue: Chat not working**
**Solution:** 
1. Check `/api/chat` endpoint
2. Verify model API keys
3. Check browser console for errors

### **Issue: Settings not saving**
**Solution:**
1. Check database tables exist
2. Verify Supabase permissions
3. Check browser console

### **Issue: Avatar upload fails**
**Solution:**
1. Create "avatars" bucket in Supabase Storage
2. Set bucket to public
3. Check file size (< 5MB recommended)

---

## 🎯 Key Features Checklist

- ✅ Chat with AI models
- ✅ Conversation history
- ✅ Model management
- ✅ Model search & filter
- ✅ API key connection
- ✅ Profile management
- ✅ Avatar upload
- ✅ Password change
- ✅ Email change
- ✅ Preferences system
- ✅ App settings
- ✅ Glass morphism design
- ✅ Smooth animations
- ✅ Collapsible sidebar
- ✅ Bottom navigation
- ✅ Real-time updates
- ✅ Error handling
- ✅ Loading states

---

## 📚 Documentation Files

- `V0_COMPLETE_INTEGRATION.md` - Complete technical documentation
- `V0_INTEGRATION_SUMMARY.md` - Integration summary
- `INTEGRATION_COMPLETE.md` - Quick start guide
- `QUICK_REFERENCE.md` - This file
- `README.md` - Project overview

---

## 🚀 Production Deployment

```bash
# Build for production
npm run build

# Test production build
npm start

# Deploy to Vercel
vercel deploy --prod
```

---

## 💡 Tips

1. **Use keyboard shortcuts:** Enter to send, Esc to close modals
2. **Collapse sidebar:** More space for chat
3. **Search models:** Find specific AI models quickly
4. **Test connections:** Always test before saving API keys
5. **Save often:** Click save buttons after changes

---

## 🎉 You're All Set!

Your ARCYN EYE dashboard is fully functional with:
- Beautiful v0 design
- Complete feature set
- Backend integration
- Advanced settings
- Production ready

**Start chatting with AI! 🚀**

```bash
npm run dev
```

Open: `http://localhost:3000/dashboard`
