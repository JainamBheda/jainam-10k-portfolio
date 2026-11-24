import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { FaGithub, FaLinkedin, FaFileDownload, FaSun, FaMoon } from 'react-icons/fa'

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const navItems = [
    { name: 'About', id: '#about' },
    { name: 'Experience', id: '#experience' },
    { name: 'Projects', id: '#projects' },
    { name: 'Contact', id: '#contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4 shadow-md backdrop-blur-md bg-white/60 dark:bg-gray-900/60">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="#about" className="text-2xl font-bold text-blue-600 dark:text-blue-400">Jainam Bheda</a>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a key={item.name} href={item.id} className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-600 dark:hover:text-blue-400"><FaLinkedin /></a>
          <a href="YOUR_GITHUB_URL" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-600 dark:hover:text-blue-400"><FaGithub /></a>
          <a href="/Resume8_JainamBheda_SDE.pdf" download className="text-xl hover:text-blue-600 dark:hover:text-blue-400"><FaFileDownload /></a>
          <button onClick={toggleTheme} className="text-xl hover:text-blue-600 dark:hover:text-blue-400">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
