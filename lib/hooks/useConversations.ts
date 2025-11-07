import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'

interface Conversation {
  id: string
  title: string
  timestamp: string
  created_at?: string
  updated_at?: string
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  async function loadConversations() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) throw error

      // Transform timestamps for display
      const formatted = data?.map(conv => ({
        id: conv.id,
        title: conv.title || 'New Conversation',
        timestamp: formatDistanceToNow(new Date(conv.updated_at), { addSuffix: true }),
        created_at: conv.created_at,
        updated_at: conv.updated_at
      })) || []

      setConversations(formatted)
    } catch (error) {
      console.error('Error loading conversations:', error)
      setConversations([])
    } finally {
      setLoading(false)
    }
  }

  async function createConversation() {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({ title: 'New Conversation' })
        .select()
        .single()

      if (error) throw error

      await loadConversations()
      return data
    } catch (error) {
      console.error('Error creating conversation:', error)
      return null
    }
  }

  async function deleteConversation(id: string) {
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id)

      if (error) throw error

      await loadConversations()
    } catch (error) {
      console.error('Error deleting conversation:', error)
    }
  }

  useEffect(() => {
    loadConversations()
  }, [])

  return {
    conversations,
    loading,
    createConversation,
    deleteConversation,
    refetch: loadConversations
  }
}
