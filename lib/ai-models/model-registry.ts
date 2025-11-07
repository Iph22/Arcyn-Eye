export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  icon: string // emoji or icon name
  capabilities: string[]
  connectionType: 'auto' | 'oauth' | 'api_key'
  tier?: 'free' | 'plus' | 'pro' | 'advanced'
  popular?: boolean
}

export const AI_MODELS: AIModel[] = [
  // Auto-connectable (via Google)
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'google',
    description: 'Google\'s most capable AI model',
    icon: '🔷',
    capabilities: ['text', 'vision', 'code'],
    connectionType: 'auto',
    tier: 'free',
    popular: true
  },
  {
    id: 'gemini-advanced',
    name: 'Gemini Advanced',
    provider: 'google',
    description: 'Ultra-capable with Google One AI Premium',
    icon: '💎',
    capabilities: ['text', 'vision', 'code', 'advanced-reasoning'],
    connectionType: 'auto',
    tier: 'advanced',
    popular: true
  },
  
  // OAuth-connectable (1-click)
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    description: 'OpenAI\'s most advanced model',
    icon: '🤖',
    capabilities: ['text', 'vision', 'code', 'reasoning'],
    connectionType: 'oauth',
    tier: 'plus',
    popular: true
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    description: 'Fast and efficient',
    icon: '⚡',
    capabilities: ['text', 'code'],
    connectionType: 'api_key',
    tier: 'free',
    popular: true
  },
  
  // API Key only
  {
    id: 'claude-3-opus-20240229',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    description: 'Most powerful Claude model',
    icon: '🧠',
    capabilities: ['text', 'vision', 'code', 'long-context'],
    connectionType: 'api_key',
    tier: 'pro',
    popular: true
  },
  {
    id: 'claude-3-5-sonnet-20241022',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    description: 'Balanced performance and speed',
    icon: '⚡',
    capabilities: ['text', 'vision', 'code'],
    connectionType: 'api_key',
    tier: 'pro',
    popular: true
  },
  {
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    description: 'Fast and efficient',
    icon: '🏃',
    capabilities: ['text', 'code'],
    connectionType: 'api_key',
    tier: 'free'
  },
  
  // Additional models
  {
    id: 'perplexity-sonar',
    name: 'Perplexity Sonar',
    provider: 'perplexity',
    description: 'Real-time web search AI',
    icon: '🔍',
    capabilities: ['text', 'web-search'],
    connectionType: 'api_key',
    tier: 'pro'
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'mistral',
    description: 'Powerful open-source model',
    icon: '🌪️',
    capabilities: ['text', 'code'],
    connectionType: 'api_key',
    tier: 'free'
  },
]

// Group by connection type
export const getModelsByConnectionType = () => {
  return {
    auto: AI_MODELS.filter(m => m.connectionType === 'auto'),
    oauth: AI_MODELS.filter(m => m.connectionType === 'oauth'),
    apiKey: AI_MODELS.filter(m => m.connectionType === 'api_key'),
  }
}
