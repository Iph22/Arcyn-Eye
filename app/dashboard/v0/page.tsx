"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { FloatingNav } from "@/components/navigation/floating-nav"
import { ConversationSidebar } from "@/components/chat/conversation-sidebar"
import { ChatMessageV0 } from "@/components/chat/chat-message-v0"
import { SettingsModalV0 } from "@/components/settings/settings-modal-v0"
import { ModelConnectionModal } from "@/components/settings/model-connection-modal"
import { FloatingButtonV0 } from "@/components/ui/floating-button-v0"
import { AIModel, Conversation, Message } from "@/types/models"
import { transformConnectionToModel, formatTimestamp } from "@/lib/model-utils"

export default function DashboardV0Page() {
  const [showSettings, setShowSettings] = useState(false)
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const [modelToConnect, setModelToConnect] = useState<AIModel | null>(null)
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null)
  const [models, setModels] = useState<AIModel[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingModels, setIsLoadingModels] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  // Load connected models from backend
  useEffect(() => {
    loadModels()
  }, [])

  // Load conversations
  useEffect(() => {
    loadConversations()
  }, [])

  async function loadModels() {
    try {
      setIsLoadingModels(true)
      const response = await fetch('/api/ai-connections')
      
      if (!response.ok) {
        throw new Error('Failed to load models')
      }
      
      const connections = await response.json()
      
      // Transform connections to AIModel format
      const transformedModels = Array.isArray(connections) 
        ? connections.map(transformConnectionToModel)
        : []
      
      setModels(transformedModels)
      
      // Set first model as selected if none selected
      if (transformedModels.length > 0 && !selectedModel) {
        setSelectedModel(transformedModels[0])
      }
    } catch (error) {
      console.error('Failed to load models:', error)
      setError('Failed to load AI models. Please check your connection.')
    } finally {
      setIsLoadingModels(false)
    }
  }

  async function loadConversations() {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(20)
      
      if (error) throw error
      
      const formattedConversations: Conversation[] = (data || []).map(conv => ({
        id: conv.id,
        title: conv.title || 'New Conversation',
        timestamp: formatTimestamp(conv.updated_at || conv.created_at),
        created_at: conv.created_at,
        updated_at: conv.updated_at,
      }))
      
      setConversations(formattedConversations)
    } catch (error) {
      console.error('Failed to load conversations:', error)
    }
  }

  async function loadConversation(conversationId: string) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
      
      if (error) throw error
      
      setMessages(data || [])
      setCurrentConversationId(conversationId)
    } catch (error) {
      console.error('Failed to load conversation:', error)
      setError('Failed to load conversation')
    }
  }

  async function createNewChat() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('conversations')
        .insert({ 
          user_id: user.id,
          title: 'New Conversation' 
        })
        .select()
        .single()
      
      if (error) throw error
      
      setCurrentConversationId(data.id)
      setMessages([])
      setInput("")
      
      // Reload conversations to show the new one
      loadConversations()
    } catch (error) {
      console.error('Failed to create conversation:', error)
      setError('Failed to create new chat')
    }
  }

  async function handleSendMessage() {
    if (!input.trim() || !selectedModel || isLoading) return
    
    // Create conversation if none exists
    if (!currentConversationId) {
      await createNewChat()
      // Wait a bit for conversation to be created
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    const userMessage: Message = {
      role: 'user',
      content: input,
    }
    
    setMessages(prev => [...prev, userMessage])
    const userInput = input
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      // Save user message to database
      if (currentConversationId) {
        await supabase.from('messages').insert({
          conversation_id: currentConversationId,
          role: 'user',
          content: userInput,
        })
      }

      // Get AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userInput,
          model: selectedModel.id,
          provider: selectedModel.provider,
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get response')
      }
      
      const data = await response.json()
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'No response received',
        model_used: selectedModel.name,
      }
      
      setMessages(prev => [...prev, assistantMessage])

      // Save AI message to database
      if (currentConversationId) {
        await supabase.from('messages').insert({
          conversation_id: currentConversationId,
          role: 'assistant',
          content: data.response,
          model_used: selectedModel.id,
          provider: selectedModel.provider,
        })

        // Update conversation timestamp
        await supabase
          .from('conversations')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', currentConversationId)
      }
    } catch (error: any) {
      console.error('Failed to send message:', error)
      setError(error.message || 'Failed to send message')
      
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error.message || 'Failed to get response'}`,
        model_used: 'System',
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  function handleSelectModel(modelId: string) {
    const model = models.find(m => m.id === modelId)
    if (model) {
      setSelectedModel(model)
      setShowSettings(false)
    }
  }

  function handleConnectModel(modelId: string) {
    const model = models.find(m => m.id === modelId)
    if (model) {
      setModelToConnect(model)
      setShowConnectionModal(true)
      setShowSettings(false)
    }
  }

  function handleConnectionSuccess() {
    setShowConnectionModal(false)
    setModelToConnect(null)
    // Reload models to show the newly connected one
    loadModels()
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
          onNewChat={createNewChat}
          onSelectConversation={loadConversation}
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
                  {messages.map((msg, idx) => (
                    <ChatMessageV0
                      key={idx}
                      role={msg.role}
                      content={msg.content}
                      model={msg.model_used}
                    />
                  ))}
                </AnimatePresence>
                
                {isLoading && (
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
            style={{ backdropFilter: "blur(12px)" }}
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
              disabled={!selectedModel || isLoading}
            />
            <FloatingButtonV0
              icon={Send}
              onClick={handleSendMessage}
              variant="primary"
              size="md"
              disabled={!input.trim() || !selectedModel || isLoading}
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
