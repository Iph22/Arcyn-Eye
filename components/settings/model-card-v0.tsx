'use client'

import { motion } from 'framer-motion'

interface Model {
  id: string
  name: string
  icon: string
  description: string
  status: 'auto' | 'connect' | 'manual'
  badges?: string[]
}

interface ModelCardV0Props {
  model: Model
  buttonText?: string
  onSelect?: () => void
  onConnect?: () => void
}

export function ModelCardV0({ model, buttonText, onSelect, onConnect }: ModelCardV0Props) {
  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'auto':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'connect':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const handleClick = () => {
    if (model.status === 'auto' && onSelect) {
      onSelect()
    } else if (onConnect) {
      onConnect()
    }
  }

  return (
    <motion.div
      className="rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-all cursor-pointer group bg-white/5 border border-white/10 shadow-lg"
      style={{ backdropFilter: "blur(12px)" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
    >
      <div className="text-5xl mb-3">{model.icon}</div>
      <h4 className="font-bold text-white mb-1">{model.name}</h4>
      <p className="text-xs text-gray-400 mb-3">{model.description}</p>

      {model.status === 'auto' && (
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getBadgeColor(model.status)} mb-4`}>
          Auto
        </div>
      )}

      {model.badges && (
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          {model.badges.map((badge) => (
            <span key={badge} className="px-2 py-1 rounded text-xs bg-white/5 text-gray-300 border border-white/10">
              {badge}
            </span>
          ))}
        </div>
      )}

      {model.status !== 'auto' && (
        <motion.button
          className="w-full mt-2 px-3 py-2 rounded-lg bg-cyan-500 text-black font-medium text-sm hover:bg-cyan-400 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation()
            if (onConnect) onConnect()
          }}
        >
          {buttonText || 'Connect'}
        </motion.button>
      )}
    </motion.div>
  )
}
