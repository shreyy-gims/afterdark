'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, Ticket, X } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/calendar', label: 'About' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/rules', label: 'Rules' },
]

export function Navbar() {
  const pathname = usePathname()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Navbar background after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname.startsWith(href)
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-black/85 shadow-2xl shadow-black/30 backdrop-blur-xl'
            : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">

          {/* ================= DKAOS LOGO ================= */}

          {/* ================= DKAOS IMAGE LOGO ================= */}

<Link
  href="/"
  className="group relative z-50 flex items-center"
  aria-label="DKAOS Home"
>
  <div className="relative h-[38px] w-[120px] sm:h-[42px] sm:w-[140px] lg:h-[46px] lg:w-[155px]">
    <Image
      src="/kaos.png"
      alt="DKAOS Events"
      fill
      priority
      sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 155px"
      className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.03]"
    />
  </div>
</Link>


          {/* ================= DESKTOP NAVIGATION ================= */}

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">

            <div className="flex items-center rounded-full border border-white/[0.08] bg-white/[0.035] p-1 backdrop-blur-xl">

              {navItems.map((item) => {
                const isActive = isActiveRoute(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors lg:px-5 ${
                      isActive
                        ? 'text-white'
                        : 'text-white/55 hover:text-white'
                    }`}
                  >

                    {/* ACTIVE BACKGROUND */}

                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 30,
                        }}
                        className="absolute inset-0 rounded-full border border-orange-500/20 bg-orange-500/10"
                      />
                    )}

                    <span className="relative z-10">
                      {item.label}
                    </span>

                  </Link>
                )
              })}

            </div>

          </div>


          


          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white backdrop-blur-xl transition hover:bg-white/10 md:hidden"
            aria-label={
              isMobileMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>

              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.7,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}

            </AnimatePresence>
          </button>

        </div>
      </motion.nav>


      {/* ================= MOBILE NAVIGATION ================= */}

      <AnimatePresence>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#080808] md:hidden"
          >

            {/* BACKGROUND EFFECTS */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">

              <div className="absolute -right-32 top-10 h-[400px] w-[400px] rounded-full bg-orange-600/10 blur-[130px]" />

              <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-red-800/10 blur-[130px]" />

              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              />

            </div>


            <div className="relative flex min-h-screen flex-col px-6 pb-8 pt-28">

              {/* SMALL LABEL */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{ delay: 0.1 }}
                className="mb-7 flex items-center gap-3"
              >

                <span className="h-[1px] w-8 bg-orange-500" />

                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-orange-500">
                  Navigate DKAOS
                </p>

              </motion.div>


              {/* MOBILE LINKS */}

              <div className="flex flex-col">

                {navItems.map((item, index) => {
                  const isActive = isActiveRoute(item.href)

                  return (
                    <motion.div
                      key={item.href}
                      initial={{
                        opacity: 0,
                        x: -30,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.08 + index * 0.06,
                      }}
                    >

                      <Link
                        href={item.href}
                        onClick={() =>
                          setIsMobileMenuOpen(false)
                        }
                        className="group flex items-center justify-between border-b border-white/[0.08] py-4"
                      >

                        <div className="flex items-baseline gap-4">

                          <span
                            className={`text-[10px] font-bold ${
                              isActive
                                ? 'text-orange-500'
                                : 'text-white/25'
                            }`}
                          >
                            0{index + 1}
                          </span>

                          <span
                            className={`text-[32px] font-black tracking-[-0.04em] sm:text-[38px] ${
                              isActive
                                ? 'text-orange-500'
                                : 'text-white'
                            }`}
                          >
                            {item.label}
                          </span>

                        </div>

                        <ArrowUpRight
                          size={20}
                          className={`transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 ${
                            isActive
                              ? 'text-orange-500'
                              : 'text-white/25'
                          }`}
                        />

                      </Link>

                    </motion.div>
                  )
                })}

              </div>


              {/* MOBILE TICKET CTA */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{ delay: 0.45 }}
                className="mt-8"
              >

                <Link
                  href="/events"
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className="flex w-full items-center justify-between rounded-2xl bg-orange-500 px-6 py-4 font-bold text-black"
                >

                  <div className="flex items-center gap-3">
                    <Ticket size={19} />
                    Explore Tickets
                  </div>

                  <ArrowUpRight size={18} />

                </Link>

              </motion.div>


              {/* MOBILE FOOTER */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-auto pt-10"
              >

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                      Culture × Crowd × Kaos
                    </p>

                    <p className="mt-2 text-xs text-white/40">
                      Bhilai • Chhattisgarh
                    </p>

                  </div>

                  <span className="text-xs font-bold text-white/20">
                    © DKAOS
                  </span>

                </div>

              </motion.div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </>
  )
}