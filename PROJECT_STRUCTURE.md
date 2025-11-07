# ARCYN EYE - Project Structure

## 📁 Complete File Tree

```
arcyn-eye/
│
├── 📄 Configuration Files
│   ├── package.json                    # Dependencies & scripts
│   ├── tsconfig.json                   # TypeScript config
│   ├── tailwind.config.ts              # Tailwind CSS config
│   ├── next.config.js                  # Next.js config
│   └── components.json                 # shadcn/ui config
│
├── 📚 Documentation (Phase 2)
│   ├── PHASE_2_README.md              # Comprehensive overview
│   ├── PHASE_2_SETUP.md               # Quick start guide
│   ├── IMPLEMENTATION_SUMMARY.md      # Technical summary
│   ├── DEPLOYMENT_CHECKLIST.md        # Production deployment
│   └── PROJECT_STRUCTURE.md           # This file
│
├── 🎨 Design System
│   └── lib/
│       └── design-tokens.ts           # iOS 26 design tokens
│           ├── colors                 # Color palette
│           ├── spacing                # Spacing scale
│           ├── radius                 # Border radius
│           ├── shadows                # Shadow definitions
│           └── animations             # Spring physics
│
├── 🧩 UI Components
│   └── components/
│       └── ui/
│           ├── glass-card.tsx         # Glass morphism card
│           ├── floating-button.tsx    # iOS-style button
│           ├── glass-input.tsx        # Glass input field
│           ├── button.tsx             # Base button
│           ├── input.tsx              # Base input
│           ├── dropdown-menu.tsx      # Dropdown component
│           └── ... (other shadcn components)
│
├── 💬 Chat Components
│   └── components/
│       └── chat/
│           ├── chat-interface.tsx     # Main chat UI
│           ├── model-selector.tsx     # Model dropdown
│           └── chat-message.tsx       # Message bubble
│
├── ⚙️ Settings Components
│   └── components/
│       └── settings/
│           └── model-connection-modal.tsx  # Connection flow
│
├── 🤖 AI Model System
│   └── lib/
│       └── ai-models/
│           ├── model-registry.ts      # Model catalog (9+ models)
│           │   ├── OpenAI models
│           │   ├── Anthropic models
│           │   ├── Google models
│           │   ├── Perplexity models
│           │   └── Mistral models
│           └── auto-detect.ts         # Auto-connection logic
│
├── 🔐 Authentication
│   └── lib/
│       └── auth/
│           └── post-signup.ts         # First-login handler
│
├── 📱 Pages & Routes
│   └── app/
│       ├── (auth)/
│       │   └── login/
│       │       └── page.tsx           # Login page
│       │
│       ├── auth/
│       │   ├── callback/
│       │   │   └── route.ts           # Auth callback (updated)
│       │   └── auth-code-error/
│       │       └── page.tsx           # Error page
│       │
│       └── dashboard/
│           ├── page.tsx               # Chat interface
│           ├── settings/
│           │   └── page.tsx           # Settings page
│           └── showcase/
│               └── page.tsx           # Design showcase
│
├── 🔌 API Endpoints
│   └── app/
│       └── api/
│           ├── ai-connections/
│           │   ├── route.ts           # CRUD operations
│           │   │   ├── GET            # Fetch connections
│           │   │   ├── POST           # Save connection
│           │   │   └── DELETE         # Remove connection
│           │   └── test/
│           │       └── route.ts       # Test API keys
│           │           ├── testOpenAI()
│           │           ├── testAnthropic()
│           │           └── testGoogle()
│           │
│           └── chat/
│               └── route.ts           # Multi-provider chat
│                   ├── chatWithOpenAI()
│                   ├── chatWithAnthropic()
│                   └── chatWithGoogle()
│
├── 🗄️ Database
│   └── supabase/
│       └── migrations/
│           ├── 001_initial_schema.sql
│           └── 002_ai_connections.sql # Phase 2 schema
│               ├── ai_connections table
│               ├── conversations table
│               ├── messages table
│               ├── Indexes
│               └── RLS Policies
│
└── 🛠️ Utilities
    └── lib/
        ├── utils.ts                   # Helper functions
        └── supabase/
            ├── client.ts              # Client-side Supabase
            └── server.ts              # Server-side Supabase
```

---

## 🎯 Key Directories Explained

### `/lib/design-tokens.ts`
Central design system with iOS 26 aesthetic:
- Color palette (black, cyan, glass)
- Spacing scale (4px to 64px)
- Border radius (12px to 32px)
- Spring animations (300/30, 400/25, 200/35)

### `/components/ui/`
Reusable UI primitives:
- Glass morphism components
- iOS-style buttons
- Animated inputs
- Base shadcn components

### `/components/chat/`
Chat-specific components:
- Full chat interface
- Model selector dropdown
- Message bubbles with animations

### `/lib/ai-models/`
AI model management:
- Registry of 9+ models
- Auto-detection logic
- Provider configurations

### `/app/api/`
Backend API routes:
- Connection management
- API key testing
- Multi-provider chat routing

### `/supabase/migrations/`
Database schema:
- User connections
- Conversations
- Messages
- Security policies

---

## 📊 Component Hierarchy

```
App
├── AuthProvider
│   └── Dashboard
│       ├── ChatInterface
│       │   ├── Sidebar
│       │   │   └── FloatingButton (New Chat)
│       │   ├── Header
│       │   │   └── ModelSelector
│       │   │       └── Dropdown Menu
│       │   ├── Messages
│       │   │   └── ChatMessage[]
│       │   └── Input
│       │       ├── GlassInput
│       │       └── FloatingButton (Send)
│       │
│       └── Settings
│           ├── Auto-Connected Section
│           │   └── ModelCard[]
│           ├── Quick Connect Section
│           │   └── ModelCard[]
│           ├── Manual Connect Section
│           │   └── ModelCard[]
│           └── ModelConnectionModal
│               ├── Step 1: Get API Key
│               ├── Step 2: Enter Key
│               └── Step 3: Test & Save
```

---

## 🔄 Data Flow

### Connection Flow
```
User → Settings Page
  → Click "Connect"
    → Modal Opens
      → Enter API Key
        → Test Connection (API)
          → Save to Database
            → Appears in Chat Selector
```

### Chat Flow
```
User → Type Message
  → Select Model
    → Send Message (API)
      → Route to Provider
        → Get AI Response
          → Display in Chat
            → Save to Database (future)
```

### Auto-Connect Flow
```
User → Sign In with Google
  → Auth Callback
    → Check First Login
      → Auto-Detect Services
        → Create Connections
          → Redirect to Dashboard
```

---

## 📦 Dependencies by Category

### Core Framework
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety

### UI & Animation
- `framer-motion` - Animations
- `@radix-ui/*` - Headless components
- `lucide-react` - Icons
- `tailwindcss` - Styling

### Backend & Database
- `@supabase/supabase-js` - Database client
- `@supabase/ssr` - Server-side auth

### AI Providers
- `openai` - OpenAI SDK
- (Anthropic via fetch)
- (Google AI via fetch)

### Utilities
- `clsx` - Class names
- `class-variance-authority` - Component variants
- `tailwind-merge` - Merge Tailwind classes
- `zustand` - State management

---

## 🎨 Design Token Usage

### In Components
```typescript
import { arcynTokens } from '@/lib/design-tokens'

// Colors
className="bg-black text-white border-white/10"

// Spacing
className="p-6 gap-4"

// Radius
className="rounded-2xl"

// Animations
transition={arcynTokens.animations.spring}
```

### In Styles
```css
background: rgba(255,255,255,0.03);
border: 1px solid rgba(255,255,255,0.10);
backdrop-filter: blur(20px);
box-shadow: 0 8px 32px rgba(0,0,0,0.4);
```

---

## 🔐 Security Layers

```
User Request
  ↓
Next.js Middleware (Auth Check)
  ↓
API Route (Server-side)
  ↓
Supabase RLS (Row Level Security)
  ↓
Database
```

---

## 📈 Scalability Path

### Current (Phase 2)
```
Next.js App → Supabase → AI Providers
```

### Phase 3
```
Next.js App → Supabase → Redis Cache → AI Providers
```

### Phase 4
```
Next.js App → API Gateway → Microservices
                              ├── Auth Service
                              ├── Chat Service
                              ├── AI Gateway
                              └── Analytics Service
```

---

## 🎯 File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `glass-card.tsx`)
- **Pages**: `page.tsx` (Next.js convention)
- **API Routes**: `route.ts` (Next.js convention)
- **Utilities**: `kebab-case.ts` (e.g., `design-tokens.ts`)
- **Types**: `PascalCase` interfaces (e.g., `AIModel`)

---

## 📝 Import Patterns

```typescript
// External libraries
import { useState } from 'react'
import { motion } from 'framer-motion'

// Internal utilities
import { cn } from '@/lib/utils'
import { arcynTokens } from '@/lib/design-tokens'

// Components
import { GlassCard } from '@/components/ui/glass-card'
import { FloatingButton } from '@/components/ui/floating-button'

// Types
import type { AIModel } from '@/lib/ai-models/model-registry'
```

---

This structure supports the ARCYN philosophy:
**Intentional. Modular. Scalable.**
