'use client'

import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'
import { arcynTokens } from '@/lib/design-tokens'

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant'
    content: string
    model?: string
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={arcynTokens.animations.springGentle}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
        ${isUser ? 'bg-cyan-500/20' : 'bg-purple-500/20'}
      `}>
        {isUser ? (
          <User className="w-5 h-5 text-cyan-400" />
        ) : (
          <Bot className="w-5 h-5 text-purple-400" />
        )}
      </div>
      
      {/* Message */}
      <div className={`flex-1 space-y-2 ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {message.model && (
          <span className="text-xs text-zinc-500">{message.model}</span>
        )}
        <div className={`
          px-4 py-3 rounded-2xl max-w-2xl
          ${isUser 
            ? 'bg-cyan-500/20 text-white border border-cyan-500/30' 
            : 'bg-white/5 text-white border border-white/10'
          }
        `}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
