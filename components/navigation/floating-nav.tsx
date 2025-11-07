'use client'

import { motion } from 'framer-motion'
import { Sparkles, User } from 'lucide-react'
import { ModelSelectorV0 } from '@/components/chat/model-selector-v0'

interface Model {
  id: string
  name: string
  icon: string
  provider?: string
}

interface FloatingNavProps {
  currentModel: Model | null
  onModelSelectorClick: () => void
  onProfileClick?: () => void
}

export function FloatingNav({ currentModel, onModelSelectorClick, onProfileClick }: FloatingNavProps) {
  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 h-16 px-6 flex items-center justify-between z-50 w-[calc(100%-2rem)] max-w-5xl rounded-full bg-white/5 border border-white/10 shadow-lg"
      style={{ backdropFilter: "blur(12px)" }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-cyan-400" />
        <span className="font-bold text-lg text-white">ARCYN EYE</span>
      </div>

      {/* Model Selector */}
      <ModelSelectorV0 currentModel={currentModel} onClick={onModelSelectorClick} />

      {/* User Profile */}
      <motion.button
        onClick={onProfileClick}
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:scale-105 transition-all"
        style={{ backdropFilter: "blur(12px)" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <User className="w-5 h-5 text-white" />
      </motion.button>
    </motion.nav>
  )
}
