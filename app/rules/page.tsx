'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { AlertCircle, Check } from 'lucide-react'

export default function RulesPage() {
  const [agreed, setAgreed] = useState(false)

  const rules = [
    {
      category: 'Dress Code',
      items: [
        'formal attire not required',
        'No athletic wear, gym clothes, or flip-flops',
        'No visible logos or branding',
      ],
    },
    {
      category: 'Behavior Policy',
      items: [
        'Respect all guests ',
        'No aggressive or disruptive behavior',
        'Zero tolerance for harassment',
        'Intoxicated individuals may be denied entry or asked to leave',
      ],
    },
    {
      category: 'Photography & Recording',
      items: [
        'Violators will be asked to leave immediately',
        'We respect privacy and discretion',
      ],
    },
    {
      category: 'Entry Requirements',
      items: [
        'Valid ID required at check-in',
        'Present digital QR code ticket at entrance',
      ],
    },
    {
      category: 'Prohibited Items',
      items: [
        'No weapons of any kind',
        'No illegal substances',
      ],
    },
    {
      category: 'Health & Safety',
      items: [
        'Persons under the influence will be refused entry',
        'Owners instructions must be followed',
        'In case of emergency, follow owner guidance',
      ],
    },
  ]

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Event Rules & Guidelines
              </span>
            </h1>
            <p className="text-center text-gray-400 mb-8">
              Please read and understand these rules before attending
            </p>

            {/* Warning Banner */}
            <motion.div
              className="glassmorphism border border-red-500/50 rounded-xl p-6 mb-12 flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold mb-2">Important Notice</h3>
                <p className="text-gray-300">
                  By purchasing a ticket, you acknowledge that you have read and agree to comply with
                  all event rules. Violation of any rule may result in immediate removal without refund.
                </p>
              </div>
            </motion.div>

            {/* Rules Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {rules.map((ruleSet, index) => (
                <motion.div
                  key={ruleSet.category}
                  className="glassmorphism rounded-xl p-6 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold text-red-500 mb-4">{ruleSet.category}</h3>
                  <ul className="space-y-3">
                    {ruleSet.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                        </div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Refund Policy */}
            <motion.div
              className="glassmorphism rounded-xl p-8 space-y-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold">Refund Policy</h2>
              <div className="space-y-3 text-gray-300">
                <p>
                  • Refunds are available up to 48 hours before the event
                </p>
                <p>
                  • Tickets cancelled due to venue rules violations are non-refundable
                </p>
                <p>
                  • In case of event cancellation by organizers, full refunds will be issued
                </p>
                <p>
                  • Refund requests must be submitted through your account
                </p>
              </div>
            </motion.div>

            {/* Acknowledgment */}
            <motion.div
              className="glassmorphism rounded-xl p-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-700 text-red-500 accent-red-500 cursor-pointer mt-1"
                />
                <label className="text-gray-300 cursor-pointer">
                  I have read and agree to comply with all event rules and guidelines. I understand that
                  violation of any rule may result in immediate removal without refund.
                </label>
              </div>

              {agreed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-green-500 text-sm"
                >
                  <Check size={18} />
                  <span>You agree to the terms</span>
                </motion.div>
              )}

              <div className="flex gap-4">
                <Link
                  href="/tickets"
                  className={`flex-1 py-4 font-bold rounded-lg transition-all transform text-center ${
                    agreed
                      ? 'bg-red-600 hover:bg-red-700 text-white hover:scale-105 shadow-lg shadow-red-600/50'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  onClick={(e) => !agreed && e.preventDefault()}
                >
                  Get Your Ticket
                </Link>
                <Link
                  href="/"
                  className="flex-1 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-all text-center"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
