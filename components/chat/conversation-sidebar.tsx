'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Plus, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

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
  onSettingsClick
}: ConversationSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <motion.div
      className="relative h-full bg-white/5 border-r border-white/10 flex flex-col"
      style={{ backdropFilter: "blur(12px)" }}
      initial={{ x: -20, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        width: isCollapsed ? '60px' : '280px'
      }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-white" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-white" />
        )}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <motion.button
          onClick={onNewChat}
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium flex items-center justify-center gap-2 hover:scale-105 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span>New Chat</span>}
        </motion.button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence>
          {conversations.map((conv, idx) => (
            <motion.button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className="w-full p-3 rounded-lg hover:bg-white/10 transition-all text-left mb-1 group"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {conv.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {conv.timestamp}
                    </p>
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Settings Button */}
      <div className="p-4 border-t border-white/10">
        <motion.button
          onClick={onSettingsClick}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span>Settings</span>}
        </motion.button>
      </div>
    </motion.div>
  )
}
