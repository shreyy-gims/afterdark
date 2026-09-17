'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  Camera,
  Check,
  ChevronRight,
  HeartPulse,
  IdCard,
  ShieldCheck,
  Ticket,
  Users,
} from 'lucide-react'

import { Navbar } from '@/components/navbar'

const rules = [
  {
    number: '01',
    category: 'Entry & Tickets',
    icon: Ticket,
    description: 'Everything you need before entering the venue.',
    items: [
      'A valid DKAOS ticket with a scannable QR code is required for entry.',
      'Each QR code is valid for one entry only unless stated otherwise.',
      'Carry a valid government-issued photo ID if requested at check-in.',
      'Tickets purchased from unauthorized sellers may be rejected.',
      'Damaged, duplicated, altered, or already-used QR codes will not be accepted.',
      'Entry is subject to security checks and venue capacity.',
    ],
  },
  {
    number: '02',
    category: 'Crowd Behaviour',
    icon: Users,
    description: 'Come for the chaos. Keep it respectful.',
    items: [
      'Respect fellow attendees, artists, staff, security, and venue personnel.',
      'Harassment, threats, fighting, or deliberately unsafe behaviour will not be tolerated.',
      'Do not push barricades or intentionally create dangerous crowd movement.',
      'Follow instructions given by security and event staff.',
      'Anyone creating a safety risk may be removed from the venue.',
    ],
  },
  {
    number: '03',
    category: 'Prohibited Items',
    icon: Ban,
    description: 'Some things need to stay outside.',
    items: [
      'Weapons, sharp objects, explosives, fireworks, or dangerous items are prohibited.',
      'Illegal substances are strictly prohibited.',
      'Outside alcohol is not permitted.',
      'Large bags or items restricted by the venue may be denied entry.',
      'Professional recording equipment may require prior organizer approval.',
      'Any item considered unsafe by venue security may be refused.',
    ],
  },
  {
    number: '04',
    category: 'Photos & Recording',
    icon: Camera,
    description: 'Capture the night without ruining someone else’s.',
    items: [
      'Personal mobile photography and short-form recording are generally permitted unless announced otherwise.',
      'Do not obstruct other attendees while recording.',
      'Flash, tripods, drones, or professional camera equipment may be restricted.',
      'Artist-specific photography and recording restrictions must be followed.',
      'By attending, you acknowledge that official event photography or videography may capture crowd areas.',
    ],
  },
  {
    number: '05',
    category: 'Safety & Emergency',
    icon: HeartPulse,
    description: 'Your safety comes before the show.',
    items: [
      'Keep emergency exits and access routes clear at all times.',
      'Immediately contact event staff or security if you feel unsafe or require assistance.',
      'Follow evacuation or emergency instructions without delay.',
      'Do not climb barricades, stage structures, lighting rigs, or restricted installations.',
      'Medical assistance locations will be communicated at the venue where applicable.',
    ],
  },
  {
    number: '06',
    category: 'Venue & Organizer Rights',
    icon: ShieldCheck,
    description: 'Rules that keep the event running smoothly.',
    items: [
      'DKAOS and venue management reserve the right to refuse or revoke entry where permitted.',
      'Security checks may be conducted before entry.',
      'Restricted backstage, production, artist, and staff areas must not be entered.',
      'Event timings, performances, layouts, and schedules may change when operationally necessary.',
      'Serious rule violations may result in removal from the venue without re-entry.',
    ],
  },
]

export default function RulesPage() {
  const [agreed, setAgreed] = useState(false)

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080808] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative border-b border-white/10 px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-36">
        {/* Background glow */}
        <div className="pointer-events-none absolute right-[-120px] top-10 h-[320px] w-[320px] rounded-full bg-red-600/10 blur-[120px] sm:h-[500px] sm:w-[500px]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[1px] w-8 bg-red-500 sm:w-12" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500 sm:text-xs">
                DKAOS / Event Guidelines
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-[15vw] font-black uppercase leading-[0.78] tracking-[-0.07em] sm:text-7xl md:text-8xl lg:text-[110px]">
                  Rules
                  <span className="block text-red-600">& Safety.</span>
                </h1>

                <p className="mt-7 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg">
                  We want every DKAOS event to feel wild, memorable and
                  energetic — without compromising anyone&apos;s safety.
                  Know the rules before you enter.
                </p>
              </div>

              <div className="hidden border-l border-white/10 pl-8 lg:block">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                  The simple rule
                </p>

                <p className="mt-3 text-2xl font-bold leading-tight">
                  Enjoy the chaos.
                  <br />
                  <span className="text-red-500">Respect the crowd.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPORTANT NOTICE */}
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-4 border border-red-500/20 bg-red-500/[0.05] p-5 sm:flex-row sm:items-start sm:p-6"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-red-600">
              <AlertTriangle size={19} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                Before you enter
              </p>

              <p className="mt-2 max-w-4xl text-sm leading-6 text-zinc-300 sm:text-base">
                Purchasing or using an event ticket means you agree to follow
                applicable event and venue rules. Serious violations may result
                in denied entry or removal from the venue.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RULES */}
      <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-5 sm:mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
                Event Code
              </p>

              <h2 className="mt-2 text-2xl font-black uppercase sm:text-4xl">
                Know Before You Go
              </h2>
            </div>

            <span className="hidden text-xs uppercase tracking-[0.2em] text-zinc-600 sm:block">
              06 Sections
            </span>
          </div>

          <div className="grid grid-cols-1 border-l border-t border-white/10 md:grid-cols-2">
            {rules.map((rule, index) => {
              const Icon = rule.icon

              return (
                <motion.article
                  key={rule.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: (index % 2) * 0.08,
                  }}
                  className="group relative border-b border-r border-white/10 p-5 transition-colors hover:bg-white/[0.025] sm:p-7 lg:p-9"
                >
                  <div className="mb-7 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.03] text-red-500 transition-colors group-hover:border-red-500/40 group-hover:bg-red-500/10 sm:h-12 sm:w-12">
                      <Icon size={21} />
                    </div>

                    <span className="text-4xl font-black tracking-tighter text-white/[0.04] sm:text-5xl">
                      {rule.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase tracking-tight sm:text-2xl">
                    {rule.category}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {rule.description}
                  </p>

                  <div className="mt-6 space-y-4">
                    {rule.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-start gap-3 text-sm leading-6 text-zinc-300"
                      >
                        <ChevronRight
                          size={15}
                          className="mt-[5px] shrink-0 text-red-600"
                        />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* REFUND / TICKET POLICY */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col justify-between bg-red-600 p-6 sm:p-8 lg:p-10">
              <div>
                <IdCard size={28} />

                <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                  Ticket Policy
                </p>

                <h2 className="mt-3 text-3xl font-black uppercase leading-none sm:text-4xl">
                  Tickets,
                  <br />
                  Changes &
                  <br />
                  Refunds.
                </h2>
              </div>

              <p className="mt-10 max-w-sm text-sm leading-6 text-white/70">
                Event-specific ticket conditions shown during booking take
                priority where applicable.
              </p>
            </div>

            <div className="space-y-0 bg-[#0d0d0d] p-6 sm:p-8 lg:p-10">
              {[
                'Tickets cannot be duplicated or used by multiple attendees.',
                'Refund eligibility depends on the refund policy displayed for the specific event or ticket category.',
                'Tickets may be non-refundable after the stated refund deadline.',
                'If an event is cancelled by the organizer, applicable refund instructions will be communicated to ticket holders.',
                'Line-up, schedule, venue layout or event timings may change due to operational, safety or unavoidable circumstances.',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 border-b border-white/10 py-5 first:pt-0 last:border-0 last:pb-0"
                >
                  <span className="mt-[2px] text-xs font-black text-red-500">
                    0{index + 1}
                  </span>

                  <p className="text-sm leading-6 text-zinc-300 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AGREEMENT */}
      <section className="px-4 pb-20 pt-8 sm:px-6 sm:pb-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl border border-white/10 bg-[#0c0c0c] p-5 sm:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
                One last thing
              </p>

              <h2 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
                Ready to enter the Kaos?
              </h2>

              <label className="mt-6 flex cursor-pointer items-start gap-4">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={agreed}
                  onClick={() => setAgreed(!agreed)}
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border transition ${
                    agreed
                      ? 'border-red-600 bg-red-600'
                      : 'border-zinc-600 bg-transparent'
                  }`}
                >
                  {agreed && <Check size={15} />}
                </button>

                <span className="max-w-2xl text-sm leading-6 text-zinc-400">
                  I have read and agree to follow the event rules, safety
                  requirements and applicable venue guidelines.
                </span>
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/tickets"
                onClick={(e) => {
                  if (!agreed) e.preventDefault()
                }}
                aria-disabled={!agreed}
                className={`flex min-h-14 flex-1 items-center justify-between px-5 text-sm font-black uppercase tracking-[0.12em] transition-all ${
                  agreed
                    ? 'bg-red-600 text-white hover:bg-red-500'
                    : 'cursor-not-allowed bg-zinc-900 text-zinc-600'
                }`}
              >
                Get Tickets
                <ChevronRight size={18} />
              </Link>

              <Link
                href="/"
                className="flex min-h-14 flex-1 items-center justify-between border border-white/10 px-5 text-sm font-bold uppercase tracking-[0.12em] text-zinc-300 transition-colors hover:bg-white/5"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Home
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* BOTTOM BRAND STRIP */}
      <div className="overflow-hidden border-t border-white/10 bg-red-600 py-3">
        <div className="whitespace-nowrap text-center text-xs font-black uppercase tracking-[0.25em] text-white sm:text-sm">
          DKAOS • MUSIC • CULTURE • CROWD • EXPERIENCE • DKAOS
        </div>
      </div>
    </main>
  )
}