'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { arcynTokens } from '@/lib/design-tokens'

interface FloatingButtonProps {
  icon: LucideIcon
  label?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export function FloatingButton({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = 'primary',
  size = 'md',
  disabled = false
}: FloatingButtonProps) {
  const sizeClasses = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg'
  }
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      transition={arcynTokens.animations.springBouncy}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-full backdrop-blur-xl flex items-center gap-2",
        "font-medium shadow-xl transition-all duration-200",
        sizeClasses[size],
        variant === 'primary' && "bg-cyan-500 hover:bg-cyan-400 text-black",
        variant === 'secondary' && "bg-white/10 hover:bg-white/20 text-white border border-white/20",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      style={{
        boxShadow: variant === 'primary' 
          ? '0 8px 32px rgba(6, 182, 212, 0.4)' 
          : '0 8px 24px rgba(0, 0, 0, 0.3)'
      }}
    >
      <Icon className="w-5 h-5" />
      {label && <span>{label}</span>}
    </motion.button>
  )
}
