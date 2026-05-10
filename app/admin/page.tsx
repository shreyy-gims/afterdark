'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic' // Required for SSR fix
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
import { createClient } from '@/lib/supabase/client'

// DYNAMIC IMPORT: This prevents the "window is not defined" error during deployment
const QrReader = dynamic(
  () => import('react-qr-reader').then((mod) => mod.QrReader),
  { ssr: false }
)

export default function AdminDashboard() {
  const supabase = createClient()

  // State
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAttendee, setSelectedAttendee] = useState<any>(null)
  const [attendees, setAttendees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  // Ensure we are on the client side
  useEffect(() => {
    setHasMounted(true)
    fetchTickets()
  }, [])

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

  // ================= SCAN & VERIFY LOGIC =================
  const handleScanResult = async (text: string) => {
    if (isProcessing || !text) return
    
    setIsProcessing(true)
    try {
      const parsed = JSON.parse(text)
      
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', parsed.id)
        .single()

      if (error || !data) {
        alert('❌ Invalid Ticket: Not found in database.')
      } else if (data.used) {
        alert(`⚠️ ALREADY USED: ${data.full_name} checked in already.`)
      } else {
        const { error: updateError } = await supabase
          .from('tickets')
          .update({ used: true })
          .eq('id', parsed.id)

        if (!updateError) {
          alert(`✅ ACCESS GRANTED: Welcome, ${data.full_name}!`)
          fetchTickets() 
        }
      }
    } catch (err) {
      console.error("Scan error:", err)
    } finally {
      // Cooldown to prevent multiple triggers from one scan
      setTimeout(() => setIsProcessing(false), 3000)
    }
  }

  // ================= TICKET ACTIONS =================
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
      alert('Ticket Approved & QR Generated')
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

  if (!hasMounted) return null // Prevent hydration mismatch

  return (
    <main className="bg-black text-white min-h-screen font-sans">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-black tracking-tighter italic">ADMIN PANEL</h1>
            <p className="text-gray-400 mt-3">Event Entry & Ticket Management</p>
          </div>

          {/* SCANNER UI */}
          <section className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-8 mb-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <QrCode className="text-blue-500" size={32} /> Scan Station
                </h2>
                <p className="text-gray-400 mt-1 text-sm">Point the camera at an attendee's QR code</p>
              </div>
              <button
                onClick={() => setIsScannerOpen(!isScannerOpen)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all active:scale-95 ${
                  isScannerOpen 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                    : 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'
                }`}
              >
                {isScannerOpen ? <><CameraOff size={22}/> STOP SCANNER</> : <><Camera size={22}/> START SCANNER</>}
              </button>
            </div>

            <AnimatePresence>
              {isScannerOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden flex justify-center"
                >
                  <div className="relative w-full max-w-sm aspect-square rounded-[2rem] border-4 border-blue-500/30 overflow-hidden bg-black shadow-inner">
                    <QrReader
                      constraints={{ facingMode: 'environment' }}
                      onResult={(result, error) => {
                        if (!!result) handleScanResult(result.getText())
                      }}
                      containerStyle={{ width: '100%', height: '100%' }}
                      videoStyle={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Viewfinder Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                       <div className="w-64 h-64 border-2 border-blue-400/50 rounded-3xl animate-pulse relative">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] animate-[scan_2s_linear_infinite]" />
                       </div>
                    </div>
                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-3">
                           <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                           <p className="text-blue-400 font-bold tracking-widest text-sm uppercase">Verifying Ticket</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* SEARCH BAR */}
          <div className="relative mb-8 group">
            <Search className="absolute left-5 top-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-zinc-900/50 border border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-lg"
            />
          </div>

          {/* ATTENDEE TABLE */}
          <div className="overflow-x-auto rounded-[2rem] border border-white/10 bg-zinc-900/20 backdrop-blur-md">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-6 text-gray-400 font-bold uppercase text-xs tracking-widest">Attendee</th>
                  <th className="p-6 text-gray-400 font-bold uppercase text-xs tracking-widest">Status</th>
                  <th className="p-6 text-gray-400 font-bold uppercase text-xs tracking-widest">Entry</th>
                  <th className="p-6 text-right text-gray-400 font-bold uppercase text-xs tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAttendees.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-6">
                      <div className="font-bold text-lg">{ticket.full_name}</div>
                      <div className="text-gray-500 text-sm">{ticket.email}</div>
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter uppercase ${
                        ticket.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                        ticket.status === 'rejected' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {ticket.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-6">
                      {ticket.used 
                        ? <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-xs font-bold">Scanned In</span> 
                        : <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-lg text-xs font-bold">Waiting</span>
                      }
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setSelectedAttendee(ticket)} className="p-3 rounded-xl bg-white/5 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 transition-all"><Eye size={20} /></button>
                        <button onClick={() => approveTicket(ticket)} className="p-3 rounded-xl bg-white/5 text-gray-300 hover:bg-green-500/20 hover:text-green-400 transition-all"><Check size={20} /></button>
                        <button onClick={() => rejectTicket(ticket.id)} className="p-3 rounded-xl bg-white/5 text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all"><Ban size={20} /></button>
                        {ticket.qr_image && (
                          <button onClick={() => downloadQR(ticket.qr_image, ticket.full_name)} className="p-3 rounded-xl bg-white/5 text-gray-300 hover:bg-purple-500/20 hover:text-purple-400 transition-all"><Download size={20} /></button>
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

      {/* MODAL */}
      {selectedAttendee && (
        <motion.div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-[100]" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          onClick={() => setSelectedAttendee(null)}
        >
          <motion.div 
            className="bg-zinc-950 border border-white/10 rounded-[3rem] p-10 max-w-md w-full shadow-2xl relative" 
            initial={{ scale: 0.9, y: 20 }} 
            animate={{ scale: 1, y: 0 }} 
            onClick={(e) => e.stopPropagation()}
          >
             <button onClick={() => setSelectedAttendee(null)} className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
             <h2 className="text-3xl font-black mb-8 italic">TICKET DATA</h2>
             <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Full Name</p>
                  <p className="text-xl font-bold">{selectedAttendee.full_name}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Pass Type</p>
                  <p className="text-xl font-bold text-blue-400">{selectedAttendee.ticket_type || 'Standard'}</p>
                </div>
                {selectedAttendee.qr_image && (
                  <div className="bg-white p-6 rounded-[2rem] shadow-xl">
                    <img src={selectedAttendee.qr_image} alt="Attendee QR" className="w-full aspect-square" />
                  </div>
                )}
             </div>
          </motion.div>
        </motion.div>
      )}

      {/* Custom Styles for Scanner Animation */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </main>
  )
}