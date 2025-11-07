import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Message {
  role: 'user' | 'assistant'
  content: string
  id?: string
  model_used?: string
}

export function useChat(conversationId: string | null, currentModel: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function sendMessage(content: string) {
    if (!content.trim() || !conversationId) return

    // Add user message
    const userMsg: Message = { role: 'user', content }
    setMessages(prev => [...prev, userMsg])

    // Save user message to database
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      role: 'user',
      content
    })

    setLoading(true)
    try {
      // Get AI response from API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          model: currentModel,
          provider: getProviderFromModel(currentModel)
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      // Add AI message
      const aiMsg: Message = {
        role: 'assistant',
        content: data.response,
        model_used: currentModel
      }
      setMessages(prev => [...prev, aiMsg])

      // Save AI message to database
      await supabase.from('messages').insert({
        conversation_id: conversationId,
        role: 'assistant',
        content: data.response,
        model_used: currentModel
      })

      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId)
    } catch (error) {
      console.error('Chat error:', error)
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setLoading(false)
    }
  }

  async function loadMessages() {
    if (!conversationId) return

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) throw error

      setMessages(data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  useEffect(() => {
    if (conversationId) {
      loadMessages()
    } else {
      setMessages([])
    }
  }, [conversationId])

  return { messages, loading, sendMessage, loadMessages }
}

function getProviderFromModel(modelName: string): string {
  if (modelName.startsWith('gpt')) return 'openai'
  if (modelName.startsWith('claude')) return 'anthropic'
  if (modelName.startsWith('gemini')) return 'google'
  if (modelName.startsWith('perplexity')) return 'perplexity'
  if (modelName.startsWith('mistral')) return 'mistral'
  return 'openai' // default
}
