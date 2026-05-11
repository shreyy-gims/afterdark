'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Music2, ShieldCheck, Sparkles } from 'lucide-react'

export default function Home() {

  // ================= COUNTDOWN =================
  const targetDate = new Date('2026-05-15T23:59:59').getTime()

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
          ),
          seconds: Math.floor(
            (difference % (1000 * 60)) / 1000
          ),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <main className="bg-black text-white overflow-x-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen w-full overflow-hidden bg-black">

        {/* MAIN POSTER IMAGE */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/abc.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* DARK CINEMATIC OVERLAY */}
        <div className="absolute inset-0 bg-black/55" />

        {/* RED ATMOSPHERIC GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.18),transparent_60%)]" />

        {/* TOP RED LIGHT */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-red-700/20 blur-[180px] rounded-full" />

        {/* SIDE DARK VIGNETTE */}
        <div className="absolute inset-0 shadow-[inset_0_0_250px_rgba(0,0,0,0.95)]" />

        {/* BOTTOM BLACK FADE */}
        <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-black via-black/90 to-transparent" />

        {/* FLOATING RED PARTICLES */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[15%] left-[20%] w-2 h-2 bg-red-500 rounded-full blur-sm animate-pulse" />
          <div className="absolute top-[30%] right-[18%] w-3 h-3 bg-red-600 rounded-full blur-md animate-pulse" />
          <div className="absolute bottom-[25%] left-[30%] w-2 h-2 bg-red-400 rounded-full blur-sm animate-pulse" />
          <div className="absolute bottom-[40%] right-[25%] w-4 h-4 bg-red-700 rounded-full blur-lg animate-pulse" />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-20 flex items-end justify-center min-h-screen px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl"
          >

            {/* SMALL LABEL */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-5"
            >
              <span className="border border-red-500/40 bg-red-500/10 backdrop-blur-md px-5 py-2 rounded-full text-xs tracking-[0.4em] uppercase text-red-400">
                Forbidden Nights
              </span>
            </motion.div>

            {/* MAIN TITLE */}
            <motion.h1
              className="text-6xl md:text-8xl font-black uppercase leading-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                AFTERDARK
              </span>

              <span className="block bg-gradient-to-b from-red-400 via-red-600 to-red-900 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,0,0,0.4)]">
                SOCIETY
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              className="mt-8 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Some nights should never be explained
            </motion.p>


            {/* CTA BUTTONS */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/tickets"
                className="px-10 py-4 rounded-2xl bg-red-600 hover:bg-red-700 transition-all font-bold text-white shadow-[0_0_40px_rgba(255,0,0,0.45)]"
              >
                Reserve Access
              </Link>

              <Link
                href="/venue"
                className="px-10 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all font-semibold"
              >
                Explore Venue
              </Link>
            </motion.div>
            
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="relative py-28 px-6 bg-black overflow-hidden">

        {/* RED BACKGROUND LIGHT */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-700/10 blur-[150px] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* SECTION TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4">
              Experience
            </p>

            <h2 className="text-5xl md:text-6xl font-black">
              WHY ATTEND?
            </h2>
          </motion.div>

          {/* FEATURE CARDS */}
          <div className="grid md:grid-cols-3 gap-8">

            {/* CARD 1 */}
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-60" />

              <Sparkles className="relative z-10 w-14 h-14 text-red-500 mb-8" />

              <h3 className="relative z-10 text-3xl font-bold mb-5">
                Elite Atmosphere
              </h3>

              <p className="relative z-10 text-gray-400 leading-relaxed">
                A carefully curated crowd, immersive lighting, hidden
                experiences and unforgettable energy.
              </p>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-60" />

              <ShieldCheck className="relative z-10 w-14 h-14 text-red-500 mb-8" />

              <h3 className="relative z-10 text-3xl font-bold mb-5">
                Private Entry
              </h3>

              <p className="relative z-10 text-gray-400 leading-relaxed">
                Secure QR verification system with smooth premium access
                experience for all guests.
              </p>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-60" />

              <Music2 className="relative z-10 w-14 h-14 text-red-500 mb-8" />

              <h3 className="relative z-10 text-3xl font-bold mb-5">
                Midnight Vibes
              </h3>

              <p className="relative z-10 text-gray-400 leading-relaxed">
                Underground DJs, luxury cocktails, immersive sound and
                cinematic nightlife visuals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative border-t border-white/10 bg-black py-14 px-6 text-center overflow-hidden">

  <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-transparent to-red-950/10" />

  <div className="relative z-10 max-w-5xl mx-auto">

    {/* LOGO / NAME */}
    <h2 className="text-3xl font-black tracking-widest bg-gradient-to-r from-red-400 via-red-600 to-red-900 bg-clip-text text-transparent">
      AFTERDARK SOCIETY
    </h2>

    <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
      Exclusive nightlife experiences, premium private parties,
      curated guest access and cinematic underground vibes.
    </p>

    {/* CONTACT INFO */}
    <div className="mt-10 grid md:grid-cols-3 gap-6">

      {/* INSTAGRAM */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
        <p className="text-red-500 uppercase text-xs tracking-[0.3em] mb-2">
          Instagram
        </p>

        <a
          href="https://www.instagram.com/anshhhyrrrr?igsh=dmg1ZzZtMWxkeGow"
          target="_blank"
          className="text-white font-semibold hover:text-red-400 transition"
        >
          anshhhyrrrr
        </a>
      </div>

      {/* WHATSAPP */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
        <p className="text-red-500 uppercase text-xs tracking-[0.3em] mb-2">
          WhatsApp
        </p>

        <a
          href="https://wa.me/919999999999"
          target="_blank"
          className="text-white font-semibold hover:text-red-400 transition"
        >
          +91 999999999
        </a>
      </div>

      {/* EMAIL */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
        <p className="text-red-500 uppercase text-xs tracking-[0.3em] mb-2">
          Email
        </p>

        <a
          href="mailto:afterdark@gmail.com"
          className="text-white font-semibold hover:text-red-400 transition"
        >
          afterdark@gmail.com
        </a>
      </div>

    </div>

    {/* COPYRIGHT */}
    <div className="mt-12 border-t border-white/10 pt-6">
      <p className="text-gray-700 text-xs mt-2">
  Designed & Developed by{' '}
  <a
    href="https://sprightly-naiad-1b82db.netlify.app/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-red-500 hover:text-red-400 underline"
  >
    Anshhhh
  </a>
</p>
    </div>

  </div>
</footer>
    </main>
  )
}