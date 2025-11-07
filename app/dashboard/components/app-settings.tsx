'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Database, Shield, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { FloatingButtonV0 } from '@/components/ui/floating-button-v0'

export function AppSettings() {
  const [apiCaching, setApiCaching] = useState(true)
  const [dataRetention, setDataRetention] = useState<'7' | '30' | '90' | 'forever'>('30')
  const [securityMode, setSecurityMode] = useState<'standard' | 'enhanced'>('standard')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const supabase = createClient()

  useEffect(() => {
    loadAppSettings()
  }, [])

  async function loadAppSettings() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setApiCaching(data.api_caching ?? true)
        setDataRetention(data.data_retention || '30')
        setSecurityMode(data.security_mode || 'standard')
      }
    } catch (error) {
      console.error('Error loading app settings:', error)
    }
  }

  async function handleSaveSettings() {
    setLoading(true)
    setMessage('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('app_settings')
        .upsert({
          user_id: user.id,
          api_caching: apiCaching,
          data_retention: dataRetention,
          security_mode: securityMode,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setMessage('Settings saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">App Settings</h3>
        <p className="text-sm text-gray-400">Configure application behavior</p>
      </div>

      <div className="space-y-4">
        {/* API Caching */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="font-medium text-white">API Response Caching</p>
                <p className="text-sm text-gray-400">Cache API responses for faster performance</p>
              </div>
            </div>
            <button
              onClick={() => setApiCaching(!apiCaching)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                apiCaching ? 'bg-cyan-500' : 'bg-white/10'
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                animate={{ x: apiCaching ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>

        {/* Data Retention */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="font-medium text-white">Data Retention</p>
              <p className="text-sm text-gray-400">How long to keep conversation history</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['7', '30', '90', 'forever'].map((days) => (
              <button
                key={days}
                onClick={() => setDataRetention(days as any)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  dataRetention === days
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {days === 'forever' ? 'Forever' : `${days} days`}
              </button>
            ))}
          </div>
        </div>

        {/* Security Mode */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="font-medium text-white">Security Mode</p>
              <p className="text-sm text-gray-400">Choose your security level</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSecurityMode('standard')}
              className={`p-3 rounded-lg text-left transition-all ${
                securityMode === 'standard'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <p className="font-medium text-sm">Standard</p>
              <p className="text-xs opacity-80">Balanced security</p>
            </button>
            <button
              onClick={() => setSecurityMode('enhanced')}
              className={`p-3 rounded-lg text-left transition-all ${
                securityMode === 'enhanced'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <p className="font-medium text-sm">Enhanced</p>
              <p className="text-xs opacity-80">Maximum security</p>
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-400">
            💡 Enhanced security mode requires additional authentication for sensitive operations.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <div>
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}
            >
              {message}
            </motion.p>
          )}
        </div>
        <FloatingButtonV0
          icon={Save}
          onClick={handleSaveSettings}
          variant="primary"
          size="md"
          disabled={loading}
          label={loading ? 'Saving...' : 'Save Settings'}
        />
      </div>
    </motion.div>
  )
}
