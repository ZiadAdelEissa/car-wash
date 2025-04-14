import { useState, useEffect } from 'react'
import { getSystemStats } from '../services/api.js'
import { useAnimation } from '../hooks/useAnimation.js'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    services: 0,
    packages: 0,
    branches: 0
  })
  const [loading, setLoading] = useState(true)
  useAnimation('dashboard')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getSystemStats()
        setStats(response.data)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>

  return (
    <div className="p-6 flex flex-col items-center justify-center text-center mt-[50px]">
            <img src="https://i.ibb.co/mFSmqjCg/pexels-tima-miroshnichenko-6873123.jpg" alt="Logo" className=" mb-6 bg-cover bg-center absolute -z-10" />

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md dashboard-stats">
          <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.bookings}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md dashboard-stats">
          <h2 className="text-xl font-semibold mb-2">Services</h2>
          <p className="text-4xl font-bold text-green-600">{stats.services}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md dashboard-stats">
          <h2 className="text-xl font-semibold mb-2">Packages</h2>
          <p className="text-4xl font-bold text-purple-600">{stats.packages}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md dashboard-stats">
          <h2 className="text-xl font-semibold mb-2">Branches</h2>
          <p className="text-4xl font-bold text-orange-600">{stats.branches}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/admin/services" className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200">
            Manage Services
          </a>
          <a href="/admin/packages" className="bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200">
            Manage Packages
          </a>
          <a href="/admin/branches" className="bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200">
            Manage Branches
          </a>
          <a href="/admin/bookings" className="bg-orange-100 text-orange-700 px-4 py-2 rounded hover:bg-orange-200">
            View Bookings
          </a>
        </div>
      </div>
    </div>
  )
}