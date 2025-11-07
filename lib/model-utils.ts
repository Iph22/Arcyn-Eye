import { AIModel, AIConnection } from '@/types/models'

export function getModelIcon(provider: string): string {
  const icons: Record<string, string> = {
    openai: '🤖',
    anthropic: '🧠',
    google: '🔷',
    perplexity: '🔍',
    mistral: '🌪️',
  }
  return icons[provider] || '🤖'
}

export function formatModelName(modelName: string): string {
  // Convert 'gpt-4' to 'GPT-4', 'gemini-pro' to 'Gemini Pro'
  return modelName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function getModelDescription(provider: string, modelName: string): string {
  const descriptions: Record<string, Record<string, string>> = {
    openai: {
      'gpt-4': "OpenAI's most advanced model",
      'gpt-3.5-turbo': 'Fast and efficient GPT model',
    },
    anthropic: {
      'claude-3-opus': 'Most powerful Claude model',
      'claude-3-sonnet': 'Balanced performance and speed',
      'claude-3-haiku': 'Fastest Claude model',
      'claude-3.5-sonnet': 'Latest and most capable',
    },
    google: {
      'gemini-pro': "Google's most capable AI",
      'gemini-advanced': 'Premium Gemini experience',
    },
    perplexity: {
      'sonar': 'Real-time search AI',
    },
    mistral: {
      'mistral-large': 'Fast and efficient AI',
    },
  }

  return descriptions[provider]?.[modelName] || 'AI model'
}

export function getModelBadges(modelName: string): string[] {
  const badges: Record<string, string[]> = {
    'gpt-4': ['Powerful', 'Creative'],
    'gpt-3.5-turbo': ['Fast', 'Efficient'],
    'claude-3-opus': ['Smart', 'Careful'],
    'claude-3-sonnet': ['Balanced', 'Reliable'],
    'claude-3-haiku': ['Quick', 'Efficient'],
    'claude-3.5-sonnet': ['Latest', 'Advanced'],
    'gemini-pro': ['Fast', 'Accurate'],
    'gemini-advanced': ['Premium', 'Advanced'],
    'sonar': ['Updated', 'Research'],
    'mistral-large': ['Quick', 'Efficient'],
  }

  return badges[modelName] || []
}

export function getProviderFromModelId(modelId: string): string {
  if (modelId.startsWith('gpt')) return 'openai'
  if (modelId.startsWith('claude')) return 'anthropic'
  if (modelId.startsWith('gemini')) return 'google'
  if (modelId.startsWith('sonar')) return 'perplexity'
  if (modelId.startsWith('mistral')) return 'mistral'
  return 'unknown'
}

export function transformConnectionToModel(connection: AIConnection): AIModel {
  return {
    id: connection.model_name,
    name: formatModelName(connection.model_name),
    icon: getModelIcon(connection.provider),
    description: getModelDescription(connection.provider, connection.model_name),
    status: connection.connection_type === 'auto' ? 'auto' : 
            connection.connection_type === 'oauth' ? 'connect' : 'manual',
    badges: getModelBadges(connection.model_name),
    provider: connection.provider,
    connectionId: connection.id,
  }
}

export function formatTimestamp(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  
  return then.toLocaleDateString()
}
