'use client'

import React, {
  useEffect,
  useState,
  useCallback,
} from 'react'

import { useRouter } from 'next/navigation'

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
  CameraOff,
  LogOut,
} from 'lucide-react'

import QRCode from 'qrcode'
import { Html5QrcodeScanner } from 'html5-qrcode'

import { createClient } from '@/lib/supabase/client'

// ================= TYPES =================

type Ticket = {
  id: string
  full_name: string
  email: string
  ticket_type?: string
  qr_image?: string
  qr_code?: string
  status?: string
  used?: boolean
}

// ================= QR SCANNER =================

function QRScanner({
  onScan,
}: {
  onScan: (text: string) => void
}) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      false
    )

    scanner.render(
      (decodedText) => {
        onScan(decodedText)
      },
      () => {}
    )

    return () => {
      scanner.clear().catch(() => {})
    }
  }, [onScan])

  return <div id="qr-reader" className="w-full" />
}

// ================= PAGE =================

export default function AdminDashboard() {
  const supabase = createClient()

  const router = useRouter()

  // ================= STATE =================

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAttendee, setSelectedAttendee] =
    useState<Ticket | null>(null)

  const [attendees, setAttendees] = useState<Ticket[]>([])

  const [loading, setLoading] = useState(true)

  const [checkingAuth, setCheckingAuth] =
    useState(true)

  const [isScannerOpen, setIsScannerOpen] =
    useState(false)

  const [isProcessing, setIsProcessing] =
    useState(false)

  // ================= AUTH PROTECTION =================

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // NOT LOGGED IN
    if (!session) {
      router.push('/admin-login')
      return
    }

    // CHANGE THIS EMAIL
    const adminEmail = 'shreyansharpitward0@gmail.com'

    if (session.user.email !== adminEmail) {
      router.push('/')
      return
    }

    setCheckingAuth(false)

    fetchTickets()
  }

  // ================= FETCH =================

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', {
        ascending: false,
      })

    if (!error && data) {
      setAttendees(data)
    }

    setLoading(false)
  }

  // ================= LOGOUT =================

  const logout = async () => {
    await supabase.auth.signOut()

    router.push('/admin-login')
  }

  // ================= QR SCAN =================

  const handleScanResult = useCallback(
    async (text: string) => {
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
          alert(
            '❌ Invalid Ticket: Not found in database.'
          )
        } else if (data.used) {
          alert(
            `⚠️ ALREADY USED: ${data.full_name} checked in already.`
          )
        } else {
          const { error: updateError } =
            await supabase
              .from('tickets')
              .update({ used: true })
              .eq('id', parsed.id)

          if (!updateError) {
            alert(
              `✅ ACCESS GRANTED: Welcome, ${data.full_name}!`
            )

            fetchTickets()
          }
        }
      } catch (err) {
        console.error(err)
      } finally {
        setTimeout(() => {
          setIsProcessing(false)
        }, 3000)
      }
    },
    [isProcessing]
  )

  // ================= APPROVE =================

  const approveTicket = async (ticket: Ticket) => {
    const qrValue = JSON.stringify({
      id: ticket.id,
      name: ticket.full_name,
      email: ticket.email,
    })

    const qrImage =
      await QRCode.toDataURL(qrValue)

    const { error } = await supabase
      .from('tickets')
      .update({
        status: 'approved',
        qr_code: qrValue,
        qr_image: qrImage,
      })
      .eq('id', ticket.id)

    if (!error) {
      alert(
        '✅ Ticket Approved & QR Generated'
      )

      fetchTickets()
    }
  }

  // ================= REJECT =================

  const rejectTicket = async (id: string) => {
    const { error } = await supabase
      .from('tickets')
      .update({
        status: 'rejected',
      })
      .eq('id', id)

    if (!error) {
      alert('❌ Ticket Rejected')

      fetchTickets()
    }
  }

  // ================= DOWNLOAD =================

  const downloadQR = (
    qr: string,
    name: string
  ) => {
    const a = document.createElement('a')

    a.href = qr
    a.download = `${name}-ticket.png`

    a.click()
  }

  // ================= FILTER =================

  const filteredAttendees =
    attendees.filter(
      (a) =>
        a.full_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        a.email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    )

  // ================= LOADING =================

  if (checkingAuth) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-5" />

          <p className="text-gray-400">
            Checking admin access...
          </p>
        </div>
      </div>
    )
  }

  // ================= UI =================

  return (
    <main className="bg-black text-white min-h-screen font-sans">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">

            <div>
              <h1 className="text-5xl font-black tracking-tighter italic">
                ADMIN PANEL
              </h1>

              <p className="text-gray-400 mt-3">
                Event Entry & Ticket Management
              </p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl font-bold hover:bg-red-500/20 transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          {/* SCANNER */}

          <section className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-8 mb-12 shadow-2xl">

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">

              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <QrCode
                    className="text-blue-500"
                    size={32}
                  />

                  Scan Station
                </h2>

                <p className="text-gray-400 mt-1 text-sm">
                  Point camera at attendee QR
                </p>
              </div>

              <button
                onClick={() =>
                  setIsScannerOpen(
                    !isScannerOpen
                  )
                }
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all ${
                  isScannerOpen
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {isScannerOpen ? (
                  <>
                    <CameraOff size={22} />
                    STOP SCANNER
                  </>
                ) : (
                  <>
                    <Camera size={22} />
                    START SCANNER
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {isScannerOpen && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  className="overflow-hidden flex justify-center"
                >
                  <div className="relative w-full max-w-sm rounded-[2rem] border-4 border-blue-500/30 overflow-hidden bg-black p-4">

                    <QRScanner
                      onScan={
                        handleScanResult
                      }
                    />

                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">

                        <div className="flex flex-col items-center gap-3">

                          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

                          <p className="text-blue-400 font-bold uppercase text-sm">
                            Verifying Ticket
                          </p>

                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* SEARCH */}

          <div className="relative mb-8">

            <Search className="absolute left-5 top-5 text-gray-500" />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-zinc-900/50 border border-white/10 outline-none text-lg"
            />
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto rounded-[2rem] border border-white/10 bg-zinc-900/20">

            {loading ? (
              <div className="p-10 text-center text-gray-400">
                Loading attendees...
              </div>
            ) : (
              <table className="w-full text-left">

                <thead>
                  <tr className="bg-white/5 border-b border-white/10">

                    <th className="p-6">
                      Attendee
                    </th>

                    <th className="p-6">
                      Status
                    </th>

                    <th className="p-6">
                      Entry
                    </th>

                    <th className="p-6 text-right">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">

                  {filteredAttendees.map(
                    (ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="p-6">
                          <div className="font-bold text-lg">
                            {
                              ticket.full_name
                            }
                          </div>

                          <div className="text-gray-500 text-sm">
                            {
                              ticket.email
                            }
                          </div>
                        </td>

                        <td className="p-6">
                          {ticket.status}
                        </td>

                        <td className="p-6">
                          {ticket.used
                            ? 'Scanned'
                            : 'Waiting'}
                        </td>

                        <td className="p-6 text-right">

                          <div className="flex justify-end gap-2">

                            <button
                              onClick={() =>
                                setSelectedAttendee(
                                  ticket
                                )
                              }
                              className="p-3 rounded-xl bg-white/5"
                            >
                              <Eye size={20} />
                            </button>

                            <button
                              onClick={() =>
                                approveTicket(
                                  ticket
                                )
                              }
                              className="p-3 rounded-xl bg-white/5"
                            >
                              <Check size={20} />
                            </button>

                            <button
                              onClick={() =>
                                rejectTicket(
                                  ticket.id
                                )
                              }
                              className="p-3 rounded-xl bg-white/5"
                            >
                              <Ban size={20} />
                            </button>

                            {ticket.qr_image && (
                              <button
                                onClick={() =>
                                  downloadQR(
                                    ticket.qr_image!,
                                    ticket.full_name
                                  )
                                }
                                className="p-3 rounded-xl bg-white/5"
                              >
                                <Download size={20} />
                              </button>
                            )}

                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}

      {selectedAttendee && (
        <motion.div
          className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() =>
            setSelectedAttendee(null)
          }
        >
          <motion.div
            className="bg-zinc-950 border border-white/10 rounded-[3rem] p-10 max-w-md w-full relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              onClick={() =>
                setSelectedAttendee(null)
              }
              className="absolute top-6 right-6"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-black mb-8 italic">
              TICKET DATA
            </h2>

            <div className="space-y-6">

              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-gray-500 text-xs mb-1">
                  Full Name
                </p>

                <p className="text-xl font-bold">
                  {
                    selectedAttendee.full_name
                  }
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-gray-500 text-xs mb-1">
                  Pass Type
                </p>

                <p className="text-xl font-bold text-blue-400">
                  {selectedAttendee.ticket_type ||
                    'Standard'}
                </p>
              </div>

              {selectedAttendee.qr_image && (
                <div className="bg-white p-6 rounded-[2rem]">
                  <img
                    src={
                      selectedAttendee.qr_image
                    }
                    alt="QR"
                    className="w-full aspect-square"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}