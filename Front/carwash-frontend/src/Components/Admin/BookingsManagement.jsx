import { useState, useEffect } from 'react'
import { getAllBookings, updateBookingStatus, deleteBooking } from '../services/api.js'
import { useAnimation } from '../hooks/useAnimation.js'

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  useAnimation('bookings')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAllBookings()
        setBookings(response.data)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      await updateBookingStatus(id, status)
      const response = await getAllBookings()
      setBookings(response.data)
    } catch (error) {
      alert('Failed to update booking status')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(id)
        const response = await getAllBookings()
        setBookings(response.data)
      } catch (error) {
        alert('Failed to delete booking')
      }
    }
  }

  if (loading) {
    return <div className="p-6 text-center">Loading bookings...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="py-3 px-4">{booking.customer?.name || 'N/A'}</td>
                <td className="py-3 px-4">{booking.service?.name || 'N/A'}</td>
                <td className="py-3 px-4">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="py-3 px-4">{booking.time}</td>
                <td className="py-3 px-4">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    className={`px-2 py-1 rounded text-xs ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}