'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const supabase = createClient()

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setLoading(true)

    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      )

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    router.push('/admin')
  }

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center p-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2rem] p-10"
      >
        <h1 className="text-4xl font-black mb-8 text-center italic">
          ADMIN LOGIN
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-4 font-bold"
          >
            {loading
              ? 'Logging in...'
              : 'LOGIN'}
          </button>

        </div>
      </form>
    </main>
  )
}