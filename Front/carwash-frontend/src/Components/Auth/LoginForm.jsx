import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useAnimation } from '../hooks/useAnimation'

export default function LoginForm({ isAdmin = false }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  useAnimation('form')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login({ email, password }, isAdmin)
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">{isAdmin ? 'Admin Login' : 'Customer Login'}</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}