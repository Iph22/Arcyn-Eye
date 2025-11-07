'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { FloatingNav } from '@/components/navigation/floating-nav'
import { ConversationSidebar } from '@/components/chat/conversation-sidebar'
import { ChatMessageV0 } from '@/components/chat/chat-message-v0'
import { SettingsModalV0 } from '@/components/settings/settings-modal-v0'
import { ModelConnectionModal } from '@/components/settings/model-connection-modal'
import { FloatingButtonV0 } from '@/components/ui/floating-button-v0'
import { useModels } from '@/lib/hooks/useModels'
import { useConversations } from '@/lib/hooks/useConversations'
import { useChat } from '@/lib/hooks/useChat'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const [modelToConnect, setModelToConnect] = useState<any>(null)
  const [selectedModel, setSelectedModel] = useState<any>(null)
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  
  const router = useRouter()
  const supabase = createClient()

  // Use hooks for data management
  const { models, loading: modelsLoading, refetch: refetchModels } = useModels()
  const { conversations, createConversation, refetch: refetchConversations } = useConversations()
  const { messages, sendMessage, loading: chatLoading } = useChat(
    currentConversationId,
    selectedModel?.id || ''
  )

  // Check authentication
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  // Set first model as selected when models load
  useEffect(() => {
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[0])
    }
  }, [models])

  // Handle new chat creation
  async function handleNewChat() {
    const newConv = await createConversation()
    if (newConv) {
      setCurrentConversationId(newConv.id)
      setInput('')
    }
  }

  // Handle conversation selection
  function handleSelectConversation(id: string) {
    setCurrentConversationId(id)
  }

  // Handle send message
  async function handleSendMessage() {
    if (!input.trim() || chatLoading) return

    // Create conversation if none exists
    if (!currentConversationId) {
      const newConv = await createConversation()
      if (newConv) {
        setCurrentConversationId(newConv.id)
        // Wait a bit for state to update
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    await sendMessage(input)
    setInput('')
    
    // Refresh conversations to update timestamps
    refetchConversations()
  }

  // Handle model selection
  function handleSelectModel(modelId: string) {
    const model = models.find(m => m.id === modelId)
    if (model) {
      setSelectedModel(model)
      setShowSettings(false)
    }
  }

  // Handle model connection
  function handleConnectModel(modelId: string) {
    const model = models.find(m => m.id === modelId)
    if (model) {
      setModelToConnect(model)
      setShowConnectionModal(true)
      setShowSettings(false)
    }
  }

  // Handle connection success
  function handleConnectionSuccess() {
    setShowConnectionModal(false)
    setModelToConnect(null)
    refetchModels()
  }

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col overflow-hidden font-sans">
      {/* Floating Navigation Bar */}
      <FloatingNav
        currentModel={selectedModel}
        onModelSelectorClick={() => setShowSettings(true)}
      />

      {/* Main Content */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <ConversationSidebar
          conversations={conversations}
          onNewChat={handleNewChat}
          onSelectConversation={handleSelectConversation}
          onSettingsClick={() => setShowSettings(true)}
        />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col m-4">
          <motion.div
            className="flex-1 flex flex-col items-center justify-center space-y-4 overflow-y-auto p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {messages.length === 0 ? (
              <>
                <motion.div
                  className="text-6xl"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  ✨
                </motion.div>
                <h1 className="text-4xl font-bold text-center">Welcome to ARCYN EYE</h1>
                <p className="text-lg text-gray-400">Your unified AI interface</p>
                {models.length === 0 ? (
                  <p className="text-cyan-400 font-medium">Connect your first AI model in settings →</p>
                ) : (
                  <p className="text-cyan-400 font-medium">Select a model to start</p>
                )}
              </>
            ) : (
              <div className="w-full max-w-4xl space-y-4">
                <AnimatePresence>
                  {messages.map((msg: any, idx: number) => (
                    <ChatMessageV0
                      key={idx}
                      role={msg.role}
                      content={msg.content}
                      model={msg.model_used}
                    />
                  ))}
                </AnimatePresence>
                
                {chatLoading && (
                  <div className="flex items-center gap-2 text-cyan-400">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Input Bar */}
          <motion.div
            className="mt-4 p-4 rounded-2xl flex gap-3 bg-white/5 border border-white/10 shadow-lg"
            style={{ backdropFilter: 'blur(12px)' }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Message ARCYN EYE..."
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
              disabled={!selectedModel || chatLoading}
            />
            <FloatingButtonV0
              icon={Send}
              onClick={handleSendMessage}
              variant="primary"
              size="md"
              disabled={!input.trim() || !selectedModel || chatLoading}
            />
          </motion.div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModalV0
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        models={models}
        onSelectModel={handleSelectModel}
        onConnectModel={handleConnectModel}
      />

      {/* Connection Modal */}
      {modelToConnect && (
        <ModelConnectionModal
          model={modelToConnect}
          isOpen={showConnectionModal}
          onClose={() => {
            setShowConnectionModal(false)
            setModelToConnect(null)
          }}
          onSuccess={handleConnectionSuccess}
        />
      )}
    </div>
  )
}
