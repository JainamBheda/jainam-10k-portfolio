import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
  const [theme, setTheme] = useState(stored || 'light')

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  // Avoid JSX in this .js file to prevent loader issues; use React.createElement
  return React.createElement(ThemeContext.Provider, { value: { theme, toggleTheme } }, children)
}
