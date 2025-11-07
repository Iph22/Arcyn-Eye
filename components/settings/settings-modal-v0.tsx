'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Settings as Gear } from 'lucide-react'
import { ModelCardV0 } from './model-card-v0'

interface Model {
  id: string
  name: string
  icon: string
  description: string
  status: 'auto' | 'connect' | 'manual'
  badges?: string[]
}

interface SettingsModalV0Props {
  isOpen: boolean
  onClose: () => void
  models: Model[]
  onSelectModel?: (modelId: string) => void
  onConnectModel?: (modelId: string) => void
}

export function SettingsModalV0({
  isOpen,
  onClose,
  models,
  onSelectModel,
  onConnectModel,
}: SettingsModalV0Props) {
  const autoConnectedModels = models.filter((m) => m.status === 'auto')
  const quickConnectModels = models.filter((m) => m.status === 'connect')
  const manualModels = models.filter((m) => m.status === 'manual')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            style={{ backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div
              className="w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 bg-white/5 border border-white/10 shadow-2xl"
              style={{ backdropFilter: "blur(12px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Model Management</h2>
                <motion.button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Auto-Connected Models */}
              {autoConnectedModels.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-green-400">✓</span>
                    <h3 className="text-lg font-semibold text-white">Auto-Connected Models</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {autoConnectedModels.map((model) => (
                      <ModelCardV0
                        key={model.id}
                        model={model}
                        onSelect={() => onSelectModel?.(model.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Connect Models */}
              {quickConnectModels.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span>⚡</span>
                    <h3 className="text-lg font-semibold text-white">Quick Connect</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickConnectModels.map((model) => (
                      <ModelCardV0
                        key={model.id}
                        model={model}
                        buttonText="Connect"
                        onConnect={() => onConnectModel?.(model.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Connection Models */}
              {manualModels.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Gear className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-semibold text-white">Manual Connection</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {manualModels.map((model) => (
                      <ModelCardV0
                        key={model.id}
                        model={model}
                        buttonText="Add API Key"
                        onConnect={() => onConnectModel?.(model.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
