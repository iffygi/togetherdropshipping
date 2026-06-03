'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    setLoading(false)

    if (data.success) {
      router.push('/dashboard')
    } else {
      setError(data.error)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a3a6e] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1a3a6e] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">TD</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1a3a6e]">TogetherDropshipping</h1>
          <p className="text-gray-500 mt-1">Apne account mein login karein</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a6e]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a6e]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a3a6e] text-white rounded-lg py-3 font-semibold hover:bg-blue-900 transition disabled:opacity-50"
          >
            {loading ? 'Login ho raha hai...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}