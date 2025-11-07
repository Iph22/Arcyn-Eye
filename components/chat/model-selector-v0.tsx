'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Model {
  id: string
  name: string
  icon: string
  provider?: string
}

interface ModelSelectorV0Props {
  currentModel: Model | null
  onClick: () => void
}

export function ModelSelectorV0({ currentModel, onClick }: ModelSelectorV0Props) {
  if (!currentModel) {
    return (
      <motion.button
        onClick={onClick}
        className="px-4 py-2 rounded-full flex items-center gap-2 bg-white/5 border border-white/10 text-gray-400"
        style={{ backdropFilter: "blur(12px)" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-sm font-medium">Select Model</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className="px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-all bg-white/5 border border-white/10"
      style={{ backdropFilter: "blur(12px)" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{currentModel.icon}</span>
      <span className="text-sm font-medium">{currentModel.name}</span>
      <ChevronDown className="w-4 h-4" />
    </motion.button>
  )
}
