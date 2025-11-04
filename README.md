# ARCYN EYE

**Unified AI Interface Platform**

> *Minimal. Sharp. Intentional. Intelligence through clarity.*

A cross-platform application that aggregates multiple AI models into a single, elegant chat interface. Built with Next.js 14, TypeScript, and Supabase.

## 🎯 Philosophy

ARCYN EYE embodies the "glass city at night" aesthetic - quiet confidence, no friction. Every interaction is designed to be intentional, every element serves a purpose.

## ✨ Features

- **🔐 Google OAuth Authentication** - Secure sign-in with Google
- **🤖 Multi-Model Support** - Switch between AI models seamlessly
- **💬 Unified Chat Interface** - Single interface for all your AI conversations
- **🎨 Glass Morphism Design** - Beautiful, modern UI with dark theme
- **⚡ Real-time Updates** - Instant message delivery and streaming responses
- **📱 Responsive Design** - Works perfectly on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up here](https://supabase.com))
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Arcyn-Eye
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   
   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to Authentication → Providers → Google and enable it
   
   c. Add your Google OAuth credentials
   
   d. Copy your project URL and anon key

4. **Configure environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
arcyn-eye/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Authentication routes
│   │   └── login/           # Login page
│   ├── dashboard/           # Main dashboard
│   │   ├── layout.tsx       # Dashboard layout
│   │   └── page.tsx         # Dashboard home
│   ├── auth/                # Auth callbacks
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── chat/               # Chat interface components
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utility functions
│   ├── supabase/          # Supabase clients
│   └── utils.ts           # Helper functions
└── public/                # Static assets
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Backend & Auth
- **Supabase** - Authentication and database
- **Google OAuth 2.0** - User authentication

### State Management
- **Zustand** - Lightweight state management

## 🎨 Design System

### Colors
- **Background**: Pure black (#000000)
- **Primary**: Cyan (#06b6d4)
- **Accent**: Bright cyan (#22d3ee)
- **Muted**: Slate gray (#1e293b)

### Typography
- **Sans**: Geist Sans
- **Mono**: Geist Mono

### Components
- Glass morphism effects with backdrop blur
- 8px base spacing unit
- 12px border radius for cards
- Smooth transitions and animations

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL (default: http://localhost:3000) | No |

## 📝 Development Roadmap

### Phase 1: Foundation ✅
- [x] Next.js 14 setup
- [x] Tailwind CSS with ARCYN design tokens
- [x] Supabase authentication
- [x] Base UI components
- [x] Chat interface

### Phase 2: Core Features (In Progress)
- [ ] OpenAI API integration
- [ ] Claude API integration
- [ ] Gemini API integration
- [ ] Model switching functionality
- [ ] Conversation history
- [ ] File upload support

### Phase 3: Intelligence Layer
- [ ] Auto-discover AI accounts
- [ ] Model comparison view
- [ ] Context preservation
- [ ] Streaming responses
- [ ] Advanced file handling

### Phase 4: Polish & Scale
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron/Tauri)
- [ ] Performance optimization
- [ ] Analytics and monitoring
- [ ] Advanced features (folders, search, export)

## 🤝 Contributing

This is a foundational project for the larger ARCYN ecosystem. Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the ARCYN ecosystem.

## 🔗 Related Projects

- **Arcyn.x** - Advanced AI capabilities
- **Modulex** - Modular AI components
- **Nexalab** - AI experimentation platform

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ by the ARCYN team**
