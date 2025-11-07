'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/glass-card'
import { FloatingButton } from '@/components/ui/floating-button'
import { Plus, Check, AlertCircle, Settings, Zap } from 'lucide-react'
import { AI_MODELS, getModelsByConnectionType, AIModel } from '@/lib/ai-models/model-registry'
import { ModelConnectionModal } from '@/components/settings/model-connection-modal'

export default function SettingsPage() {
  const [connectedModels, setConnectedModels] = useState<any[]>([])
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const { auto, oauth, apiKey } = getModelsByConnectionType()
  
  useEffect(() => {
    loadConnections()
  }, [])
  
  async function loadConnections() {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/ai-connections')
      
      if (!response.ok) {
        throw new Error('Failed to load connections')
      }
      
      const data = await response.json()
      setConnectedModels(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load connections:', error)
      setError('Failed to load connections. Please check if database migration is complete.')
      setConnectedModels([])
    } finally {
      setIsLoading(false)
    }
  }
  
  function isConnected(modelId: string) {
    return connectedModels.some(c => c.model_name === modelId)
  }
  
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 text-sm">{error}</p>
              <button
                onClick={loadConnections}
                className="text-red-400 text-xs underline mt-1 hover:text-red-300"
              >
                Try again
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold text-white">AI Models</h1>
          <p className="text-zinc-400">
            Manage your AI model connections. Models linked to your Google account 
            are automatically connected.
          </p>
        </motion.div>
        
        {/* Auto-Connected Models */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Auto-Connected</h2>
              <p className="text-sm text-zinc-500">Linked to your Google account</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auto.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isConnected={true}
                badge="Auto"
                badgeColor="green"
              />
            ))}
          </div>
        </section>
        
        {/* Quick Connect (OAuth) */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Quick Connect</h2>
              <p className="text-sm text-zinc-500">Connect with one click</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oauth.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isConnected={isConnected(model.id)}
                onConnect={() => {
                  setSelectedModel(model)
                  setIsModalOpen(true)
                }}
              />
            ))}
          </div>
        </section>
        
        {/* Manual Connection (API Key) */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Settings className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Connect Manually</h2>
              <p className="text-sm text-zinc-500">Add using API keys</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiKey.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isConnected={isConnected(model.id)}
                onConnect={() => {
                  setSelectedModel(model)
                  setIsModalOpen(true)
                }}
              />
            ))}
          </div>
        </section>
      </div>
      
      {/* Connection Modal */}
      {selectedModel && (
        <ModelConnectionModal
          model={selectedModel}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedModel(null)
          }}
          onSuccess={() => {
            loadConnections()
            setIsModalOpen(false)
            setSelectedModel(null)
          }}
        />
      )}
    </div>
  )
}

interface ModelCardProps {
  model: AIModel
  isConnected: boolean
  onConnect?: () => void
  badge?: string
  badgeColor?: string
}

function ModelCard({ model, isConnected, onConnect, badge, badgeColor }: ModelCardProps) {
  return (
    <GlassCard hover={!isConnected} onClick={!isConnected ? onConnect : undefined}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="text-4xl">{model.icon}</div>
          {badge && (
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${badgeColor === 'green' ? 'bg-green-500/20 text-green-400' : ''}
            `}>
              {badge}
            </span>
          )}
          {isConnected && !badge && (
            <Check className="w-5 h-5 text-green-500" />
          )}
        </div>
        
        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {model.name}
          </h3>
          <p className="text-sm text-zinc-400 mb-3">
            {model.description}
          </p>
          
          {/* Capabilities */}
          <div className="flex flex-wrap gap-2">
            {model.capabilities.slice(0, 3).map((cap: string) => (
              <span 
                key={cap}
                className="px-2 py-1 rounded-lg bg-white/5 text-xs text-zinc-400"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
        
        {/* Action */}
        {!isConnected && (
          <FloatingButton
            icon={Plus}
            label="Connect"
            variant="secondary"
            size="sm"
          />
        )}
      </div>
    </GlassCard>
  )
}
