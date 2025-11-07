'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FloatingButtonV0Props {
  icon: LucideIcon
  label?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export function FloatingButtonV0({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
}: FloatingButtonV0Props) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold shadow-lg',
    secondary: 'bg-white/5 border border-white/10 text-white',
    ghost: 'bg-transparent text-white hover:bg-white/5',
  }

  const buttonClass = label
    ? cn(
        'px-4 py-3 rounded-full flex items-center justify-center gap-2 transition-all',
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )
    : cn(
        'rounded-full flex items-center justify-center transition-all',
        sizeClasses[size],
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )

  const shadowStyle =
    variant === 'primary' ? { boxShadow: '0 0 20px rgba(6,182,212,0.4)' } : undefined

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      style={shadowStyle}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
    >
      <Icon className={label ? 'w-5 h-5' : 'w-5 h-5'} />
      {label && <span className="text-sm font-medium">{label}</span>}
    </motion.button>
  )
}
