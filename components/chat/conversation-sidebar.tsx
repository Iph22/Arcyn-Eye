'use client'

import { motion } from 'framer-motion'
import { Plus, Settings } from 'lucide-react'
import { FloatingButtonV0 } from '@/components/ui/floating-button-v0'

interface Conversation {
  id: string
  title: string
  timestamp: string
}

interface ConversationSidebarProps {
  conversations: Conversation[]
  onNewChat: () => void
  onSelectConversation: (id: string) => void
  onSettingsClick: () => void
}

export function ConversationSidebar({
  conversations,
  onNewChat,
  onSelectConversation,
  onSettingsClick,
}: ConversationSidebarProps) {
  return (
    <motion.aside
      className="w-80 m-4 rounded-2xl p-4 flex flex-col overflow-hidden bg-white/5 border border-white/10 shadow-lg"
      style={{ backdropFilter: "blur(12px)" }}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* New Chat Button */}
      <motion.button
        onClick={onNewChat}
        className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold py-3 rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-all mb-6 shadow-lg"
        style={{ boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="w-5 h-5" />
        New Chat
      </motion.button>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-6">
        {conversations.map((conv, idx) => (
          <motion.div
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
          >
            <p className="text-sm font-medium text-white truncate">{conv.title}</p>
            <p className="text-xs text-gray-500 mt-1">{conv.timestamp}</p>
          </motion.div>
        ))}
      </div>

      {/* Settings Button */}
      <motion.button
        onClick={onSettingsClick}
        className="w-full p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Settings className="w-5 h-5 text-white" />
        <span className="text-sm text-white">Settings</span>
      </motion.button>
    </motion.aside>
  )
}
