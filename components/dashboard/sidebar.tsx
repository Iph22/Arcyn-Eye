'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { MessageSquare, Settings, Sparkles, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Chat',
    href: '/dashboard',
    icon: MessageSquare,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    name: 'Showcase',
    href: '/dashboard/showcase',
    icon: Palette,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-20 border-r border-white/10 bg-black flex flex-col items-center py-6 space-y-8">
      {/* Logo */}
      <Link href="/dashboard" className="group">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center space-y-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className="group relative"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200",
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
              </motion.div>

              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.name}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-zinc-900" />
              </div>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section - User Avatar placeholder */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
        U
      </div>
    </aside>
  )
}
