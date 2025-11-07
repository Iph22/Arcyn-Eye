export interface AIModel {
  id: string
  name: string
  icon: string
  description: string
  status: 'auto' | 'connect' | 'manual'
  badges?: string[]
  provider?: string
  connectionId?: string
}

export interface Conversation {
  id: string
  title: string
  timestamp: string
  created_at?: string
  updated_at?: string
  user_id?: string
}

export interface Message {
  id?: string
  conversation_id?: string
  role: 'user' | 'assistant'
  content: string
  model_used?: string
  provider?: string
  tokens_used?: number
  created_at?: string
}

export interface AIConnection {
  id: string
  user_id: string
  provider: string
  model_name: string
  connection_type: 'auto' | 'oauth' | 'api_key'
  api_key_encrypted?: string
  status: 'active' | 'inactive' | 'error'
  subscription_tier?: string
  created_at: string
  updated_at: string
}
