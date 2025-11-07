'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Send, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { FloatingButton } from '@/components/ui/floating-button'
import { GlassInput } from '@/components/ui/glass-input'
import { ModelSelector } from '@/components/chat/model-selector'
import { ChatMessage } from '@/components/chat/chat-message'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  model?: string
}

export function ChatInterface() {
  const [connectedModels, setConnectedModels] = useState<any[]>([])
  const [currentModel, setCurrentModel] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoadingModels, setIsLoadingModels] = useState(true)
  
  useEffect(() => {
    loadConnectedModels()
  }, [])
  
  async function loadConnectedModels() {
    try {
      setIsLoadingModels(true)
      const response = await fetch('/api/ai-connections')
      
      if (!response.ok) {
        throw new Error('Failed to load models')
      }
      
      const connections = await response.json()
      
      // Transform connections into usable model objects
      const models = Array.isArray(connections) ? connections.map((conn: any) => ({
        id: conn.model_name,
        name: conn.model_name.replace(/-/g, ' ').toUpperCase(),
        provider: conn.provider,
        icon: getModelIcon(conn.provider),
        connectionId: conn.id
      })) : []
      
      setConnectedModels(models)
      if (models.length > 0) {
        setCurrentModel(models[0])
      }
    } catch (error) {
      console.error('Failed to load models:', error)
      setError('Failed to load AI models. Please check your connection.')
    } finally {
      setIsLoadingModels(false)
    }
  }
  
  function getModelIcon(provider: string) {
    const icons: Record<string, string> = {
      openai: '🤖',
      anthropic: '🧠',
      google: '🔷',
      perplexity: '🔍',
      mistral: '🌪️'
    }
    return icons[provider] || '🤖'
  }
  
  async function sendMessage() {
    if (!inputValue.trim() || !currentModel) return
    
    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      id: Date.now()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    
    try {
      setError(null)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          model: currentModel.id,
          provider: currentModel.provider
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
        model: currentModel.name,
        id: Date.now() + 1
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error: any) {
      console.error('Failed to send message:', error)
      setError(error.message || 'Failed to send message. Please try again.')
      
      // Add error message to chat
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error.message || 'Failed to get response'}`,
        model: 'System',
        id: Date.now() + 1
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar - Hidden for now, will implement conversation history in Phase 3 */}
      {/* <div className="w-80 border-r border-white/10 p-4 space-y-4">
        <FloatingButton
          icon={Plus}
          label="New Chat"
          variant="primary"
          size="md"
          onClick={() => setMessages([])}
        />
      </div> */}
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between backdrop-blur-xl bg-black/50">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h1 className="text-lg font-semibold text-white">ARCYN EYE</h1>
          </div>
          
          {connectedModels.length > 0 && currentModel && (
            <ModelSelector
              models={connectedModels}
              currentModel={currentModel}
              onSelectModel={setCurrentModel}
            />
          )}
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4 max-w-md">
                <div className="text-6xl mb-6">✨</div>
                <h2 className="text-2xl font-bold text-white">
                  Welcome to ARCYN EYE
                </h2>
                <p className="text-zinc-400">
                  Your unified AI interface. Start a conversation with any connected model.
                </p>
                {connectedModels.length === 0 && (
                  <p className="text-sm text-cyan-400">
                    Connect your first AI model in settings to get started →
                  </p>
                )}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-zinc-400">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          )}
        </div>
        
        {/* Input */}
        <div className="p-6 border-t border-white/10 backdrop-blur-xl bg-black/50">
          <div className="flex items-end gap-3">
            <GlassInput
              placeholder="Message ARCYN EYE..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              className="flex-1"
              disabled={!currentModel}
            />
            <FloatingButton
              icon={Send}
              onClick={sendMessage}
              variant="primary"
              size="md"
              disabled={!inputValue.trim() || !currentModel || isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
