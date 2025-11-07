'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Plus } from 'lucide-react'
import { useModels } from '@/lib/hooks/useModels'
import { ModelCardV0 } from '@/components/settings/model-card-v0'
import { ModelConnectionModal } from '@/components/settings/model-connection-modal'

export function ModelsPage() {
  const { models, loading, refetch } = useModels()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'auto' | 'connect' | 'manual'>('all')
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const [modelToConnect, setModelToConnect] = useState<any>(null)

  // Filter models based on search and status
  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || model.status === filterStatus
    return matchesSearch && matchesFilter
  })

  // Group models by status
  const autoConnectedModels = filteredModels.filter(m => m.status === 'auto')
  const quickConnectModels = filteredModels.filter(m => m.status === 'connect')
  const manualModels = filteredModels.filter(m => m.status === 'manual')

  function handleConnectModel(modelId: string) {
    const model = models.find(m => m.id === modelId)
    if (model) {
      setModelToConnect(model)
      setShowConnectionModal(true)
    }
  }

  function handleConnectionSuccess() {
    setShowConnectionModal(false)
    setModelToConnect(null)
    refetch()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-cyan-400 text-lg">Loading models...</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white mb-2">AI Models</h1>
        <p className="text-gray-400">Manage your connected AI models</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="p-6 border-b border-white/10 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search models..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
            {['all', 'auto', 'connect', 'manual'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  filterStatus === status
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <div className="ml-auto text-sm text-gray-400">
            {filteredModels.length} model{filteredModels.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Models List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Auto-Connected Models */}
        {autoConnectedModels.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-400">✓</span>
              <h3 className="text-lg font-semibold text-white">Auto-Connected Models</h3>
              <span className="text-sm text-gray-400">({autoConnectedModels.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {autoConnectedModels.map((model, idx) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ModelCardV0 model={model} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Quick Connect Models */}
        {quickConnectModels.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span>⚡</span>
              <h3 className="text-lg font-semibold text-white">Quick Connect</h3>
              <span className="text-sm text-gray-400">({quickConnectModels.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {quickConnectModels.map((model, idx) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ModelCardV0
                      model={model}
                      buttonText="Connect"
                      onConnect={() => handleConnectModel(model.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Manual Connection Models */}
        {manualModels.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-white" />
              <h3 className="text-lg font-semibold text-white">Manual Connection</h3>
              <span className="text-sm text-gray-400">({manualModels.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {manualModels.map((model, idx) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ModelCardV0
                      model={model}
                      buttonText="Add API Key"
                      onConnect={() => handleConnectModel(model.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredModels.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No models found</h3>
            <p className="text-gray-400">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      {/* Connection Modal */}
      {modelToConnect && (
        <ModelConnectionModal
          model={modelToConnect}
          isOpen={showConnectionModal}
          onClose={() => {
            setShowConnectionModal(false)
            setModelToConnect(null)
          }}
          onSuccess={handleConnectionSuccess}
        />
      )}
    </motion.div>
  )
}
