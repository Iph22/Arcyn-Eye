'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Check, AlertCircle } from 'lucide-react'
import { GlassInput } from '@/components/ui/glass-input'
import { FloatingButton } from '@/components/ui/floating-button'
import { arcynTokens } from '@/lib/design-tokens'

interface ModelConnectionModalProps {
  model: any
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function ModelConnectionModal({
  model,
  isOpen,
  onClose,
  onSuccess
}: ModelConnectionModalProps) {
  const [apiKey, setApiKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  
  const apiKeyUrls: Record<string, string> = {
    openai: 'https://platform.openai.com/api-keys',
    anthropic: 'https://console.anthropic.com/settings/keys',
    google: 'https://makersuite.google.com/app/apikey',
    perplexity: 'https://www.perplexity.ai/settings/api',
    mistral: 'https://console.mistral.ai/api-keys/',
  }
  
  async function testConnection() {
    setTestStatus('testing')
    setError('')
    
    try {
      const response = await fetch('/api/ai-connections/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: model.provider,
          model_name: model.id,
          api_key: apiKey
        })
      })
      
      if (!response.ok) {
        throw new Error('Connection test failed')
      }
      
      setTestStatus('success')
    } catch (err) {
      setTestStatus('error')
      setError('Failed to connect. Please check your API key.')
    }
  }
  
  async function saveConnection() {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/ai-connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: model.provider,
          model_name: model.id,
          api_key: apiKey,
          connection_type: 'api_key'
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to save connection')
      }
      
      onSuccess()
    } catch (err) {
      setError('Failed to save connection. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={arcynTokens.animations.spring}
              className="w-full max-w-md"
            >
              <div className="backdrop-blur-2xl bg-zinc-900/90 border border-white/10 rounded-3xl p-8 shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Connect {model.name}
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Add your API key to start using this model
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Steps */}
                <div className="space-y-6">
                  {/* Step 1: Get API Key */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs font-bold text-cyan-400">
                        1
                      </div>
                      <h3 className="text-sm font-semibold text-white">Get your API key</h3>
                    </div>
                    <a
                      href={apiKeyUrls[model.provider]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                    >
                      <span className="text-sm text-zinc-300 flex-1">
                        Open {model.provider} dashboard
                      </span>
                      <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  </div>
                  
                  {/* Step 2: Enter API Key */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs font-bold text-cyan-400">
                        2
                      </div>
                      <h3 className="text-sm font-semibold text-white">Enter your API key</h3>
                    </div>
                    <GlassInput
                      type="password"
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                  
                  {/* Step 3: Test Connection */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs font-bold text-cyan-400">
                        3
                      </div>
                      <h3 className="text-sm font-semibold text-white">Test connection</h3>
                    </div>
                    <button
                      onClick={testConnection}
                      disabled={!apiKey || testStatus === 'testing'}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {testStatus === 'testing' && 'Testing...'}
                      {testStatus === 'success' && '✓ Connection successful'}
                      {testStatus === 'error' && '✗ Connection failed'}
                      {testStatus === 'idle' && 'Test Connection'}
                    </button>
                  </div>
                  
                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-300">{error}</p>
                    </motion.div>
                  )}
                  
                  {/* Success Message */}
                  {testStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                    >
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-300">
                        Connection successful! You can now save and start using {model.name}.
                      </p>
                    </motion.div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveConnection}
                    disabled={testStatus !== 'success' || isLoading}
                    className="flex-1 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-cyan-500"
                  >
                    {isLoading ? 'Saving...' : 'Save & Connect'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
