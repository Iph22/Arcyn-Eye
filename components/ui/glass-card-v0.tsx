'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardV0Props extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  hover?: boolean
  className?: string
}

export function GlassCardV0({ children, hover = false, className, ...props }: GlassCardV0Props) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl p-6 bg-white/5 border border-white/10 shadow-lg",
        hover && "cursor-pointer transition-all",
        className
      )}
      style={{ backdropFilter: "blur(12px)" }}
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  )
}
