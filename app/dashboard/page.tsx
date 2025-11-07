'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Settings, Cpu, User, Sliders, Sparkles, ChevronDown } from 'lucide-react'
import { ChatMessageV0 } from '@/components/chat/chat-message-v0'
import { FloatingButtonV0 } from '@/components/ui/floating-button-v0'
import { ModelConnectionModal } from '@/components/settings/model-connection-modal'
import { SettingsModalV0 } from '@/components/settings/settings-modal-v0'
import { useModels } from '@/lib/hooks/useModels'
import { useConversations } from '@/lib/hooks/useConversations'
import { useChat } from '@/lib/hooks/useChat'
import { ProfileSettings } from './components/profile-settings'
import { AccountSettings } from './components/account-settings'
import { Preferences } from './components/preferences'
import { AppSettings } from './components/app-settings'
import { ModelsPage } from './components/models-page'

type Page = 'chat' | 'models' | 'settings'
type SettingsTab = 'profile' | 'account' | 'preferences' | 'app'

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState<Page>('chat')
  const [settingsTab, setSettingsTab] = useState<SettingsTab>('profile')
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [modelToConnect, setModelToConnect] = useState<any>(null)
  const [selectedModel, setSelectedModel] = useState<any>(null)
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  // Use hooks for data management
  const { models, refetch: refetchModels } = useModels()
  const { conversations, createConversation, refetch: refetchConversations } = useConversations()
  const { messages, sendMessage, loading: chatLoading } = useChat(
    currentConversationId,
    selectedModel?.id || ''
  )

  // Set first model as selected when models load
  if (models.length > 0 && !selectedModel) {
    setSelectedModel(models[0])
  }

  // Handle new chat creation
  async function handleNewChat() {
    const newConv = await createConversation()
    if (newConv) {
      setCurrentConversationId(newConv.id)
      setInput('')
      setCurrentPage('chat')
    }
  }

  // Handle conversation selection
  function handleSelectConversation(id: string) {
    setCurrentConversationId(id)
    setCurrentPage('chat')
  }

  // Handle send message
  async function handleSendMessage() {
    if (!input.trim() || chatLoading) return

    // Create conversation if none exists
    if (!currentConversationId) {
      const newConv = await createConversation()
      if (newConv) {
        setCurrentConversationId(newConv.id)
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    await sendMessage(input)
    setInput('')
    refetchConversations()
  }

  // Handle model selection
  function handleSelectModel(modelId: string) {
    const model = models.find(m => m.id === modelId)
    if (model) {
      setSelectedModel(model)
      setShowSettingsModal(false)
    }
  }

  // Handle model connection from modal
  function handleConnectModelFromModal(modelId: string) {
    const model = models.find(m => m.id === modelId)
    if (model) {
      setModelToConnect(model)
      setShowConnectionModal(true)
      setShowSettingsModal(false)
    }
  }

  // Handle connection success
  function handleConnectionSuccess() {
    setShowConnectionModal(false)
    setModelToConnect(null)
    refetchModels()
  }

  return (
    <div className="h-full flex">
      {/* Collapsible Conversations Sidebar */}
      <motion.div
        className="border-r border-white/10 bg-black/50 flex flex-col"
        animate={{ width: sidebarCollapsed ? 0 : 280 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        {!sidebarCollapsed && (
          <div className="flex flex-col h-full">
            {/* New Chat Button */}
            <div className="p-4 border-b border-white/10">
              <button
                onClick={handleNewChat}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:scale-105 transition-all"
              >
                + New Chat
              </button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={`w-full p-3 rounded-lg hover:bg-white/10 transition-all text-left mb-1 ${
                    currentConversationId === conv.id ? 'bg-white/10' : ''
                  }`}
                >
                  <p className="text-sm font-medium text-white truncate">{conv.title}</p>
                  <p className="text-xs text-gray-400 truncate">{conv.timestamp}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Collapse Button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute left-[280px] top-24 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all z-10"
        style={{ left: sidebarCollapsed ? '0px' : '280px' }}
      >
        {sidebarCollapsed ? '→' : '←'}
      </button>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pt-20">
        {/* Page Content */}
        <div className="flex-1 overflow-hidden">
          {currentPage === 'chat' && (
            <div className="h-full flex flex-col p-6">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto mb-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      ✨
                    </motion.div>
                    <h1 className="text-4xl font-bold text-center mb-2">Welcome to ARCYN EYE</h1>
                    <p className="text-lg text-gray-400">Your unified AI interface</p>
                  </div>
                ) : (
                  <div className="space-y-4">
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
              </div>

              {/* Input Bar */}
              <div className="p-4 rounded-2xl flex gap-3 bg-white/5 border border-white/10 shadow-lg" style={{ backdropFilter: 'blur(12px)' }}>
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
              </div>
            </div>
          )}

          {currentPage === 'models' && <ModelsPage />}

          {currentPage === 'settings' && (
            <div className="h-full flex">
              {/* Settings Sidebar */}
              <div className="w-64 border-r border-white/10 p-4">
                <h2 className="text-lg font-bold text-white mb-4">Settings</h2>
                <div className="space-y-1">
                  {[
                    { id: 'profile', label: 'Profile', icon: User },
                    { id: 'account', label: 'Account', icon: Settings },
                    { id: 'preferences', label: 'Preferences', icon: Sliders },
                    { id: 'app', label: 'App Settings', icon: Cpu },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSettingsTab(tab.id as SettingsTab)}
                      className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                        settingsTab === tab.id
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings Content */}
              <div className="flex-1 p-8 overflow-y-auto">
                {settingsTab === 'profile' && <ProfileSettings />}
                {settingsTab === 'account' && <AccountSettings />}
                {settingsTab === 'preferences' && <Preferences />}
                {settingsTab === 'app' && <AppSettings />}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-white/10 p-4 flex justify-center gap-2">
          {[
            { id: 'chat', label: 'Chat', icon: Send },
            { id: 'models', label: 'Models', icon: Cpu },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((page) => (
            <button
              key={page.id}
              onClick={() => setCurrentPage(page.id as Page)}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                currentPage === page.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <page.icon className="w-5 h-5" />
              <span className="font-medium">{page.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModalV0
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        models={models}
        onSelectModel={handleSelectModel}
        onConnectModel={handleConnectModelFromModal}
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
