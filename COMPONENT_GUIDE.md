# ARCYN EYE - Component Guide

## Component Hierarchy

```
RootLayout (app/layout.tsx)
│
├─ HomePage (app/page.tsx) → Redirects to /login
│
├─ LoginPage (app/(auth)/login/page.tsx)
│  └─ SignInButton (components/auth/sign-in-button.tsx)
│
└─ DashboardLayout (app/dashboard/layout.tsx)
   ├─ Sidebar (components/dashboard/sidebar.tsx)
   │  ├─ Button (New Chat)
   │  ├─ ScrollArea
   │  └─ Conversation List Items
   │
   ├─ Header
   │  ├─ Logo & Title
   │  ├─ Action Buttons
   │  └─ UserNav (components/auth/user-nav.tsx)
   │     ├─ Avatar
   │     └─ DropdownMenu
   │
   └─ DashboardPage (app/dashboard/page.tsx)
      └─ ChatInterface (components/chat/chat-interface.tsx)
         ├─ ModelSelector (components/chat/model-selector.tsx)
         │  └─ DropdownMenu
         ├─ ScrollArea (Messages)
         │  └─ Message Bubbles
         └─ Input Area
            ├─ Button (Attach)
            ├─ Input (Message)
            └─ Button (Send)
```

---

## Component Details

### **Authentication Components**

#### `SignInButton`
**Location**: `components/auth/sign-in-button.tsx`
**Purpose**: Triggers Google OAuth sign-in
**Props**: None
**Features**:
- Loading state
- Supabase OAuth integration
- Error handling
- Glass morphism styling

```tsx
<SignInButton />
```

#### `UserNav`
**Location**: `components/auth/user-nav.tsx`
**Purpose**: User profile dropdown menu
**Props**:
```tsx
{
  user: {
    email?: string;
    user_metadata?: {
      avatar_url?: string;
      full_name?: string;
    };
  }
}
```
**Features**:
- Avatar with fallback initials
- Profile info display
- Settings link
- Sign out button

```tsx
<UserNav user={user} />
```

---

### **Dashboard Components**

#### `Sidebar`
**Location**: `components/dashboard/sidebar.tsx`
**Purpose**: Collapsible conversation list
**Props**: None
**State**:
- `isCollapsed` - Toggle sidebar width
**Features**:
- Collapsible (80px ↔ 320px)
- New chat button
- Conversation list (placeholder)
- Smooth transitions

```tsx
<Sidebar />
```

---

### **Chat Components**

#### `ChatInterface`
**Location**: `components/chat/chat-interface.tsx`
**Purpose**: Main chat view with messages and input
**Props**: None
**State**:
```tsx
{
  messages: Message[];
  input: string;
  selectedModel: string;
  isLoading: boolean;
}
```
**Features**:
- Message display
- User/assistant message styling
- Loading indicator
- Empty state with suggestions
- Message input with send

```tsx
<ChatInterface />
```

#### `ModelSelector`
**Location**: `components/chat/model-selector.tsx`
**Purpose**: Dropdown to select AI model
**Props**:
```tsx
{
  selectedModel: string;
  onModelChange: (model: string) => void;
}
```
**Features**:
- Model list with descriptions
- Status indicators (connected/disconnected)
- Provider labels
- Add models link

```tsx
<ModelSelector
  selectedModel="gpt-4"
  onModelChange={setModel}
/>
```

---

### **shadcn/ui Components**

#### `Button`
**Location**: `components/ui/button.tsx`
**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes**: `default`, `sm`, `lg`, `icon`

```tsx
<Button variant="default" size="lg">
  Click Me
</Button>
```

#### `Input`
**Location**: `components/ui/input.tsx`
**Purpose**: Text input field

```tsx
<Input
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

#### `Card`
**Location**: `components/ui/card.tsx`
**Sub-components**: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

#### `Avatar`
**Location**: `components/ui/avatar.tsx`
**Sub-components**: `Avatar`, `AvatarImage`, `AvatarFallback`

```tsx
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

#### `DropdownMenu`
**Location**: `components/ui/dropdown-menu.tsx`
**Sub-components**: Multiple (see file)

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### `ScrollArea`
**Location**: `components/ui/scroll-area.tsx`
**Purpose**: Custom scrollable container

```tsx
<ScrollArea className="h-[400px]">
  {/* Content */}
</ScrollArea>
```

#### `Separator`
**Location**: `components/ui/separator.tsx`
**Purpose**: Visual divider

```tsx
<Separator />
<Separator orientation="vertical" />
```

---

## Utility Functions

### `cn()`
**Location**: `lib/utils.ts`
**Purpose**: Merge Tailwind classes
**Usage**:
```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  condition && "conditional-class",
  "another-class"
)} />
```

---

## Supabase Clients

### Browser Client
**Location**: `lib/supabase/client.ts`
**Usage**:
```tsx
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
const { data, error } = await supabase.auth.getUser();
```

### Server Client
**Location**: `lib/supabase/server.ts`
**Usage**:
```tsx
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
```

---

## Custom Styles

### Glass Morphism Classes

```css
/* Light glass effect */
.glass {
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Strong glass effect */
.glass-strong {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

**Usage**:
```tsx
<div className="glass rounded-lg p-4">
  Content with glass effect
</div>
```

---

## Component Patterns

### Server Component (Default)
```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  
  return <div>Server Component</div>;
}
```

### Client Component
```tsx
// components/chat/chat-interface.tsx
"use client";

import { useState } from "react";

export function ChatInterface() {
  const [state, setState] = useState();
  
  return <div>Client Component</div>;
}
```

### Protected Route
```tsx
// app/dashboard/layout.tsx
export default async function DashboardLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <div>{children}</div>;
}
```

---

## State Management

### Local State (useState)
```tsx
const [messages, setMessages] = useState<Message[]>([]);
```

### Zustand (Ready for use)
```tsx
// lib/store.ts
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// In component
const { count, increment } = useStore();
```

---

## Styling Patterns

### Responsive Design
```tsx
<div className="
  flex flex-col          // Mobile: column
  md:flex-row           // Tablet+: row
  lg:gap-6              // Desktop: larger gap
">
```

### Conditional Styling
```tsx
<div className={cn(
  "base-styles",
  isActive && "active-styles",
  variant === "primary" && "primary-styles"
)}>
```

### Glass Morphism
```tsx
<div className="glass-strong rounded-2xl p-6 border border-border/50">
  Content with glass effect
</div>
```

---

## TypeScript Types

### Message Type
```tsx
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  timestamp: Date;
}
```

### User Type (Supabase)
```tsx
interface User {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
  };
}
```

---

## Adding New Components

### 1. Create Component File
```bash
# Create in appropriate directory
touch components/feature/new-component.tsx
```

### 2. Component Template
```tsx
"use client"; // If needs client-side features

import { cn } from "@/lib/utils";

interface NewComponentProps {
  // Props here
}

export function NewComponent({ }: NewComponentProps) {
  return (
    <div className="glass rounded-lg p-4">
      {/* Component content */}
    </div>
  );
}
```

### 3. Export and Use
```tsx
// In parent component
import { NewComponent } from "@/components/feature/new-component";

<NewComponent />
```

---

## Best Practices

### ✅ Do
- Use TypeScript for all components
- Apply glass morphism for cards/panels
- Use `cn()` for conditional classes
- Follow naming conventions
- Add proper TypeScript types
- Use server components by default
- Add "use client" only when needed

### ❌ Don't
- Mix server and client logic
- Forget to handle loading states
- Skip error handling
- Hardcode colors (use CSS variables)
- Ignore responsive design
- Skip TypeScript types

---

## Quick Reference

### Import Paths
```tsx
import { Component } from "@/components/..."  // Components
import { createClient } from "@/lib/..."      // Utilities
import { Button } from "@/components/ui/..."  // UI components
```

### Common Patterns
```tsx
// Loading state
{isLoading && <LoadingSpinner />}

// Conditional render
{user ? <Dashboard /> : <Login />}

// Map array
{items.map((item) => <Item key={item.id} {...item} />)}

// Glass effect
className="glass-strong rounded-2xl p-6"
```

---

**This guide covers all components in ARCYN EYE Phase 1** ✨
