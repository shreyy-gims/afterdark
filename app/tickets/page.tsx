'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

import {
  Ticket,
  Users,
  MapPin,
  Clock,
  Crown,
  Zap,
} from 'lucide-react'

  export default function TicketsPage() {
  const router = useRouter()
  const supabase = createClient()

  // ================= STATES =================
  const [ticketType, setTicketType] = useState('regular')
  const [quantity, setQuantity] = useState(1)

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [instaId, setInstaId] = useState('')

  const [referralSource, setReferralSource] = useState('')
  const [drinkPreference, setDrinkPreference] = useState('both')
  const [foodPreference, setFoodPreference] = useState('veg')

  const [paymentMode, setPaymentMode] = useState('upi')

  const [isLoading, setIsLoading] = useState(false)

  // ================= TICKET PRICES =================
  const ticketPrices = {
    early: 300,
    regular: 300,
    vip: 300,
  }

  const ticketPrice =
    ticketType === 'early'
      ? ticketPrices.early
      : ticketType === 'vip'
      ? ticketPrices.vip
      : ticketPrices.regular

  const totalPrice = ticketPrice * quantity

  const seatsAvailable = 25

  // ================= PURCHASE =================
  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()

    // VALIDATION
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !age.trim() ||
      !instaId.trim() ||
      !referralSource.trim()
    ) {
      alert('Please fill all required fields')
      return
    }

    try {
      setIsLoading(true)

      // INSERT INTO SUPABASE
      const { data, error } = await supabase
        .from('tickets')
        .insert([
          {
            full_name: name,
            email: email,
            phone: phone,
            age: Number(age),

            instagram_id: instaId,

            ticket_type: ticketType,
            quantity: quantity,

            referral_source: referralSource,

            drink_preference: drinkPreference,
            food_preference: foodPreference,

            payment_mode: paymentMode,

            total_price: totalPrice,
          },
        ])

      if (error) {
        console.error(error)
        alert(error.message)
        return
      }

      alert('Ticket booked successfully!')

      // RESET FORM
      setName('')
      setEmail('')
      setPhone('')
      setAge('')
      setInstaId('')
      setReferralSource('')
      setDrinkPreference('both')
      setFoodPreference('veg')
      setPaymentMode('upi')
      setTicketType('regular')
      setQuantity(1)

      router.push('/')
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar />

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.18),transparent_50%)]" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-700/10 blur-[180px] rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="pt-28 pb-24 px-4">
        <div className="max-w-3xl mx-auto">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 border border-red-500/20 bg-red-500/10 backdrop-blur-xl px-5 py-2 rounded-full mb-6">
              <Ticket className="w-4 h-4 text-red-500" />

              <span className="text-red-400 text-sm tracking-widest uppercase">
                Limited Access
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none">
              Secure
              <span className="block bg-gradient-to-b from-red-400 via-red-600 to-red-900 bg-clip-text text-transparent">
                Your Entry
              </span>
            </h1>

            <p className="text-gray-400 mt-6 text-lg">
              Some nights should never be explained.
            </p>
          </motion.div>

          {/* QUICK INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 text-center">
              <Clock className="mx-auto text-red-500 mb-3" />

              <p className="text-gray-500 text-xs uppercase tracking-widest">
                Date & Time
              </p>

              <h3 className="font-bold text-lg mt-1">
                14 MAY 2026
              </h3>

              <p className="text-gray-400 text-sm">
                11 AM -Mid Day
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 text-center">
              <MapPin className="mx-auto text-red-500 mb-3" />

              <p className="text-gray-500 text-xs uppercase tracking-widest">
                Venue
              </p>

              <h3 className="font-bold text-lg mt-1">
                Secret Location
              </h3>

              <p className="text-gray-400 text-sm">
                Shared after booking
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 text-center">
              <Users className="mx-auto text-red-500 mb-3" />

              <p className="text-gray-500 text-xs uppercase tracking-widest">
                Seats Left
              </p>

              <h3 className="font-bold text-lg mt-1">
                {seatsAvailable}
              </h3>

              <p className="text-gray-400 text-sm">
                Limited crowd
              </p>
            </div>
          </div>

          {/* MAIN CARD */}
          <div className="rounded-[35px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-8 md:p-10 shadow-[0_0_80px_rgba(255,0,0,0.08)]">

            {/* TICKET TYPES */}
            <div className="mb-10">
              <h2 className="text-2xl font-black uppercase mb-6">
                Select Ticket
              </h2>

              <div className="grid md:grid-cols-3 gap-4">

                {/* EARLY */}
                <button
                  type="button"
                  onClick={() => setTicketType('early')}
                  className={`rounded-3xl p-6 border transition-all text-left ${
                    ticketType === 'early'
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <Zap className="text-red-500 mb-4" />

                  <h3 className="text-2xl font-bold">
                    Early Bird
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    Limited first access
                  </p>

                  <div className="mt-5 text-4xl font-black text-red-500">
                    300
                  </div>
                </button>

                {/* REGULAR */}
                <button
                  type="button"
                  onClick={() => setTicketType('regular')}
                  className={`rounded-3xl p-6 border transition-all text-left ${
                    ticketType === 'regular'
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <Ticket className="text-red-500 mb-4" />

                  <h3 className="text-2xl font-bold">
                    Regular
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    Standard access
                  </p>

                  <div className="mt-5 text-4xl font-black text-red-500">
                    300
                  </div>
                </button>

                {/* VIP */}
                <button
                  type="button"
                  onClick={() => setTicketType('vip')}
                  className={`rounded-3xl p-6 border transition-all text-left ${
                    ticketType === 'vip'
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <Crown className="text-red-500 mb-4" />

                  <h3 className="text-2xl font-bold">
                    VIP
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    Premium lounge access
                  </p>

                  <div className="mt-5 text-4xl font-black text-red-500">
                    500
                  </div>
                </button>

              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handlePurchase} className="space-y-6">

              {/* NAME */}
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                />
              </div>

              {/* PHONE + AGE */}
              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-300">
                    Age
                  </label>

                  <input
                    type="number"
                    min="18"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="18"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                  />
                </div>

              </div>

              {/* INSTAGRAM */}
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Instagram Handle
                </label>

                <input
                  type="text"
                  value={instaId}
                  onChange={(e) => setInstaId(e.target.value)}
                  placeholder="@username"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                />
              </div>

              {/* REFERRAL */}
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  How did you hear about us?
                </label>

                <select
                  value={referralSource}
                  onChange={(e) => setReferralSource(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500"
                >
                  <option value="">Select option</option>
                  <option value="instagram">Instagram</option>
                  <option value="friends">Friends</option>
                  <option value="influencer">Influencer</option>
                  <option value="website">Website</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* DRINK */}
              <div>
                <label className="block mb-3 text-sm text-gray-300">
                  Drink Preference
                </label>

                <div className="grid grid-cols-3 gap-4">

                  <button
                    type="button"
                    onClick={() => setDrinkPreference('alcoholic')}
                    className={`rounded-2xl py-3 border ${
                      drinkPreference === 'alcoholic'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-white/10'
                    }`}
                  >
                    Alcoholic
                  </button>

                  <button
                    type="button"
                    onClick={() => setDrinkPreference('non-alcoholic')}
                    className={`rounded-2xl py-3 border ${
                      drinkPreference === 'non-alcoholic'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-white/10'
                    }`}
                  >
                    Non Alcoholic
                  </button>

                  <button
                    type="button"
                    onClick={() => setDrinkPreference('both')}
                    className={`rounded-2xl py-3 border ${
                      drinkPreference === 'both'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-white/10'
                    }`}
                  >
                    Both
                  </button>

                </div>
              </div>

              {/* FOOD */}
              <div>
                <label className="block mb-3 text-sm text-gray-300">
                  Food Preference
                </label>

                <div className="grid grid-cols-2 gap-4">

                  <button
                    type="button"
                    onClick={() => setFoodPreference('veg')}
                    className={`rounded-2xl py-3 border ${
                      foodPreference === 'veg'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-white/10'
                    }`}
                  >
                    Veg
                  </button>

                  <button
                    type="button"
                    onClick={() => setFoodPreference('non-veg')}
                    className={`rounded-2xl py-3 border ${
                      foodPreference === 'non-veg'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-white/10'
                    }`}
                  >
                    Non Veg
                  </button>

                </div>
              </div>

              {/* PAYMENT */}
              <div>
                <label className="block mb-3 text-sm text-gray-300">
                  Payment Mode
                </label>

                <div className="grid grid-cols-2 gap-4">

                  <button
                    type="button"
                    onClick={() => setPaymentMode('upi')}
                    className={`rounded-2xl py-3 border ${
                      paymentMode === 'upi'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-white/10'
                    }`}
                  >
                    UPI
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('cash')}
                    className={`rounded-2xl py-3 border ${
                      paymentMode === 'cash'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-white/10'
                    }`}
                  >
                    Cash
                  </button>

                </div>
              </div>

              {/* QUANTITY */}
              <div>
                <label className="block mb-3 text-sm text-gray-300">
                  Quantity
                </label>

                <div className="flex items-center gap-5">

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                    className="w-12 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-2xl"
                  >
                    −
                  </button>

                  <span className="text-3xl font-black w-10 text-center">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(Math.min(10, quantity + 1))
                    }
                    className="w-12 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-2xl"
                  >
                    +
                  </button>

                </div>
              </div>

              {/* TOTAL */}
              <div className="border-t border-white/10 pt-8">

                <div className="flex items-center justify-between text-lg text-gray-400">
                  <span>
                    {quantity} × ₹{ticketPrice}
                  </span>

                  <span>
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">

                  <span className="text-2xl font-black uppercase">
                    Total
                  </span>

                  <span className="text-4xl font-black text-red-500">
                    ₹{totalPrice.toFixed(2)}
                  </span>

                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl py-5 bg-red-600 hover:bg-red-700 transition-all font-black text-lg shadow-[0_0_40px_rgba(255,0,0,0.35)] disabled:opacity-50"
              >
                {isLoading
                  ? 'Processing...'
                  : 'Submit Request'}
              </button>

            </form>
          </div>

          {/* BACK */}
          <div className="text-center mt-10">
            <Link
              href="/"
              className="text-red-500 hover:text-red-400 transition"
            >
              ← Back to Event
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}
