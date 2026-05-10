'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { QRCodeDisplay } from '@/components/qr-code-display'
import { Download, Share2, Calendar, MapPin } from 'lucide-react'

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  useEffect(() => {
    // Simulate loading user tickets
    setTimeout(() => {
      setTickets([
        {
          id: '1',
          ticketNumber: 'DARK-2024-001',
          eventName: 'AfterDark Society - Midnight Soirée',
          date: '2024-06-30',
          time: '11:00 PM',
          venue: 'The Underground',
          status: 'valid',
          purchaseDate: '2024-06-15',
          qrData: 'DARK-2024-001-EMAIL@EXAMPLE.COM',
        },
        {
          id: '2',
          ticketNumber: 'DARK-2024-002',
          eventName: 'AfterDark Society - Midnight Soirée',
          date: '2024-06-30',
          time: '11:00 PM',
          venue: 'The Underground',
          status: 'valid',
          purchaseDate: '2024-06-15',
          qrData: 'DARK-2024-002-EMAIL@EXAMPLE.COM',
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <Navbar />
        <div className="pt-24 pb-20 px-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4" />
            <p className="text-gray-400">Loading your tickets...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-2 text-center">
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                My Tickets
              </span>
            </h1>
            <p className="text-center text-gray-400 mb-12">{tickets.length} active ticket(s)</p>

            {tickets.length === 0 ? (
              <motion.div className="glassmorphism rounded-xl p-12 text-center space-y-4">
                <p className="text-gray-400 text-lg">No tickets found</p>
                <Link
                  href="/tickets"
                  className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all"
                >
                  Purchase Tickets
                </Link>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Tickets List */}
                <motion.div className="space-y-4">
                  {tickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      className="glassmorphism rounded-xl p-6 cursor-pointer transition-all hover:border-red-500 border border-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => setSelectedTicket(ticket)}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold">{ticket.ticketNumber}</h3>
                          <p className="text-sm text-gray-400">{ticket.eventName}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            ticket.status === 'valid'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-600/20 text-gray-400'
                          }`}
                        >
                          {ticket.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-red-500" />
                          <span>{ticket.date} at {ticket.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-red-500" />
                          <span>{ticket.venue}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Ticket Details */}
                {selectedTicket ? (
                  <motion.div
                    key={selectedTicket.id}
                    className="glassmorphism rounded-xl p-8 space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Ticket Details</h2>
                      <p className="text-gray-400">{selectedTicket.eventName}</p>
                    </div>

                    {/* QR Code */}
                    <div>
                      <p className="text-sm text-gray-400 mb-4">QR Code for Entry</p>
                      <QRCodeDisplay data={selectedTicket.qrData} size={250} />
                    </div>

                    {/* Ticket Information */}
                    <div className="space-y-3 border-t border-gray-700 pt-6">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ticket #</span>
                        <span className="font-mono font-bold">{selectedTicket.ticketNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date</span>
                        <span>{selectedTicket.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time</span>
                        <span>{selectedTicket.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Venue</span>
                        <span>{selectedTicket.venue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status</span>
                        <span className="text-green-400 font-bold">VALID</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 border-t border-gray-700 pt-6">
                      <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                        <Download size={18} />
                        Download Ticket
                      </button>
                      <button className="w-full py-3 glassmorphism text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 hover:border-red-500">
                        <Share2 size={18} />
                        Share Ticket
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                      Please arrive 30 minutes before the event starts
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    className="glassmorphism rounded-xl p-8 text-center text-gray-400 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Select a ticket to view details
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}
