'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { arcynTokens } from '@/lib/design-tokens'

interface ModelSelectorProps {
  models: any[]
  currentModel: any
  onSelectModel: (model: any) => void
}

export function ModelSelector({ models, currentModel, onSelectModel }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      {/* Selector Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 px-4 rounded-full backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 transition-colors group"
      >
        <span className="text-2xl">{currentModel?.icon}</span>
        <span className="text-sm font-medium text-white">{currentModel?.name}</span>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>
      
      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={arcynTokens.animations.spring}
              className="absolute top-full mt-2 right-0 w-80 backdrop-blur-2xl bg-zinc-900/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              <div className="p-2 max-h-96 overflow-y-auto">
                {models.map((model) => (
                  <motion.button
                    key={model.id}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      onSelectModel(model)
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-3 rounded-xl hover:bg-white/5 flex items-center gap-3 transition-colors group"
                  >
                    <span className="text-2xl">{model.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-white">{model.name}</div>
                      <div className="text-xs text-zinc-500">{model.provider}</div>
                    </div>
                    {currentModel?.id === model.id && (
                      <Check className="w-4 h-4 text-cyan-400" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
