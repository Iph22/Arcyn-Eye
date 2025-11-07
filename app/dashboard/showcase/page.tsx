'use client'

import { GlassCard } from '@/components/ui/glass-card'
import { FloatingButton } from '@/components/ui/floating-button'
import { GlassInput } from '@/components/ui/glass-input'
import { Plus, Send, Settings, Sparkles, Zap, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { arcynTokens } from '@/lib/design-tokens'

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold text-white">
            iOS 26 Design System
          </h1>
          <p className="text-zinc-400 text-lg">
            Glass morphism components with spring physics animations
          </p>
        </motion.div>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-black border border-white/10" />
              <p className="text-sm text-zinc-400">Primary Black</p>
              <code className="text-xs text-cyan-400">#000000</code>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-cyan-500" />
              <p className="text-sm text-zinc-400">Accent Cyan</p>
              <code className="text-xs text-cyan-400">#06b6d4</code>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-white/5 border border-white/10" />
              <p className="text-sm text-zinc-400">Glass Surface</p>
              <code className="text-xs text-cyan-400">rgba(255,255,255,0.05)</code>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-purple-500/20 border border-purple-500/30" />
              <p className="text-sm text-zinc-400">Purple Accent</p>
              <code className="text-xs text-cyan-400">#a855f7</code>
            </div>
          </div>
        </section>

        {/* Glass Cards */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Glass Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard>
              <div className="space-y-3">
                <div className="text-4xl">🔷</div>
                <h3 className="text-lg font-semibold text-white">Static Card</h3>
                <p className="text-sm text-zinc-400">
                  Basic glass morphism card with subtle backdrop blur
                </p>
              </div>
            </GlassCard>

            <GlassCard hover>
              <div className="space-y-3">
                <div className="text-4xl">✨</div>
                <h3 className="text-lg font-semibold text-white">Hover Card</h3>
                <p className="text-sm text-zinc-400">
                  Scales up and lifts on hover with spring animation
                </p>
              </div>
            </GlassCard>

            <GlassCard hover onClick={() => alert('Clicked!')}>
              <div className="space-y-3">
                <div className="text-4xl">🎯</div>
                <h3 className="text-lg font-semibold text-white">Interactive Card</h3>
                <p className="text-sm text-zinc-400">
                  Clickable with tap animation feedback
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Floating Buttons */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Floating Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <FloatingButton
              icon={Plus}
              label="Primary"
              variant="primary"
              size="sm"
            />
            <FloatingButton
              icon={Send}
              label="Primary Medium"
              variant="primary"
              size="md"
            />
            <FloatingButton
              icon={Sparkles}
              label="Primary Large"
              variant="primary"
              size="lg"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <FloatingButton
              icon={Settings}
              label="Secondary"
              variant="secondary"
              size="sm"
            />
            <FloatingButton
              icon={Zap}
              label="Secondary Medium"
              variant="secondary"
              size="md"
            />
            <FloatingButton
              icon={Search}
              label="Secondary Large"
              variant="secondary"
              size="lg"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <FloatingButton icon={Plus} variant="primary" size="md" />
            <FloatingButton icon={Send} variant="primary" size="md" />
            <FloatingButton icon={Settings} variant="secondary" size="md" />
          </div>
        </section>

        {/* Glass Inputs */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Glass Inputs</h2>
          <div className="space-y-4 max-w-2xl">
            <GlassInput placeholder="Basic input..." />
            <GlassInput 
              placeholder="Input with icon..." 
              icon={<Search className="w-5 h-5" />}
            />
            <GlassInput 
              placeholder="Disabled input..." 
              disabled
            />
          </div>
        </section>

        {/* Animations */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Spring Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={arcynTokens.animations.spring}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <p className="text-white font-medium mb-2">Standard Spring</p>
              <code className="text-xs text-cyan-400">stiffness: 300, damping: 30</code>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={arcynTokens.animations.springBouncy}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <p className="text-white font-medium mb-2">Bouncy Spring</p>
              <code className="text-xs text-cyan-400">stiffness: 400, damping: 25</code>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={arcynTokens.animations.springGentle}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <p className="text-white font-medium mb-2">Gentle Spring</p>
              <code className="text-xs text-cyan-400">stiffness: 200, damping: 35</code>
            </motion.div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white">Heading 1</h1>
            <h2 className="text-4xl font-bold text-white">Heading 2</h2>
            <h3 className="text-3xl font-semibold text-white">Heading 3</h3>
            <h4 className="text-2xl font-semibold text-white">Heading 4</h4>
            <p className="text-base text-white">Body text - Primary</p>
            <p className="text-base text-zinc-400">Body text - Secondary</p>
            <p className="text-sm text-zinc-500">Small text - Tertiary</p>
            <p className="text-xs text-zinc-600">Extra small - Quaternary</p>
          </div>
        </section>

        {/* Spacing */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Spacing Scale</h2>
          <div className="space-y-3">
            {Object.entries(arcynTokens.spacing).map(([key, value]) => (
              <div key={key} className="flex items-center gap-4">
                <div 
                  className="bg-cyan-500 rounded" 
                  style={{ width: value, height: '24px' }}
                />
                <code className="text-sm text-zinc-400">{key}: {value}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(arcynTokens.radius).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div 
                  className="h-24 bg-white/5 border border-white/10"
                  style={{ borderRadius: value }}
                />
                <code className="text-sm text-zinc-400">{key}: {value}</code>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
