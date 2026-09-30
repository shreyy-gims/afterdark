'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

import {
ArrowRight,
BarChart3,
Check,
ChevronRight,
CircleDollarSign,
Download,
Handshake,
Instagram,
Mail,
MapPin,
Megaphone,
PackageCheck,
QrCode,
Sparkles,
Store,
Target,
Users,
X,
Zap,
} from 'lucide-react'

import { Navbar } from '@/components/navbar'



/* =========================================================

   TYPES

========================================================= */



type PackageValue = boolean | string
type SponsorPackage = {
   id: string

  name: string

  price: string

  shortPrice: string

  description: string

  featured?: boolean

}



type Benefit = {

  benefit: string

  bronze: PackageValue

  silver: PackageValue

  gold: PackageValue

  platinum: PackageValue

}



/* =========================================================

   SPONSOR PACKAGES

========================================================= */



const packages: SponsorPackage[] = [

  {
        id: 'bronze',


    name: 'Bronze',

    price: '₹1,00,000',

    shortPrice: '₹1L',

    description:

      'Entry-level brand visibility across the DKAOS event ecosystem.',

  },

  {
        id: 'silver',


    name: 'Silver',

    price: '₹2,00,000',

    shortPrice: '₹2L',

    description:

      'Stronger digital and on-ground presence with audience interaction.',

  },

  {
        id: 'gold',


    name: 'Gold',

    price: '₹3,50,000',

    shortPrice: '₹3.5L',

    description:

      'High-impact event integration with premium brand positioning.',

    featured: true,

  },

  {
        id: 'platinum',


    name: 'Platinum',

    price: '₹5,00,000',

    shortPrice: '₹5L',

    description:

      'Maximum DKAOS visibility with premium integration and exclusivity.',

  },

]



/* =========================================================

   PACKAGE BENEFITS



   Edit these values whenever you negotiate a custom deal.

========================================================= */



const benefits: Benefit[] = [

  {

    benefit: 'Official Sponsor Status',

    bronze: true,

    silver: true,

    gold: true,

    platinum: true,

  },

  {

    benefit: 'Logo on Event Creatives',

    bronze: 'Standard',

    silver: 'Enhanced',

    gold: 'Premium',

    platinum: 'Priority',

  },

  {

    benefit: 'LED / Screen Rotation',

    bronze: 'Standard',

    silver: 'Enhanced',

    gold: 'High',

    platinum: 'Maximum',

  },

  {

    benefit: 'Social Media Integrations',

    bronze: 'Limited',

    silver: 'Included',

    gold: 'Priority',

    platinum: 'Maximum',

  },

  {

    benefit: 'On-Ground Stall / Activation',

    bronze: 'Subject to space',

    silver: 'Standard',

    gold: 'Premium',

    platinum: 'Prime',

  },

  {

    benefit: 'Stage / Host Mentions',

    bronze: 'Limited',

    silver: 'Included',

    gold: 'Priority',

    platinum: 'Priority+',

  },

  {

    benefit: 'Fanpit Passes',

    bronze: '2',

    silver: '4',

    gold: '6',

    platinum: '10',

  },

  {

    benefit: 'General Passes',

    bronze: '4',

    silver: '8',

    gold: '12',

    platinum: '20',

  },

  {

    benefit: 'Category Exclusivity',

    bronze: false,

    silver: false,

    gold: 'Optional',

    platinum: true,

  },

  {

    benefit: 'Dedicated Brand Activation',

    bronze: false,

    silver: 'Optional',

    gold: true,

    platinum: true,

  },

  {

    benefit: 'Post-Event Impact Report',

    bronze: true,

    silver: true,

    gold: true,

    platinum: true,

  },

  {

    benefit: 'Sponsor Wall / Photo Zone',

    bronze: 'Logo',

    silver: 'Enhanced',

    gold: 'Premium',

    platinum: 'Priority',

  },

  {

    benefit: 'QR / Coupon Campaign',

    bronze: false,

    silver: 'Optional',

    gold: true,

    platinum: true,

  },

  {

    benefit: 'Giveaway Collaboration',

    bronze: false,

    silver: 'Optional',

    gold: true,

    platinum: true,

  },

  {

    benefit: 'Creator / Influencer Integration',

    bronze: false,

    silver: 'Limited',

    gold: 'Included',

    platinum: 'Priority',

  },

  {

    benefit: 'Ticket / Wristband Visibility',

    bronze: false,

    silver: false,

    gold: 'Optional',

    platinum: 'Priority',

  },

  {

    benefit: 'VIP / Fanpit Zone Branding',

    bronze: false,

    silver: false,

    gold: 'Optional',

    platinum: true,

  },

  {

    benefit: 'Lead Capture / Sampling Support',

    bronze: false,

    silver: 'Standard',

    gold: 'Enhanced',

    platinum: 'Priority',

  },

  {

    benefit: 'Aftermovie / Recap Visibility',

    bronze: 'Logo',

    silver: 'Included',

    gold: 'Premium',

    platinum: 'Priority',

  },

  {

    benefit: 'Brand Content Usage Assets',

    bronze: 'Selected',

    silver: 'Selected',

    gold: 'Expanded',

    platinum: 'Expanded',

  },

]



/* =========================================================

   BRAND INVENTORY

========================================================= */



const activationInventory = [

  {

    icon: Zap,

    title: 'LED Screens',

    description:

      'Brand films, logos, campaign creatives and sponsor rotations across available event screens.',

  },

  {

    icon: Store,

    title: 'Experience Stall',

    description:

      'Physical space for product showcases, demos, sampling, games and audience interaction.',

  },

  {

    icon: QrCode,

    title: 'QR Activations',

    description:

      'Scan-to-win campaigns, coupons, registrations, surveys, lead capture and digital experiences.',

  },

  {

    icon: Users,

    title: 'Fan Zones',

    description:

      'Brand integrations across available fanpit, audience and experience zones.',

  },

  {

    icon: Megaphone,

    title: 'Stage Visibility',

    description:

      'Host mentions and approved sponsor visibility integrated into the event programme.',

  },

  {

    icon: Instagram,

    title: 'Digital Campaigns',

    description:

      'Pre-event, event-day and post-event brand integrations across DKAOS content.',

  },

]



/* =========================================================

   PARTNERSHIP TYPES

========================================================= */



const partnershipTypes = [

  {

    number: '01',

    title: 'Cash Partnership',

    description:

      'The partner contributes an agreed sponsorship amount in exchange for a defined package of brand deliverables.',

    example: 'Example: ₹2,00,000 sponsorship → Silver partnership',

  },

  {

    number: '02',

    title: 'Barter Partnership',

    description:

      'A partner supplies products or services required for the event in exchange for an agreed level of brand visibility.',

    example:

      'Examples: hotel rooms, transport, printing, beverages, production or media.',

  },

  {

    number: '03',

    title: 'Hybrid Partnership',

    description:

      'A combination of cash and useful event services/products, structured around equivalent partnership value.',

    example: 'Example: ₹70K services + ₹30K cash → ₹1L partnership value',

  },

]



/* =========================================================

   PARTNER CATEGORIES

========================================================= */



const categories = [

  'Automobile',

  'Food & Beverage',

  'Hospitality',

  'Fashion',

  'Education',

  'FinTech',

  'Technology',

  'Healthcare',

  'Fitness',

  'Media',

  'Travel',

  'Local Business',

]



/* =========================================================

   ANIMATION

========================================================= */



const fadeUp = {

  initial: {

    opacity: 0,

    y: 30,

  },

  whileInView: {

    opacity: 1,

    y: 0,

  },

  viewport: {

    once: true,

    amount: 0.15,

  },

  transition: {

    duration: 0.6,

  },

}



/* =========================================================

   VALUE RENDERER

========================================================= */



function PackageValueDisplay({ value }: { value: PackageValue }) {

  if (value === true) {

    return (

      <div className="flex justify-center">

        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/10">

          <Check size={14} className="text-orange-500" />

        </div>

      </div>

    )

  }



  if (value === false) {

    return (

      <div className="flex justify-center">

        <X size={15} className="text-white/15" />

      </div>

    )

  }



  return (

    <span className="text-xs font-medium text-white/55 lg:text-sm">

      {value}

    </span>

  )

}



/* =========================================================

   PAGE

========================================================= */



export default function SponsorsPage() {

  return (

    <main className="min-h-screen overflow-x-hidden bg-[#070707] text-white">

      <Navbar />



      {/* =====================================================

          HERO

      ===================================================== */}



      <section className="relative flex min-h-[78svh] items-end overflow-hidden border-b border-white/[0.06]">



        <div

          className="absolute inset-0 bg-cover bg-center opacity-20"

          style={{

            backgroundImage: "url('/kaosbg.jpeg')",

          }}

        />



        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#070707]/50 to-[#070707]" />



        <div className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-orange-600/10 blur-[160px]" />



        <div

          className="absolute inset-0 opacity-[0.025]"

          style={{

            backgroundImage:

              'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',

            backgroundSize: '70px 70px',

          }}

        />



        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-14 pt-32 sm:px-8 sm:pb-20 lg:px-12">



          <motion.div

            initial={{ opacity: 0, y: 40 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8 }}

          >



            <div className="mb-5 flex items-center gap-3">

              <span className="h-[1px] w-9 bg-orange-500" />



              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-orange-500 sm:text-xs">

                Brands × Culture × Crowd

              </p>

            </div>



            <h1 className="text-[17vw] font-black leading-[0.76] tracking-[-0.07em] sm:text-[13vw] lg:text-[9rem] xl:text-[10.5rem]">

              SPONSORS<span className="text-orange-500">.</span>

            </h1>



            <div className="mt-8 flex flex-col gap-8 border-t border-white/10 pt-7 lg:flex-row lg:items-end lg:justify-between">



              <div>

                <h2 className="max-w-3xl text-2xl font-black tracking-[-0.03em] sm:text-3xl lg:text-4xl">

                  DON'T JUST ADVERTISE.

                  <span className="text-white/30"> BECOME PART OF THE EXPERIENCE.</span>

                </h2>



                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">

                  DKAOS creates opportunities for brands to connect with

                  audiences through live experiences, digital storytelling,

                  activations and measurable engagement.

                </p>

              </div>



              <a

                href="#packages"

                className="group flex w-fit items-center gap-3 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-black transition hover:bg-orange-400"

              >

                View Packages

                <ArrowRight

                  size={16}

                  className="transition-transform group-hover:translate-x-1"

                />

              </a>



            </div>

          </motion.div>

        </div>

      </section>



      {/* =====================================================

          WHY PARTNER

      ===================================================== */}



      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">



        <div className="mx-auto max-w-[1400px]">



          <motion.div

            {...fadeUp}

            className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]"

          >

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">

                Why DKAOS?

              </p>

            </div>



            <div>

              <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-7xl">

                ATTENTION IS EASY.

                <br />

                <span className="text-white/25">

                  CONNECTION IS HARDER.

                </span>

              </h2>



              <p className="mt-8 max-w-3xl text-sm leading-7 text-white/45 sm:text-base">

                Sponsorship should create more than logo visibility. DKAOS

                partnerships can combine physical presence, audience

                interaction, digital amplification and post-event content so

                brands can participate in the culture around the event.

              </p>

            </div>

          </motion.div>



          {/* VALUE CARDS */}



          <div className="mt-16 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">



            {[

              {

                icon: Target,

                title: 'Brand Visibility',

                text: 'Event creatives, LED visibility, physical branding and selected event assets.',

              },

              {

                icon: Users,

                title: 'Audience Access',

                text: 'Interact with young audiences through stalls, sampling, experiences and campaigns.',

              },

              {

                icon: Zap,

                title: 'Digital Amplification',

                text: 'Brand integration across selected pre-event, live-event and post-event content.',

              },

              {

                icon: BarChart3,

                title: 'Measurable Value',

                text: 'Track agreed digital, QR, activation and campaign deliverables after the event.',

              },

            ].map((item, index) => {

              const Icon = item.icon



              return (

                <motion.div

                  {...fadeUp}

                  transition={{

                    duration: 0.6,

                    delay: index * 0.07,

                  }}

                  key={item.title}

                  className="border-b border-white/10 py-9 sm:border-r sm:px-7 lg:min-h-[290px] lg:px-8"

                >

                  <Icon size={25} className="text-orange-500" />



                  <h3 className="mt-16 text-xl font-bold">

                    {item.title}

                  </h3>



                  <p className="mt-4 text-sm leading-6 text-white/40">

                    {item.text}

                  </p>

                </motion.div>

              )

            })}



          </div>

        </div>

      </section>



      {/* =====================================================

          PACKAGES

      ===================================================== */}



      <section

        id="packages"

        className="border-y border-white/[0.06] bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"

      >



        <div className="mx-auto max-w-[1400px]">



          <motion.div {...fadeUp} className="mb-14">



            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">

              Partnership Levels

            </p>



            <h2 className="text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-7xl">

              SPONSORSHIP

              <br />

              <span className="text-white/25">

                PACKAGES.

              </span>

            </h2>



          </motion.div>



          {/* PACKAGE CARDS */}



          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">



            {packages.map((pkg, index) => (



              <motion.div

                {...fadeUp}

                transition={{

                  duration: 0.6,

                  delay: index * 0.06,

                }}

                key={pkg.id}

                className={`relative overflow-hidden rounded-[25px] border p-7 ${

                  pkg.featured

                    ? 'border-orange-500/50 bg-orange-500/[0.07]'

                    : 'border-white/[0.08] bg-[#0d0d0d]'

                }`}

              >



                {pkg.featured && (

                  <div className="absolute right-0 top-0 rounded-bl-2xl bg-orange-500 px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-black">

                    Popular

                  </div>

                )}



                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">

                  {pkg.name}

                </p>



                <p className="mt-7 text-4xl font-black tracking-[-0.05em]">

                  {pkg.price}

                </p>



                <p className="mt-5 min-h-[72px] text-sm leading-6 text-white/40">

                  {pkg.description}

                </p>



                <div className="mt-8 border-t border-white/10 pt-6">



                  <a

                    href="#contact"

                    className={`group flex items-center justify-between rounded-full px-5 py-3 text-sm font-bold transition ${

                      pkg.featured

                        ? 'bg-orange-500 text-black hover:bg-orange-400'

                        : 'border border-white/10 text-white hover:bg-white hover:text-black'

                    }`}

                  >

                    Discuss Package



                    <ArrowRight

                      size={15}

                      className="transition-transform group-hover:translate-x-1"

                    />

                  </a>



                </div>



              </motion.div>

            ))}



          </div>



          <p className="mt-6 text-xs leading-6 text-white/25">

            Packages can be customised according to event inventory,

            partnership category, campaign requirements, barter value and

            mutually agreed deliverables.

          </p>



        </div>

      </section>



      {/* =====================================================

          FULL COMPARISON TABLE

      ===================================================== */}



      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">



        <div className="mx-auto max-w-[1400px]">



          <motion.div

            {...fadeUp}

            className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"

          >



            <div>



              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">

                Full Comparison

              </p>



              <h2 className="text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-6xl">

                WHAT YOU GET.

              </h2>



            </div>



            <p className="max-w-md text-sm leading-6 text-white/35">

              Compare the standard visibility and activation opportunities

              available at each partnership level.

            </p>



          </motion.div>



          {/* =================================================

              DESKTOP TABLE

          ================================================= */}



          <motion.div

            {...fadeUp}

            className="hidden overflow-hidden rounded-[25px] border border-white/10 lg:block"

          >



            <div className="overflow-x-auto">



              <table className="w-full min-w-[1000px] border-collapse">



                <thead>



                  <tr className="bg-[#101010]">



                    <th className="w-[28%] border-b border-white/10 px-6 py-6 text-left text-xs font-bold uppercase tracking-[0.2em] text-white/35">

                      Deliverable

                    </th>



                    {packages.map((pkg) => (

                      <th

                        key={pkg.id}

                        className={`border-b border-l border-white/10 px-4 py-6 text-center ${

                          pkg.featured

                            ? 'bg-orange-500/[0.07]'

                            : ''

                        }`}

                      >

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">

                          {pkg.name}

                        </p>



                        <p className="mt-2 text-lg font-black">

                          {pkg.shortPrice}

                        </p>

                      </th>

                    ))}



                  </tr>



                </thead>



                <tbody>



                  {benefits.map((row, index) => (



                    <tr

                      key={row.benefit}

                      className={`transition hover:bg-white/[0.025] ${

                        index % 2 === 0

                          ? 'bg-[#090909]'

                          : 'bg-[#0c0c0c]'

                      }`}

                    >



                      <td className="border-b border-white/[0.06] px-6 py-5 text-sm font-medium text-white/70">

                        {row.benefit}

                      </td>



                      <td className="border-b border-l border-white/[0.06] px-4 py-5 text-center">

                        <PackageValueDisplay value={row.bronze} />

                      </td>



                      <td className="border-b border-l border-white/[0.06] px-4 py-5 text-center">

                        <PackageValueDisplay value={row.silver} />

                      </td>



                      <td className="border-b border-l border-orange-500/10 bg-orange-500/[0.025] px-4 py-5 text-center">

                        <PackageValueDisplay value={row.gold} />

                      </td>



                      <td className="border-b border-l border-white/[0.06] px-4 py-5 text-center">

                        <PackageValueDisplay value={row.platinum} />

                      </td>



                    </tr>



                  ))}



                </tbody>



              </table>



            </div>



          </motion.div>



          {/* =================================================

              MOBILE PACKAGE TABLES



              Separate tables are much easier to read on phones

              than forcing a 5-column comparison.

          ================================================= */}



          <div className="space-y-5 lg:hidden">



            {packages.map((pkg, packageIndex) => (



              <motion.div

                {...fadeUp}

                transition={{

                  duration: 0.5,

                  delay: packageIndex * 0.04,

                }}

                key={pkg.id}

                className={`overflow-hidden rounded-[24px] border ${

                  pkg.featured

                    ? 'border-orange-500/40'

                    : 'border-white/10'

                }`}

              >



                <div

                  className={`flex items-center justify-between px-5 py-5 ${

                    pkg.featured

                      ? 'bg-orange-500 text-black'

                      : 'bg-[#101010]'

                  }`}

                >

                  <div>

                    <p className="text-xs font-black uppercase tracking-[0.2em]">

                      {pkg.name}

                    </p>



                    <p className="mt-1 text-2xl font-black">

                      {pkg.price}

                    </p>

                  </div>



                  {pkg.featured && (

                    <Sparkles size={20} />

                  )}

                </div>



                <div className="bg-[#0a0a0a]">



                  {benefits.map((row) => {



                    const key =

                      pkg.name.toLowerCase() as

                        | 'bronze'

                        | 'silver'

                        | 'gold'

                        | 'platinum'



                    return (

                      <div

                        key={`${pkg.name}-${row.benefit}`}

                        className="grid grid-cols-[1.3fr_0.7fr] items-center border-b border-white/[0.06] px-5 py-4"

                      >

                        <p className="text-xs leading-5 text-white/50">

                          {row.benefit}

                        </p>



                        <div className="text-right">

                          <PackageValueDisplay value={row[key]} />

                        </div>

                      </div>

                    )

                  })}



                </div>



              </motion.div>

            ))}



          </div>



          {/* TABLE DISCLAIMER */}



          <div className="mt-6 rounded-2xl border border-orange-500/10 bg-orange-500/[0.03] px-5 py-4">



            <p className="text-xs leading-6 text-white/35">

              Final deliverables depend on available event inventory,

              category exclusivity, production feasibility, signed agreement

              and any approvals required from the artist, venue or relevant

              partners. Artist endorsement, personal artist posts,

              meet-and-greets or artist-led brand promotion are not implied

              unless separately approved in writing.

            </p>



          </div>



        </div>

      </section>



      {/* =====================================================

          ACTIVATION INVENTORY

      ===================================================== */}



      <section className="border-y border-white/[0.06] bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">



        <div className="mx-auto max-w-[1400px]">



          <motion.div {...fadeUp} className="mb-14">



            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">

              Activation Inventory

            </p>



            <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-7xl">

              PUT YOUR BRAND

              <br />

              <span className="text-white/25">

                INSIDE THE EVENT.

              </span>

            </h2>



          </motion.div>



          <div className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">



            {activationInventory.map((item, index) => {



              const Icon = item.icon



              return (

                <motion.div

                  {...fadeUp}

                  transition={{

                    duration: 0.6,

                    delay: index * 0.05,

                  }}

                  key={item.title}

                  className="border-b border-white/10 py-9 sm:border-r sm:px-7 lg:min-h-[300px] lg:px-9"

                >

                  <Icon

                    size={25}

                    strokeWidth={1.5}

                    className="text-orange-500"

                  />



                  <p className="mt-16 text-[10px] font-bold text-white/20">

                    0{index + 1}

                  </p>



                  <h3 className="mt-3 text-2xl font-bold">

                    {item.title}

                  </h3>



                  <p className="mt-4 text-sm leading-6 text-white/40">

                    {item.description}

                  </p>

                </motion.div>

              )

            })}



          </div>

        </div>

      </section>



      {/* =====================================================

          PARTNERSHIP MODELS

      ===================================================== */}



      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">



        <div className="mx-auto max-w-[1400px]">



          <motion.div

            {...fadeUp}

            className="mb-14 grid gap-8 lg:grid-cols-2"

          >



            <div>

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">

                Flexible Partnerships

              </p>



              <h2 className="text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-6xl">

                CASH.

                <br />

                BARTER.

                <br />

                <span className="text-white/25">

                  OR BOTH.

                </span>

              </h2>

            </div>



            <div className="flex items-end">

              <p className="max-w-xl text-sm leading-7 text-white/40 sm:text-base">

                Not every valuable partnership has to be 100% cash. We can

                structure collaborations around services and resources that

                genuinely reduce event costs while still delivering value to

                the partner.

              </p>

            </div>



          </motion.div>



          <div className="grid gap-4 lg:grid-cols-3">



            {partnershipTypes.map((type, index) => (



              <motion.div

                {...fadeUp}

                transition={{

                  duration: 0.6,

                  delay: index * 0.07,

                }}

                key={type.title}

                className="rounded-[25px] border border-white/[0.08] bg-[#0d0d0d] p-7 sm:p-8"

              >



                <div className="flex items-center justify-between">



                  <Handshake

                    size={24}

                    className="text-orange-500"

                  />



                  <span className="text-xs font-bold text-white/20">

                    {type.number}

                  </span>



                </div>



                <h3 className="mt-12 text-2xl font-bold">

                  {type.title}

                </h3>



                <p className="mt-4 text-sm leading-6 text-white/40">

                  {type.description}

                </p>



                <div className="mt-7 rounded-2xl bg-white/[0.035] px-4 py-4">



                  <p className="text-xs leading-5 text-white/50">

                    {type.example}

                  </p>



                </div>



              </motion.div>



            ))}



          </div>

        </div>

      </section>



      {/* =====================================================

          STRATEGIC PARTNER CATEGORIES

      ===================================================== */}



      <section className="border-y border-white/[0.06] bg-[#0a0a0a] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">



        <div className="mx-auto max-w-[1400px]">



          <motion.div

            {...fadeUp}

            className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"

          >



            <div>



              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">

                Who Can Partner?

              </p>



              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">

                BUILT FOR

                <br />

                <span className="text-white/25">

                  EVERY CATEGORY.

                </span>

              </h2>



            </div>



            <div className="flex flex-wrap content-start gap-3">



              {categories.map((category, index) => (



                <motion.div

                  initial={{

                    opacity: 0,

                    scale: 0.95,

                  }}

                  whileInView={{

                    opacity: 1,

                    scale: 1,

                  }}

                  viewport={{ once: true }}

                  transition={{

                    delay: index * 0.035,

                  }}

                  key={category}

                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/60 transition hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400"

                >

                  {category}

                </motion.div>



              ))}



            </div>



          </motion.div>



        </div>

      </section>



      {/* =====================================================

          MEASUREMENT TABLE

      ===================================================== */}



      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">



        <div className="mx-auto max-w-[1400px]">



          <motion.div {...fadeUp} className="mb-12">



            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">

              Accountability

            </p>



            <h2 className="text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-6xl">

              MEASURABLE

              <span className="text-white/25"> VALUE.</span>

            </h2>



          </motion.div>



          <motion.div

            {...fadeUp}

            className="overflow-hidden rounded-[25px] border border-white/10"

          >



            <div className="overflow-x-auto">



              <table className="w-full min-w-[720px]">



                <thead>



                  <tr className="bg-[#101010]">



                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">

                      Area

                    </th>



                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">

                      Possible Measurement

                    </th>



                    <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">

                      Reporting

                    </th>



                  </tr>



                </thead>



                <tbody>



                  {[

                    [

                      'Digital Content',

                      'Views, reach, engagement and selected content performance',

                      'Post-event',

                    ],

                    [

                      'QR Campaign',

                      'Scans, registrations, coupon interactions or campaign actions',

                      'Campaign report',

                    ],

                    [

                      'Brand Activation',

                      'Sampling, participation or interaction data where trackable',

                      'Activation summary',

                    ],

                    [

                      'Deliverables',

                      'Agreed posts, placements, mentions and branding inventory',

                      'Delivery audit',

                    ],

                    [

                      'Event Content',

                      'Selected event photographs/videos containing brand visibility',

                      'Media assets',

                    ],

                  ].map((row, index) => (



                    <tr

                      key={row[0]}

                      className={

                        index % 2 === 0

                          ? 'bg-[#090909]'

                          : 'bg-[#0c0c0c]'

                      }

                    >



                      <td className="border-t border-white/[0.06] px-6 py-5 text-sm font-semibold">

                        {row[0]}

                      </td>



                      <td className="border-t border-white/[0.06] px-6 py-5 text-sm leading-6 text-white/45">

                        {row[1]}

                      </td>



                      <td className="border-t border-white/[0.06] px-6 py-5 text-sm text-orange-500">

                        {row[2]}

                      </td>



                    </tr>



                  ))}



                </tbody>



              </table>



            </div>



          </motion.div>



        </div>

      </section>



      {/* =====================================================

          CUSTOM PARTNERSHIPS

      ===================================================== */}



      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">



        <motion.div

          {...fadeUp}

          className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[30px] border border-white/10 bg-[#0d0d0d] p-7 sm:p-10 lg:p-14"

        >



          <div className="absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-orange-600/10 blur-[130px]" />



          <div className="relative z-10 grid gap-12 lg:grid-cols-2">



            <div>



              <PackageCheck

                size={26}

                className="text-orange-500"

              />



              <h2 className="mt-8 text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-5xl">

                NEED SOMETHING

                <br />

                <span className="text-white/25">

                  DIFFERENT?

                </span>

              </h2>



            </div>



            <div className="flex flex-col justify-end">



              <p className="max-w-xl text-sm leading-7 text-white/45 sm:text-base">

                Strategic partners don't have to fit into Bronze, Silver,

                Gold or Platinum. DKAOS can build custom partnerships around

                category exclusivity, hospitality, mobility, hydration,

                technology, media, production or other high-value

                collaborations.

              </p>



              <a

                href="#contact"

                className="group mt-8 flex w-fit items-center gap-3 border-b border-orange-500 pb-2 text-sm font-bold"

              >

                Build A Custom Partnership



                <ArrowRight

                  size={16}

                  className="text-orange-500 transition-transform group-hover:translate-x-1"

                />

              </a>



            </div>



          </div>



        </motion.div>

      </section>



      {/* =====================================================

          CONTACT CTA

      ===================================================== */}



      <section

        id="contact"

        className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12"

      >



        <motion.div

          {...fadeUp}

          className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] bg-orange-500 p-7 text-black sm:p-12 lg:p-16"

        >



          <div className="pointer-events-none absolute -bottom-16 -right-5 text-[180px] font-black leading-none tracking-[-0.08em] text-black/[0.05] sm:text-[300px]">

            D

          </div>



          <div className="relative z-10">



            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/50">

              Let's Build Something Together

            </p>



            <h2 className="mt-5 max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.055em] sm:text-6xl lg:text-8xl">

              YOUR BRAND.

              <br />

              OUR CROWD.

              <br />

              ONE MOMENT.

            </h2>



            <div className="mt-12 grid gap-4 lg:grid-cols-3">



              {/* EMAIL */}



              <a

                href="mailto:daa.kaOs.official@gmail.com"

                className="group rounded-[22px] bg-black p-6 text-white transition hover:-translate-y-1"

              >



                <Mail

                  size={20}

                  className="text-orange-500"

                />



                <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">

                  Email

                </p>



                <p className="mt-2 break-all text-sm font-semibold sm:text-base">

                  daa.kaOs.official@gmail.com

                </p>



              </a>



              {/* INSTAGRAM */}



              <a

                href="https://www.instagram.com/da.ka0s"

                target="_blank"

                rel="noopener noreferrer"

                className="group rounded-[22px] bg-black p-6 text-white transition hover:-translate-y-1"

              >



                <Instagram

                  size={20}

                  className="text-orange-500"

                />



                <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">

                  Instagram

                </p>



                <p className="mt-2 text-sm font-semibold sm:text-base">

                  @da.ka0s

                </p>



              </a>



              {/* LOCATION */}



              <div className="rounded-[22px] bg-black p-6 text-white">



                <MapPin

                  size={20}

                  className="text-orange-500"

                />



                <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">

                  Based In

                </p>



                <p className="mt-2 text-sm font-semibold sm:text-base">

                  Bhilai, Chhattisgarh

                </p>



              </div>



            </div>



          </div>



        </motion.div>

      </section>



      {/* =====================================================

          FOOTER

      ===================================================== */}



      <footer className="border-t border-white/[0.06] bg-[#050505] px-5 pb-8 pt-16 sm:px-8 lg:px-12">



        <div className="mx-auto max-w-[1400px]">



          <p className="text-[19vw] font-black leading-[0.7] tracking-[-0.075em] sm:text-[15vw] lg:text-[9rem]">

            D<span className="text-orange-500">KAOS</span>

          </p>



          <div className="mt-14 flex flex-col gap-8 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">



            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/40">



              <Link href="/" className="hover:text-white">

                Home

              </Link>



              <Link href="/events" className="hover:text-white">

                Events

              </Link>



              <Link href="/calendar" className="hover:text-white">

                Calendar

              </Link>



              <Link href="/sponsors" className="text-orange-500">

                Sponsors

              </Link>



              <Link href="/rules" className="hover:text-white">

                Rules

              </Link>



            </div>



            <p className="text-[10px] uppercase tracking-[0.25em] text-white/20">

              Culture × Crowd × Kaos

            </p>



          </div>



          <div className="mt-8 text-[10px] text-white/20">

            © 2026 DKAOS. All rights reserved.

          </div>



        </div>

      </footer>



    </main>

  )

}