'use client'

import { User, Code, FolderOpen, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
  { href: '#about', label: '关于我', icon: User },
  { href: '#skills', label: '技能', icon: Code },
  { href: '#projects', label: '项目', icon: FolderOpen },
  { href: '#chat', label: 'AI助手', icon: MessageCircle },
]

export default function SideNav() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeSection === item.href.substring(1)
        
        return (
          <button
            key={item.href}
            onClick={() => handleClick(item.href)}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary flex items-center justify-center transition-all duration-300"
            aria-label={item.label}
          >
            <Icon className={`w-5 h-5 transition-colors ${
              isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
            }`} />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </div>
            
            {/* Active indicator */}
            {isActive && (
              <div className="absolute inset-0 rounded-full border-2 border-primary animate-pulse" />
            )}
          </button>
        )
      })}
    </div>
  )
}
