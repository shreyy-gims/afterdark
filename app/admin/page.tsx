'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import {
  Search,
  Eye,
  X,
  Check,
  Ban,
  QrCode,
  Download,
  Camera,
  CameraOff
} from 'lucide-react'

import QRCode from 'qrcode'
import { QrReader } from 'react-qr-reader'
import { createClient } from '@/lib/supabase/client'

export default function AdminDashboard() {
  const supabase = createClient()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAttendee, setSelectedAttendee] = useState<any>(null)
  const [attendees, setAttendees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Scanner States
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // ================= FETCH DATA =================
  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setAttendees(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  // ================= SCAN & VERIFY LOGIC =================
  const handleScanResult = async (text: string) => {
    if (isProcessing) return // Prevent duplicate scans while processing
    
    setIsProcessing(true)
    try {
      const parsed = JSON.parse(text)
      
      // 1. Verify existence and status in Supabase
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', parsed.id)
        .single()

      if (error || !data) {
        alert('❌ Invalid Ticket: Record not found.')
      } else if (data.used) {
        alert(`⚠️ ALREADY USED: ${data.full_name} has already checked in.`)
      } else {
        // 2. Mark as used
        const { error: updateError } = await supabase
          .from('tickets')
          .update({ used: true })
          .eq('id', parsed.id)

        if (!updateError) {
          alert(`✅ ENTRY ALLOWED: Welcome, ${data.full_name}!`)
          fetchTickets() // Refresh the list
        }
      }
    } catch (err) {
      alert('❌ Invalid QR Format')
    } finally {
      // Small timeout to prevent immediate re-scan of the same code
      setTimeout(() => setIsProcessing(false), 2000)
    }
  }

  // ================= OTHER ACTIONS =================
  const approveTicket = async (ticket: any) => {
    const qrValue = JSON.stringify({
      id: ticket.id,
      name: ticket.full_name,
      email: ticket.email,
    })

    const qrImage = await QRCode.toDataURL(qrValue)

    const { error } = await supabase
      .from('tickets')
      .update({
        status: 'approved',
        qr_code: qrValue,
        qr_image: qrImage,
      })
      .eq('id', ticket.id)

    if (!error) {
      alert('Ticket Approved')
      fetchTickets()
    }
  }

  const rejectTicket = async (id: string) => {
    const { error } = await supabase
      .from('tickets')
      .update({ status: 'rejected' })
      .eq('id', id)

    if (!error) {
      alert('Ticket Rejected')
      fetchTickets()
    }
  }

  const downloadQR = (qr: string, name: string) => {
    const a = document.createElement('a')
    a.href = qr
    a.download = `${name}-ticket.png`
    a.click()
  }

  const filteredAttendees = attendees.filter(
    (a) =>
      a.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-black italic">ADMIN PANEL</h1>
            <p className="text-gray-400 mt-3">Manage Tickets & QR Entry</p>
          </div>

          {/* SCANNER SECTION */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <QrCode className="text-blue-500" /> Live Entry Scanner
                </h2>
                <p className="text-sm text-gray-400">Scan attendee QR codes for instant check-in</p>
              </div>
              <button
                onClick={() => setIsScannerOpen(!isScannerOpen)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                  isScannerOpen 
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                }`}
              >
                {isScannerOpen ? <><CameraOff size={20}/> Close Scanner</> : <><Camera size={20}/> Open Scanner</>}
              </button>
            </div>

            <AnimatePresence>
              {isScannerOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative max-w-md mx-auto aspect-square rounded-2xl border-2 border-blue-500/50 overflow-hidden bg-black">
                    <QrReader
                      constraints={{ facingMode: 'environment' }}
                      onResult={(result, error) => {
                        if (!!result) handleScanResult(result.getText())
                      }}
                      containerStyle={{ width: '100%' }}
                      videoStyle={{ width: '100%' }}
                    />
                    {/* Scanner Overlay UI */}
                    <div className="absolute inset-0 pointer-events-none border-[40px] border-black/40">
                       <div className="w-full h-full border-2 border-blue-400 animate-pulse flex items-center justify-center">
                          {isProcessing && (
                            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm animate-bounce">
                              Verifying...
                            </div>
                          )}
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SEARCH & TABLE (Keeping your existing UI) */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-900/30">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-4 text-left text-gray-400 font-medium">Name</th>
                  <th className="p-4 text-left text-gray-400 font-medium">Email</th>
                  <th className="p-4 text-left text-gray-400 font-medium">Status</th>
                  <th className="p-4 text-left text-gray-400 font-medium">Used</th>
                  <th className="p-4 text-right text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendees.map((ticket) => (
                  <tr key={ticket.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold">{ticket.full_name}</td>
                    <td className="p-4 text-gray-400">{ticket.email}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-black ${
                        ticket.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        ticket.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {ticket.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-4">
                      {ticket.used 
                        ? <span className="text-red-400 flex items-center gap-1"><X size={14}/> Used</span> 
                        : <span className="text-green-400 flex items-center gap-1"><Check size={14}/> Valid</span>
                      }
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setSelectedAttendee(ticket)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"><Eye size={18} /></button>
                        <button onClick={() => approveTicket(ticket)} className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20"><Check size={18} /></button>
                        <button onClick={() => rejectTicket(ticket.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"><Ban size={18} /></button>
                        {ticket.qr_image && (
                          <button onClick={() => downloadQR(ticket.qr_image, ticket.full_name)} className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"><Download size={18} /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL (Existing logic) */}
      {selectedAttendee && (
        <motion.div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelectedAttendee(null)}>
          <motion.div className="bg-zinc-950 border border-white/10 rounded-[2rem] p-8 max-w-md w-full shadow-2xl" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Attendee Info</h2>
                <button onClick={() => setSelectedAttendee(null)} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
             </div>
             <div className="space-y-4">
                <div><p className="text-gray-500 text-xs uppercase tracking-widest">Name</p><p className="text-xl font-bold">{selectedAttendee.full_name}</p></div>
                <div><p className="text-gray-500 text-xs uppercase tracking-widest">Ticket Type</p><p className="font-bold text-blue-400">{selectedAttendee.ticket_type}</p></div>
                {selectedAttendee.qr_image && (
                  <div className="bg-white p-4 rounded-3xl mt-6"><img src={selectedAttendee.qr_image} alt="QR" className="w-full aspect-square" /></div>
                )}
             </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}