import { useEffect, useState } from 'react'
import {  getUserBookings, getUserPackages } from '../services/api.js'
import { useAnimation } from '../hooks/useAnimation.js'

export default function Dashboard() {
  const [stats, setStats] = useState({ bookings: 0, packages: 0 })
  useAnimation('dashboard')

  useEffect(() => {
    const fetchData = async () => {
      const [bookingsRes, packagesRes] = await Promise.all([
        getUserBookings(),
        getUserPackages()
      ])
      setStats({
        bookings: bookingsRes.data.length,
        packages: packagesRes.data.length
      })
    }
    fetchData()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Your Bookings</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.bookings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Your Packages</h2>
          <p className="text-4xl font-bold text-green-600">{stats.packages}</p>
        </div>
      </div>
    </div>
  )
}