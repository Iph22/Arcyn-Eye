import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface AIModel {
  id: string
  name: string
  icon: string
  description: string
  status: 'auto' | 'connect' | 'manual'
  badges?: string[]
  provider?: string
}

// Map of provider to icon
const PROVIDER_ICONS: Record<string, string> = {
  openai: '🤖',
  anthropic: '🧠',
  google: '🔷',
  perplexity: '🔍',
  mistral: '🌪️',
  llama: '🦙',
  cohere: '⚙️',
  palm: '🌴'
}

// Map of model names to descriptions
const MODEL_DESCRIPTIONS: Record<string, string> = {
  'gpt-4': 'OpenAI\'s most advanced model with exceptional reasoning',
  'gpt-3.5-turbo': 'Fast and efficient for most tasks',
  'claude-3-opus': 'Anthropic\'s most powerful model for nuanced understanding',
  'claude-3-sonnet': 'Balanced performance and speed',
  'claude-3-haiku': 'Fast and efficient',
  'gemini-pro': 'Google\'s most capable AI model for complex tasks',
  'gemini-advanced': 'Ultra-capable with Google One AI Premium',
  'perplexity-sonar': 'Real-time search and reasoning capabilities'
}

export function useModels() {
  const [models, setModels] = useState<AIModel[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  async function loadModels() {
    setLoading(true)
    try {
      // Fetch from Supabase
      const { data: connections, error } = await supabase
        .from('ai_connections')
        .select('*')

      if (error) throw error

      // Transform database format to UI format
      const transformedModels: AIModel[] = connections?.map(conn => ({
        id: conn.model_name,
        name: formatModelName(conn.model_name),
        icon: PROVIDER_ICONS[conn.provider] || '🤖',
        description: MODEL_DESCRIPTIONS[conn.model_name] || `${conn.provider} AI model`,
        status: mapConnectionType(conn.connection_type),
        badges: getModelBadges(conn.model_name),
        provider: conn.provider
      })) || []

      setModels(transformedModels)
    } catch (error) {
      console.error('Error loading models:', error)
      setModels([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadModels()
  }, [])

  return { models, loading, refetch: loadModels }
}

function formatModelName(name: string): string {
  // Convert 'gpt-4' to 'GPT-4'
  return name
    .split('-')
    .map(word => word.toUpperCase())
    .join('-')
}

function mapConnectionType(type: string): 'auto' | 'connect' | 'manual' {
  if (type === 'auto') return 'auto'
  if (type === 'oauth') return 'connect'
  return 'manual'
}

function getModelBadges(modelName: string): string[] {
  const badges: Record<string, string[]> = {
    'gpt-4': ['Powerful', 'Creative'],
    'gpt-3.5-turbo': ['Fast', 'Efficient'],
    'claude-3-opus': ['Smart', 'Careful'],
    'claude-3-sonnet': ['Balanced', 'Fast'],
    'gemini-pro': ['Fast', 'Accurate'],
    'gemini-advanced': ['Advanced', 'Premium'],
    'perplexity-sonar': ['Updated', 'Research']
  }
  return badges[modelName] || ['AI']
}
