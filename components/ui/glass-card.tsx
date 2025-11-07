'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { arcynTokens } from '@/lib/design-tokens'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function GlassCard({ children, className, hover = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={arcynTokens.animations.spring}
      onClick={onClick}
      className={cn(
        "backdrop-blur-xl bg-white/[0.03] border border-white/10",
        "rounded-2xl p-6 shadow-lg",
        "transition-colors duration-200",
        hover && "cursor-pointer hover:bg-white/[0.06] hover:border-white/20",
        className
      )}
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      }}
    >
      {children}
    </motion.div>
  )
}
