import { useState } from 'react'
import { registerCustomer } from '../services/api.js'
import { useAnimation } from '../hooks/useAnimation.js'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useAnimation('form')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await registerCustomer(formData)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-[#a3b18a] rounded-lg shadow-md animate-fade-in mt-[90px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Customer Registration</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}