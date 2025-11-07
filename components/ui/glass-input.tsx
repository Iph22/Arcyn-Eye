'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { arcynTokens } from '@/lib/design-tokens'

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export function GlassInput({ icon, className, ...props }: GlassInputProps) {
  return (
    <motion.div
      whileFocus={{ scale: 1.01 }}
      transition={arcynTokens.animations.springGentle}
      className="relative"
    >
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={cn(
          "w-full h-12 px-4 bg-white/[0.03] backdrop-blur-xl",
          "border border-white/10 rounded-xl",
          "text-white placeholder:text-zinc-500",
          "focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20",
          "transition-all duration-200",
          icon && "pl-12",
          className
        )}
        style={{
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
        }}
      />
    </motion.div>
  )
}
