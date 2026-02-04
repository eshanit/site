module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        '6xl': ['2.5rem', { lineHeight: '1.1' }],
        '5xl': ['2.25rem', { lineHeight: '1.15' }],
        '4xl': ['2rem', { lineHeight: '1.2' }],
        '3xl': ['1.75rem', { lineHeight: '1.25' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        'xl': ['1.25rem', { lineHeight: '1.4' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'xs': ['0.75rem', { lineHeight: '1.5' }],
      },
      colors: {
        // Custom dark mode colors
        dark: {
          900: '#0f172a', // Very dark blue
          800: '#1e293b', // Dark blue-gray
          700: '#334155', // Medium blue-gray
          600: '#475569', // Light blue-gray
        }
      }
    }
  }
}
