'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Camera,
  ChevronRight,
  Instagram,
  MapPin,
  Music2,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'

import { Navbar } from '@/components/navbar'

/* =========================================================
   DATA
========================================================= */

const experiences = [
  {
    id: 'live-artists',
    icon: Music2,
    number: '01',
    title: 'Live Artists',
    description:
      'Artists, performers and sounds that turn ordinary nights into unforgettable experiences.',
  },
  {
    id: 'the-crowd',
    icon: Users,
    number: '02',
    title: 'The Crowd',
    description:
      'Youth communities brought together through music, culture and shared experiences.',
  },
  {
    id: 'experiences',
    icon: Sparkles,
    number: '03',
    title: 'Experiences',
    description:
      'Fan zones, installations, brand activations and moments designed beyond the stage.',
  },
  {
    id: 'culture',
    icon: Camera,
    number: '04',
    title: 'Culture',
    description:
      'Events built to live beyond the venue through photos, reels, stories and memories.',
  },
]

const upcomingEvents = [
  {
    id: 'arpit-bala-bhilai-2026',
    status: 'UP NEXT',
    title: '',
    subtitle: 'LIVE IN BHILAI',
    location: 'Bhilai, Chhattisgarh',
    date: 'Coming Soon',
    image: '/brown2.png',
    href: '/events/artist1',
  },
]
const pastEvents = [
  {
    id: 'noctra',
    title: '',
    subtitle: 'BY DKAOS',
    location: 'Bhilai, Chhattisgarh',
    date: '2026',
    image: '/spiderverse.jpeg',
    href: '/events/noctra',
  },
  {
    id: 'cl6',
    title: '',
    subtitle: 'BY DKAOS',
    location: 'Bhilai, Chhattisgarh',
    date: '2026',
    image: '/raftaar.jpeg',
    href: '/events/cl6',
  },
]

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp = {
  initial: {
    opacity: 0,
    y: 30,
  },

  whileInView: {
    opacity: 1,
    y: 0,
  },

  viewport: {
    once: true,
    amount: 0.15,
  },

  transition: {
    duration: 0.6,
  },
}

/* =========================================================
   HOME PAGE
========================================================= */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        {/* Background image */}

        <Image
          src="/kaosbg.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay */}

        <div className="absolute inset-0 bg-black/55" />

        {/* Bottom gradient */}

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-[#070707]" />

        {/* Orange atmosphere */}

        <div className="pointer-events-none absolute left-1/2 top-[-250px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-orange-600/15 blur-[160px] sm:h-[900px] sm:w-[900px]" />

        {/* Vignette */}

        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.85)] md:shadow-[inset_0_0_300px_rgba(0,0,0,0.9)]" />

        {/* Grid */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />

        {/* Hero content */}

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="max-w-6xl"
          >
            {/* Small label */}

            <div className="mb-6 flex items-center gap-3">
              <div className="h-[1px] w-8 bg-orange-500 sm:w-12" />

              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-orange-500 sm:text-xs">
                Culture × Crowd × Kaos
              </p>
            </div>

            {/* Brand */}

            <h1 className="text-[23vw] font-black leading-[0.72] tracking-[-0.075em] sm:text-[17vw] lg:text-[13rem] xl:text-[15rem]">
              D<span className="text-orange-500">KAOS</span>
            </h1>

            {/* Bottom content */}

            <div className="mt-9 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="max-w-3xl text-3xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  WE CREATE
                  <br />

                  <span className="text-white/35">
                    MOMENTS THAT STAY.
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-6 text-white/55 sm:text-base sm:leading-7">
                  Concerts, youth culture and unforgettable live experiences
                  built in Chhattisgarh.
                </p>
              </div>

              {/* CTA buttons */}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/events"
                  className="group flex items-center justify-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-orange-400"
                >
                  Explore Events

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/sponsors"
                  className="group flex items-center justify-center gap-3 rounded-full border border-white/15 bg-black/20 px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
                >
                  Partner With Us

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="relative border-t border-white/[0.06] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <motion.div {...fadeUp}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
              Who We Are
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <h2 className="max-w-5xl text-4xl font-black leading-[1] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              NOT ANOTHER
              <br />
              EVENT COMPANY.
              <br />

              <span className="text-white/25">
                A CULTURE IN MOTION.
              </span>
            </h2>

            <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
              <p className="text-sm leading-7 text-white/50 sm:text-base">
                DKAOS creates live experiences where music, people, creators
                and culture collide. Every event is designed around energy,
                community and moments worth remembering.
              </p>

              <p className="text-sm leading-7 text-white/50 sm:text-base">
                From intimate youth experiences to large-format concerts, our
                goal is simple — give Chhattisgarh experiences people usually
                travel to bigger cities to find.
              </p>
            </div>

            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-3 border-b border-orange-500 pb-2 text-sm font-bold text-white"
            >
              Discover DKAOS

              <ArrowRight
                size={16}
                className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          UP NEXT
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}

          <motion.div
            {...fadeUp}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Upcoming
              </p>

              <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                UP NEXT.
              </h2>
            </div>

            <Link
              href="/events"
              className="hidden items-center gap-2 text-sm text-white/50 transition hover:text-white sm:flex"
            >
              All Events
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Events */}

          <div className="space-y-8">
  {upcomingEvents.map((event) => {
    return (
      <div key={event.id}>
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="group relative min-h-[540px] overflow-hidden rounded-[28px] border border-white/10 sm:min-h-[620px] lg:min-h-[650px] lg:rounded-[40px]"
        >
          <Image
            src={event.image}
            alt={`${event.title} ${event.subtitle}`}
            fill
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-cover object-center transition-transform duration-[1500ms] group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/15" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/10 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
            <div>
              <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400 backdrop-blur-xl">
                {event.status}
              </span>
            </div>

            <div>
              <h3 className="break-words text-[15vw] font-black leading-[0.78] tracking-[-0.06em] sm:text-7xl lg:text-8xl xl:text-9xl">
                {event.title}
              </h3>

              <p className="mt-4 text-base font-bold tracking-[0.18em] text-white/55 sm:text-2xl sm:tracking-[0.22em]">
                {event.subtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 text-sm text-white/60 sm:flex-row sm:flex-wrap sm:gap-7">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={16}
                    className="shrink-0 text-orange-500"
                  />

                  <span>{event.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={16}
                    className="shrink-0 text-orange-500"
                  />

                  <span>{event.date}</span>
                </div>
              </div>

              <Link
                href={event.href}
                className="group/button mt-9 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.08] px-6 py-3.5 text-sm font-semibold backdrop-blur-xl transition-all hover:bg-white hover:text-black"
              >
                <span>View Event</span>

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/button:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </motion.article>
      </div>
    )
  })}
</div>

          {/* Mobile all events */}

          
        </div>
      </section>

      {/* =====================================================
    PAST EVENTS
===================================================== */}

<section className="px-5 pb-20 pt-4 sm:px-8 sm:pb-28 lg:px-12">
  <div className="mx-auto max-w-[1400px]">

    {/* Header */}

    <motion.div
      {...fadeUp}
      className="mb-10 flex items-end justify-between"
    >
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
          The Archive
        </p>

        <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          PAST EVENTS.
        </h2>

        <p className="mt-4 max-w-lg text-sm leading-6 text-white/40">
          Nights we built. Crowds that showed up.
          Moments that became part of DKAOS.
        </p>
      </div>
    </motion.div>

    {/* Past Event Cards */}

    <div className="grid gap-5 md:grid-cols-2">
      {pastEvents.map((event, index) => (
        <motion.article
          key={event.id}
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.08,
          }}
          className="group relative min-h-[480px] overflow-hidden rounded-[26px] border border-white/10 bg-[#0a0a0a] sm:min-h-[560px] lg:rounded-[32px]"
        >
          {/* Event Image */}

          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-[1200ms] group-hover:scale-[1.04]"
          />

          {/* Overlays */}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

          {/* Past Event Badge */}

          <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
            <span className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-white/60 backdrop-blur-xl">
              Past Event
            </span>
          </div>

          {/* Content */}

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">

            <h3 className="text-5xl font-black leading-none tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {event.title}
            </h3>

            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500">
              {event.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/50 sm:text-sm">

              <div className="flex items-center gap-2">
                <MapPin
                  size={14}
                  className="text-orange-500"
                />

                {event.location}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays
                  size={14}
                  className="text-orange-500"
                />

                {event.date}
              </div>

            </div>

            <Link
              href={event.href}
              className="group/button mt-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.08] px-5 py-3 text-xs font-semibold backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black sm:text-sm"
            >
              Explore Event

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover/button:translate-x-1"
              />
            </Link>

          </div>

        </motion.article>
      ))}
    </div>

  </div>
</section>

      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section className="border-y border-white/[0.06] bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
  {experiences.map((experience, index) => {
    const Icon = experience.icon

    return (
      <div
        key={experience.id}
        className="border-b border-r border-white/10"
      >
        <motion.article
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.08,
          }}
          className="group relative min-h-[290px] p-7 transition-colors duration-300 hover:bg-white/[0.025] lg:min-h-[340px] lg:p-8"
        >
          <div className="flex items-start justify-between">
            <Icon
              size={27}
              strokeWidth={1.5}
              className="text-orange-500"
            />

            <span className="text-xs font-bold text-white/20">
              {experience.number}
            </span>
          </div>

          <div className="mt-16 lg:mt-28">
            <h3 className="text-2xl font-bold tracking-tight">
              {experience.title}
            </h3>

            <p className="mt-4 text-sm leading-6 text-white/40">
              {experience.description}
            </p>
          </div>
        </motion.article>
      </div>
    )
  })}
</div>
      </section>

      {/* =====================================================
          ABOUT CTA
      ===================================================== */}

      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <motion.div
          {...fadeUp}
          className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[30px] border border-white/10 bg-[#101010] p-7 sm:p-12 lg:p-16"
        >
          {/* Glow */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-[350px] w-[350px] rounded-full bg-orange-600/10 blur-[120px]" />

          {/* Background K */}

          <div className="pointer-events-none absolute -bottom-20 right-5 select-none text-[250px] font-black leading-none tracking-[-0.08em] text-white/[0.02]">
            K
          </div>

          <div className="relative z-10 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <div>
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10">
                <Zap
                  size={21}
                  className="text-orange-500"
                />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Inside DKAOS
              </p>

              <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                NOT JUST EVENTS.
                <br />

                <span className="text-white/25">
                  WE&apos;RE BUILDING CULTURE.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
                Born in Bhilai and built around music, youth culture and
                unforgettable experiences. Discover the idea and vision behind
                DKAOS.
              </p>
            </div>

            <Link
              href="/about"
              className="group flex w-fit items-center gap-4 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:bg-orange-500"
            >
              About DKAOS

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          SPONSORS
      ===================================================== */}

      <section className="px-5 pb-24 pt-8 sm:px-8 sm:pb-32 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            {...fadeUp}
            className="grid gap-12 border-t border-white/10 pt-16 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Brands × DKAOS
              </p>

              <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                BUILD CULTURE
                <br />

                <span className="text-white/25">
                  WITH US.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end">
              <p className="max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                We collaborate with brands through event sponsorships, digital
                campaigns, LED visibility, experience stalls, audience
                activations, category partnerships and strategic barter
                collaborations.
              </p>

              <Link
                href="/sponsors"
                className="group mt-8 flex w-fit items-center gap-3 border-b border-orange-500 pb-2 text-sm font-bold"
              >
                Explore Partnerships

                <ArrowRight
                  size={16}
                  className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          RULES / SAFETY
      ===================================================== */}

      <section className="border-y border-white/[0.06] bg-[#0a0a0a] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            {...fadeUp}
            className="flex flex-col justify-between gap-10 md:flex-row md:items-center"
          >
            <div className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <ShieldCheck
                  size={22}
                  className="text-orange-500"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Good Kaos. Safe Kaos.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                  Every DKAOS event follows its own entry, safety, venue and
                  conduct policies. Know them before attending.
                </p>
              </div>
            </div>

            <Link
              href="/rules"
              className="group flex items-center gap-3 text-sm font-semibold text-white/70 transition hover:text-orange-500"
            >
              Read Event Rules

              <ChevronRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="relative overflow-hidden bg-[#050505] px-5 pb-8 pt-20 sm:px-8 sm:pt-28 lg:px-12">
        {/* Footer glow */}

        <div className="pointer-events-none absolute bottom-[-200px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-orange-700/[0.06] blur-[160px]" />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
            {/* Brand */}

            <div>
              <p className="text-[19vw] font-black leading-[0.7] tracking-[-0.07em] text-white sm:text-[15vw] lg:text-[9rem]">
                D<span className="text-orange-500">KAOS</span>
              </p>

              <p className="mt-8 max-w-md text-sm leading-6 text-white/40">
                Music. Culture. Crowd.
                <br />
                Built in Chhattisgarh.
              </p>
            </div>

            {/* Footer navigation */}

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              {/* Explore */}

              <div>
                <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/25">
                  Explore
                </p>

                <div className="flex flex-col gap-3 text-sm">
                  <Link
                    href="/"
                    className="text-white/60 transition hover:text-white"
                  >
                    Home
                  </Link>

                  <Link
                    href="/events"
                    className="text-white/60 transition hover:text-white"
                  >
                    Events
                  </Link>

                  <Link
                    href="/about"
                    className="text-white/60 transition hover:text-white"
                  >
                    About
                  </Link>
                </div>
              </div>

              {/* DKAOS */}

              <div>
                <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/25">
                  DKAOS
                </p>

                <div className="flex flex-col gap-3 text-sm">
                  <Link
                    href="/sponsors"
                    className="text-white/60 transition hover:text-white"
                  >
                    Sponsors
                  </Link>

                  <Link
                    href="/rules"
                    className="text-white/60 transition hover:text-white"
                  >
                    Rules
                  </Link>
                </div>
              </div>

              {/* Social */}

              <div>
                <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/25">
                  Social
                </p>

                <a
                  href="https://www.instagram.com/da.ka0s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 transition hover:text-orange-500"
                >
                  <Instagram size={15} />

                  @da.ka0s
                </a>
              </div>
            </div>
          </div>

          {/* Footer bottom */}

          {/* Footer bottom */}

<div className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-7 text-[11px] text-white/25 sm:flex-row sm:items-center sm:justify-between">

  {/* Copyright */}
  <p>© 2026 DKAOS. All rights reserved.</p>

  {/* Right side */}
  <div className="flex flex-wrap items-center gap-x-5 gap-y-3">

    <p>Culture × Crowd × Kaos</p>

    <span className="hidden h-3 w-px bg-white/15 sm:block" />

    <a
      href="https://anshhh-inky.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-white/35 transition-colors duration-300 hover:text-orange-500"
    >
      <span>Developed by</span>

      <span className="font-semibold text-white/60 transition-colors duration-300 group-hover:text-orange-500">
        anshhh
      </span>

      <ArrowUpRight
        size={12}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>

  </div>

</div>
        </div>
      </footer>
    </main>
  )
}