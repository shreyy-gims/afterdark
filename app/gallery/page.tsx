'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Upload, Users, Star, Calendar, Image as ImageIcon, X, Download, Share2 } from 'lucide-react'
import Link from 'next/link'

interface GalleryImage {
  id: string
  src: string
  title: string
  eventName: string
  uploadedAt: Date
}

const mockGalleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop',
    title: 'Summer Vibes Night',
    eventName: 'AfterDark Summer 2024',
    uploadedAt: new Date('2024-08-15'),
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
    title: 'Midnight Beats',
    eventName: 'AfterDark Summer 2024',
    uploadedAt: new Date('2024-08-15'),
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop',
    title: 'Dance Floor Energy',
    eventName: 'Spring Soirée 2024',
    uploadedAt: new Date('2024-06-20'),
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=500&fit=crop',
    title: 'VIP Lounge Moments',
    eventName: 'Spring Soirée 2024',
    uploadedAt: new Date('2024-06-20'),
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=500&fit=crop',
    title: 'Crowd Vibes',
    eventName: 'Winter Wonderland 2023',
    uploadedAt: new Date('2023-12-10'),
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1478268413188-712a97205829?w=500&h=500&fit=crop',
    title: 'Stage Performance',
    eventName: 'Winter Wonderland 2023',
    uploadedAt: new Date('2023-12-10'),
  },
]

const eventStats = {
  totalEvents: 7,
  totalAttendees: 2800,
  successRating: 4.8,
  nextEvent: 'AfterDark Midnight Soirée',
  nextEventDate: 'June 23, 2026',
}

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(mockGalleryImages)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        setIsUploading(true)

        // Simulate file upload progress
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval)
              setIsUploading(false)

              // Add mock image to gallery
              const reader = new FileReader()
              reader.onload = (event) => {
                const newImage: GalleryImage = {
                  id: Date.now().toString() + i,
                  src: event.target?.result as string,
                  title: file.name.replace(/\.[^/.]+$/, ''),
                  eventName: 'Recently Uploaded',
                  uploadedAt: new Date(),
                }
                setGalleryImages((prev) => [newImage, ...prev])
              }
              reader.readAsDataURL(file)
              return 100
            }
            return prev + Math.random() * 30
          })
        }, 300)
      }
      setUploadProgress(0)
    }
  }

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
              <ImageIcon size={16} />
              <span className="text-sm font-semibold">Event Gallery</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-balance">
                <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                  Moments Captured
                </span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 mx-auto" />
            </div>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Relive the magic of our exclusive events. Browse through memories of unforgettable nights.
            </p>
          </motion.div>

          {/* Event Statistics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="glassmorphism rounded-xl p-6 text-center space-y-2 border border-red-600/20 hover:border-red-600/40"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(220, 38, 38, 0.2)' }}
            >
              <Calendar size={24} className="mx-auto text-red-500" />
              <p className="text-3xl md:text-4xl font-bold text-white">{eventStats.totalEvents}</p>
              <p className="text-sm text-gray-400">Successful Events</p>
            </motion.div>

            <motion.div
              className="glassmorphism rounded-xl p-6 text-center space-y-2 border border-red-600/20 hover:border-red-600/40"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(220, 38, 38, 0.2)' }}
              transition={{ delay: 0.1 }}
            >
              <Users size={24} className="mx-auto text-red-500" />
              <p className="text-3xl md:text-4xl font-bold text-white">{eventStats.totalAttendees.toLocaleString()}</p>
              <p className="text-sm text-gray-400">Total Attendees</p>
            </motion.div>

            <motion.div
              className="glassmorphism rounded-xl p-6 text-center space-y-2 border border-red-600/20 hover:border-red-600/40"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(220, 38, 38, 0.2)' }}
              transition={{ delay: 0.2 }}
            >
              <Star size={24} className="mx-auto text-red-500" />
              <p className="text-3xl md:text-4xl font-bold text-white">{eventStats.successRating}</p>
              <p className="text-sm text-gray-400">Success Rating</p>
            </motion.div>

            <motion.div
              className="glassmorphism rounded-xl p-6 text-center space-y-2 border border-red-600/20 hover:border-red-600/40"
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(220, 38, 38, 0.2)' }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-sm text-gray-400">Next Event</div>
              <p className="text-lg md:text-xl font-bold text-red-400">{eventStats.nextEvent}</p>
              <p className="text-xs text-gray-500">{eventStats.nextEventDate}</p>
            </motion.div>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div
              onClick={handleUploadClick}
              className="glassmorphism rounded-xl p-8 md:p-12 border-2 border-dashed border-red-600/40 hover:border-red-600/70 transition-all cursor-pointer group hover:bg-white/5"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="text-center space-y-4">
                <motion.div whileHover={{ scale: 1.1 }} className="inline-block">
                  <Upload size={48} className="text-red-500 group-hover:text-red-400" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                    Upload Event Photos
                  </h3>
                  <p className="text-gray-400">
                    Drag and drop your photos here or click to browse. Support JPG, PNG, WebP
                  </p>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-red-500 to-red-700 h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-sm text-red-400">{Math.round(uploadProgress)}% uploaded</p>
                  </div>
                )}

                {!isUploading && (
                  <motion.button
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Choose Photos
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Gallery</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-700" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="group glassmorphism rounded-xl overflow-hidden border border-red-600/20 hover:border-red-600/40 cursor-pointer relative"
                  onClick={() => setSelectedImage(image)}
                  whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(220, 38, 38, 0.25)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-white group-hover:text-red-400 transition-colors">{image.title}</h3>
                    <p className="text-sm text-gray-400">{image.eventName}</p>
                    <p className="text-xs text-gray-500">
                      {image.uploadedAt.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  {/* Hover overlay with actions */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <motion.button
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Download size={20} />
                    </motion.button>
                    <motion.button
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-20 glassmorphism rounded-xl p-8 md:p-12 text-center space-y-6 border border-red-600/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Be Part of the Next <span className="text-red-500">AfterDark</span> Experience
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Book your tickets for our upcoming events and create unforgettable memories with us
            </p>
            <Link href="/tickets">
              <motion.button
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Your Tickets
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 rounded-xl overflow-hidden max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-red-600 hover:bg-red-700 rounded-full z-10"
            >
              <X size={24} />
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto max-h-96 object-cover"
            />

            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-bold text-white">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.eventName}</p>
              <p className="text-sm text-gray-400">
                {selectedImage.uploadedAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <div className="flex gap-3 pt-4">
                <motion.button
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={18} />
                  Download
                </motion.button>
                <motion.button
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 size={18} />
                  Share
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}
