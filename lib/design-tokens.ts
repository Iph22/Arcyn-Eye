export const arcynTokens = {
  colors: {
    // Backgrounds
    bg: {
      primary: '#000000',           // Pure black
      secondary: '#0a0a0a',         // Near black
      elevated: '#141414',          // Elevated surfaces
      hover: '#1a1a1a',             // Hover state
      glass: 'rgba(255,255,255,0.03)', // Glass base
      glassHover: 'rgba(255,255,255,0.06)',
    },
    
    // Text
    text: {
      primary: '#ffffff',           // Pure white
      secondary: '#a1a1aa',         // Zinc-400
      tertiary: '#71717a',          // Zinc-500
      quaternary: '#52525b',        // Zinc-600
    },
    
    // Accents
    accent: {
      cyan: '#06b6d4',              // Primary brand
      cyanHover: '#22d3ee',
      blue: '#3b82f6',
      purple: '#a855f7',
      green: '#10b981',             // Success
      red: '#ef4444',               // Error
      yellow: '#f59e0b',            // Warning
    },
    
    // Borders
    border: {
      subtle: 'rgba(255,255,255,0.08)',
      glass: 'rgba(255,255,255,0.12)',
      focus: 'rgba(6,182,212,0.5)',
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  
  radius: {
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 2px 8px rgba(0,0,0,0.3)',
    md: '0 4px 16px rgba(0,0,0,0.4)',
    lg: '0 8px 32px rgba(0,0,0,0.5)',
    xl: '0 16px 48px rgba(0,0,0,0.6)',
    glow: '0 0 20px rgba(6,182,212,0.3)',
  },
  
  animations: {
    // Spring physics (iOS-style)
    spring: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30
    },
    springBouncy: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25
    },
    springGentle: {
      type: "spring" as const,
      stiffness: 200,
      damping: 35
    }
  }
}
