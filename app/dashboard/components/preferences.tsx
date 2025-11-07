'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Bell, Volume2, Save } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { FloatingButtonV0 } from '@/components/ui/floating-button-v0'

export function Preferences() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [notifications, setNotifications] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const supabase = createClient()

  useEffect(() => {
    loadPreferences()
  }, [])

  async function loadPreferences() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setTheme(data.theme || 'dark')
        setNotifications(data.notifications ?? true)
        setSoundEffects(data.sound_effects ?? true)
        setAutoSave(data.auto_save ?? true)
      }
    } catch (error) {
      console.error('Error loading preferences:', error)
    }
  }

  async function handleSavePreferences() {
    setLoading(true)
    setMessage('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          theme,
          notifications,
          sound_effects: soundEffects,
          auto_save: autoSave,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setMessage('Preferences saved successfully!')
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
        <h3 className="text-lg font-semibold text-white mb-2">Preferences</h3>
        <p className="text-sm text-gray-400">Customize your experience</p>
      </div>

      <div className="space-y-4">
        {/* Theme Selection */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-cyan-400" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
              <div>
                <p className="font-medium text-white">Theme</p>
                <p className="text-sm text-gray-400">Choose your preferred theme</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                theme === 'light'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                theme === 'dark'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="font-medium text-white">Notifications</p>
                <p className="text-sm text-gray-400">Receive updates and alerts</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-cyan-500' : 'bg-white/10'
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                animate={{ x: notifications ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>

        {/* Sound Effects Toggle */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="font-medium text-white">Sound Effects</p>
                <p className="text-sm text-gray-400">Play sounds for interactions</p>
              </div>
            </div>
            <button
              onClick={() => setSoundEffects(!soundEffects)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                soundEffects ? 'bg-cyan-500' : 'bg-white/10'
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                animate={{ x: soundEffects ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>

        {/* Auto-Save Toggle */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Save className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="font-medium text-white">Auto-Save</p>
                <p className="text-sm text-gray-400">Automatically save conversations</p>
              </div>
            </div>
            <button
              onClick={() => setAutoSave(!autoSave)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                autoSave ? 'bg-cyan-500' : 'bg-white/10'
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
                animate={{ x: autoSave ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
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
          onClick={handleSavePreferences}
          variant="primary"
          size="md"
          disabled={loading}
          label={loading ? 'Saving...' : 'Save Preferences'}
        />
      </div>
    </motion.div>
  )
}
