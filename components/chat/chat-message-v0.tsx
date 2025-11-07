'use client'

import { motion } from 'framer-motion'
import { User, Sparkles } from 'lucide-react'

interface ChatMessageV0Props {
  role: 'user' | 'assistant'
  content: string
  model?: string
}

export function ChatMessageV0({ role, content, model }: ChatMessageV0Props) {
  const isUser = role === 'user'

  return (
    <motion.div
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div
        className={`max-w-2xl px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white'
            : 'bg-white/5 border border-white/10 text-white'
        }`}
        style={!isUser ? { backdropFilter: "blur(12px)" } : undefined}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        {!isUser && model && (
          <p className="text-xs text-gray-400 mt-2">via {model}</p>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </motion.div>
  )
}
