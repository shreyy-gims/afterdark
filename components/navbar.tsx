'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/tickets', label: 'Tickets' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/venue', label: 'Venue' },
    { href: '/rules', label: 'Rules' },
  ]

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-gray-700/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/logobg.png" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center font-bold text-white group-hover:shadow-lg group-hover:shadow-red-600/50 transition-all">
                Ⓐ
              </div>
              <span className="text-white font-bold hidden sm:block text-sm md:text-base"></span>
            </Link>

            {/* Navigation items - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-red-500 bg-red-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Auth buttons - Desktop */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <Link
                href="/auth/login"
                className="px-3 lg:px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="px-3 lg:px-4 py-2 rounded-lg text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-all"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-40 md:hidden glassmorphism border-b border-gray-700/50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-red-500 bg-red-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-gray-700/50 space-y-2">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-all text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
