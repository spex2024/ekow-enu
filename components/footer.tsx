'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export function CopyrightFooter() {
  const [year, setYear] = useState(new Date().getFullYear())
  const { theme } = useTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear())
    }, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className={`py-4 mt-auto ${
      theme === 'dark'
        ? 'bg-[#002538]/10 text-[#F2EDE4]' : 'bg-[#f2ede4] text-[#002538]'
       
    }`}>
      <div className="container mx-auto px-4">
        <p className="text-center text-sm">
          &copy; {year} Enoch Ekow Enu. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

