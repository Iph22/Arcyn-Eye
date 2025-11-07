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
  return (
    <motion.button
      onClick={onClick}
      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all"
      style={{ backdropFilter: "blur(12px)" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {currentModel ? (
        <>
          <span className="text-lg">{currentModel.icon}</span>
          <span className="text-sm font-medium text-white">{currentModel.name}</span>
        </>
      ) : (
        <span className="text-sm font-medium text-gray-400">Select Model</span>
      )}
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </motion.button>
  )
}
