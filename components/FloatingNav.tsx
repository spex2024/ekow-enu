import { motion } from 'framer-motion'
import { Home, Briefcase, GraduationCap, Folder, Mail } from 'lucide-react'
import Link from 'next/link'

interface FloatingNavProps {
  darkMode: boolean
  activeSection: string
}

export function FloatingNav({ darkMode, activeSection }: FloatingNavProps) {
  const navItems = [
    { icon: Home, href: '#hero', label: 'Home' },
    { icon: Briefcase, href: '#experience', label: 'Experience' },
    { icon: GraduationCap, href: '#education', label: 'Education' },
    { icon: Folder, href: '#projects', label: 'Projects' },
    { icon: Mail, href: '#contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      className={`fixed bottom-4 sm:left-1/2 transform -translate-x-1/2 z-50 
        ${darkMode ? 'bg-[#F2EDE4]/10' : 'bg-[#002538]/10'} 
        backdrop-filter backdrop-blur-lg
        rounded-full px-2 sm:px-4 py-2 shadow-lg`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="flex space-x-1 sm:space-x-2">
        {navItems.map((item) => (
          <motion.li
            key={item.label}
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={item.href} passHref>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full cursor-pointer
                ${activeSection === item.href.slice(1) 
                  ? (darkMode ? 'bg-[#F2EDE4]/20 text-[#F2EDE4]' : 'bg-[#002538]/20 text-[#002538]')
                  : (darkMode ? 'text-[#F2EDE4]/70 hover:text-[#F2EDE4]' : 'text-[#002538]/70 hover:text-[#002538]')
                }
                transition-colors duration-200`}
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-xs sm:text-sm font-medium">{item.label}</span>
              </div>
            </Link>
            {activeSection === item.href.slice(1) && (
              <motion.div
                className={`absolute -bottom-1 left-0 right-0 h-0.5 ${darkMode ? 'bg-[#F2EDE4]' : 'bg-[#002538]'}`}
                layoutId="activeSection"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  )
}

