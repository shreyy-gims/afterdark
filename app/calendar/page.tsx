'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'

interface Event {
  date: number
  month: number
  year: number
  title: string
  time: string
  daysUntil: number
  venue: string
  price: number
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const router = useRouter()

  const now = new Date()
  const today = now.getDate()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()

  // Mock events - Replace with real data from database
  const allEvents: Event[] = [
    {
      date: 23,
      month: 6,
      year: 2026,
      title: 'ADS - Traditional Hours',
      time: '11:00 AM',
      daysUntil: 23,
      venue: 'The Underground',
      price: 500,
    },
    
  ]

  // Get events for current month
  const monthEvents = useMemo(() => {
    return allEvents.filter(
      (event) => event.month === currentMonth + 1 && event.year === currentYear
    )
  }, [currentMonth, currentYear])

  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear)

  // Get events for a specific date
  const getEventsForDate = (date: number) => {
    return monthEvents.filter((event) => event.date === date)
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
    setSelectedDate(null)
  }

  const handleBookTickets = (event: Event) => {
    router.push(`/tickets?event=${event.title}&date=${event.date}/${event.month}/${event.year}`)
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const calendarDays = Array.from({ length: firstDayOfMonth }).fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <main className="bg-background text-foreground min-h-screen bg-gradient-to-b from-transparent via-red-600/5 to-transparent">
      <Navbar />
      
      {/* Decorative glow effects */}
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none opacity-50" />
      <div className="fixed bottom-1/4 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none opacity-50" />
      
      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center space-y-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glassmorphism rounded-full text-red-400 border border-red-600/30">
              <Calendar size={16} />
              <span className="text-sm font-semibold">Event Calendar 2026</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-balance">
                <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                  Explore All Events
                </span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 mx-auto" />
            </div>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover the most exclusive events of the season. Click any date with an event to book your tickets now.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar Section */}
            <motion.div
              className="lg:col-span-2 glassmorphism rounded-xl p-6 md:p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Month Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {monthNames[currentMonth]}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">{currentYear}</p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={handlePrevMonth}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-gray-700/50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  <motion.button
                    onClick={handleNextMonth}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-gray-700/50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  const isToday = day === today && currentMonth === thisMonth && currentYear === thisYear
                  const hasEvents = day ? getEventsForDate(day).length > 0 : false
                  const isSelected = day === selectedDate

                  return (
                    <motion.button
                      key={index}
                      onClick={() => day && setSelectedDate(day)}
                      className={`aspect-square rounded-lg p-2 text-sm font-medium transition-all flex flex-col items-center justify-center relative ${
                        !day
                          ? ''
                          : isSelected
                          ? 'bg-red-600 text-white'
                          : isToday
                          ? 'bg-red-500/20 border border-red-500 text-red-400'
                          : hasEvents
                          ? 'bg-red-500/10 hover:bg-red-500/20 text-white border border-red-500/30'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                      whileHover={day ? { scale: 1.05 } : {}}
                      whileTap={day ? { scale: 0.95 } : {}}
                    >
                      {day && (
                        <>
                          <span>{day}</span>
                          {hasEvents && (
                            <div className="flex gap-1 mt-1">
                              {getEventsForDate(day).map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1.5 h-1.5 rounded-full bg-red-400"
                                />
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-gray-700/50 space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-lg bg-red-500/20 border border-red-500" />
                  <span>Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>Event available</span>
                </div>
              </div>
            </motion.div>

            {/* Events Panel */}
            <motion.div
              className="lg:col-span-1 space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {selectedDateEvents.length > 0 ? (
                <>
                  <div className="glassmorphism rounded-xl p-6 space-y-2 sticky top-24">
                    <h3 className="text-lg font-bold text-red-400">
                      {monthNames[currentMonth]} {selectedDate}, {currentYear}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''} available
                    </p>
                  </div>

                  {selectedDateEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      className="glassmorphism rounded-xl p-4 sm:p-6 space-y-3 hover:bg-white/10 transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="font-bold text-white text-base sm:text-lg leading-tight">
                        {event.title}
                      </h4>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-red-400 flex-shrink-0" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-red-400 flex-shrink-0" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-700/50 flex items-center justify-between">
                        <span className="text-lg font-bold text-red-500">₹{event.price}</span>
                        <span className="text-xs text-gray-400">{event.daysUntil} days left</span>
                      </div>
                      <motion.button
                        onClick={() => handleBookTickets(event)}
                        className="w-full mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Book Tickets
                      </motion.button>
                    </motion.div>
                  ))}
                </>
              ) : (
                <motion.div
                  className="glassmorphism rounded-xl p-6 h-full flex flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Calendar size={48} className="text-red-500/50 mb-4" />
                  <p className="text-gray-400">
                    {selectedDate
                      ? 'No events on this date'
                      : 'Select a date to view events'}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Upcoming Events Preview */}
          <motion.div
            className="mt-20 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Upcoming Events</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-700" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allEvents.slice(0, 6).map((event, index) => (
                <motion.div
                  key={index}
                  className="group glassmorphism rounded-xl p-6 space-y-4 hover:bg-white/10 transition-all cursor-pointer border border-red-600/20 hover:border-red-600/40 overflow-hidden relative"
                  onClick={() => handleBookTickets(event)}
                  whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(220, 38, 38, 0.25)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-red-600/10 transition-all" />
                  
                  <div className="relative z-10 space-y-3">
                    <div className="inline-block px-3 py-1 rounded-full bg-red-600/20 border border-red-600/30">
                      <p className="text-xs font-semibold text-red-400">{event.daysUntil} Days Left</p>
                    </div>
                    <h3 className="font-bold text-white leading-tight text-lg group-hover:text-red-400 transition-colors">{event.title}</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-red-400 flex-shrink-0" />
                        <span>{monthNames[event.month - 1]} {event.date}, {event.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-red-400 flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-red-400 flex-shrink-0" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 pt-4 border-t border-gray-700/50 flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-500">₹{event.price}</span>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBookTickets(event)
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
