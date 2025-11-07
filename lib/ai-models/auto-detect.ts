import { createClient } from '@/lib/supabase/server'
import { AI_MODELS } from './model-registry'

export async function detectGoogleAIServices(userId: string) {
  const supabase = await createClient()
  
  // When user signs in with Google, we automatically have access to:
  // 1. Basic Gemini (free tier)
  // 2. Check if they have Google One AI Premium (Gemini Advanced)
  
  const autoConnections: Array<{
    provider: string
    model_name: string
    connection_type: string
    status: string
    subscription_tier: string
  }> = []
  
  // Always add free Gemini
  autoConnections.push({
    provider: 'google',
    model_name: 'gemini-pro',
    connection_type: 'auto',
    status: 'active',
    subscription_tier: 'free'
  })
  
  // TODO: Check for Gemini Advanced subscription
  // This would require additional Google API calls
  // For now, we'll add it as a "connect" option
  
  // Insert auto-detected connections
  for (const conn of autoConnections) {
    await supabase
      .from('ai_connections')
      .upsert({
        user_id: userId,
        ...conn
      }, {
        onConflict: 'user_id,provider,model_name'
      })
  }
  
  return autoConnections
}
