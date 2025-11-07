'use client'

import { motion } from 'framer-motion'

interface ChatMessageV0Props {
  role: 'user' | 'assistant'
  content: string
  model?: string
}

export function ChatMessageV0({ role, content, model }: ChatMessageV0Props) {
  const isUser = role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xl px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-cyan-500/20 border border-cyan-500/50'
            : 'bg-white/5 border border-white/10'
        }`}
        style={isUser ? { boxShadow: '0 0 20px rgba(6,182,212,0.3)' } : undefined}
      >
        <p className="text-sm text-white">{content}</p>
        {!isUser && model && (
          <p className="text-xs text-gray-500 mt-1">{model}</p>
        )}
      </div>
    </motion.div>
  )
}
