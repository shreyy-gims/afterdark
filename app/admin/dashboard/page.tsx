'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Search, Download, Eye, X } from 'lucide-react'

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAttendee, setSelectedAttendee] = useState<any>(null)

  // Mock attendee data
  const attendees = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      ticketNumber: 'DARK-2024-001',
      status: 'checked-in',
      purchaseDate: '2024-06-15',
      checkInTime: '2024-06-30 23:45:00',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      ticketNumber: 'DARK-2024-002',
      status: 'valid',
      purchaseDate: '2024-06-16',
      checkInTime: null,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      ticketNumber: 'DARK-2024-003',
      status: 'checked-in',
      purchaseDate: '2024-06-17',
      checkInTime: '2024-06-30 23:52:00',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      ticketNumber: 'DARK-2024-004',
      status: 'checked-in',
      purchaseDate: '2024-06-18',
      checkInTime: '2024-06-30 23:30:00',
    },
  ]

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.ticketNumber.includes(searchTerm)
  )

  const stats = [
    { label: 'Total Tickets', value: 500 },
    { label: 'Checked In', value: 234 },
    { label: 'Pending', value: 266 },
    { label: 'Revenue', value: '$23,100' },
  ]

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-2 text-center">
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-center text-gray-400 mb-12">Event Management & Analytics</p>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glassmorphism rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-red-500">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Search and Attendees */}
            <motion.div
              className="glassmorphism rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="mb-6 space-y-4">
                <h2 className="text-2xl font-bold">Attendees</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Search by name, email, or ticket number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none transition text-white placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Attendees Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                        Ticket
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                        Check In
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttendees.map((attendee) => (
                      <tr
                        key={attendee.id}
                        className="border-b border-gray-800 hover:bg-white/5 transition"
                      >
                        <td className="px-4 py-4 text-sm">{attendee.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-400">{attendee.email}</td>
                        <td className="px-4 py-4 text-sm font-mono text-gray-300">
                          {attendee.ticketNumber}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              attendee.status === 'checked-in'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {attendee.status === 'checked-in' ? 'Checked In' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-400">
                          {attendee.checkInTime || '-'}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => setSelectedAttendee(attendee)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-500"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredAttendees.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No attendees found matching your search
                </div>
              )}

              {/* Export Button */}
              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all">
                  <Download size={18} />
                  Export Data
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Attendee Detail Modal */}
      {selectedAttendee && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedAttendee(null)}
        >
          <motion.div
            className="glassmorphism rounded-xl p-8 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">Attendee Details</h2>
              <button
                onClick={() => setSelectedAttendee(null)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Name</p>
                <p className="text-lg font-bold">{selectedAttendee.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-lg font-bold">{selectedAttendee.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Ticket Number</p>
                <p className="text-lg font-mono font-bold">{selectedAttendee.ticketNumber}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                    selectedAttendee.status === 'checked-in'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {selectedAttendee.status === 'checked-in' ? 'Checked In' : 'Pending'}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Purchase Date</p>
                <p className="text-lg font-bold">{selectedAttendee.purchaseDate}</p>
              </div>
              {selectedAttendee.checkInTime && (
                <div>
                  <p className="text-gray-400 text-sm">Check In Time</p>
                  <p className="text-lg font-bold">{selectedAttendee.checkInTime}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedAttendee(null)}
              className="w-full mt-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}
