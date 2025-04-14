import { useState, useEffect } from 'react'
import { getServices, createBooking } from '../services/api.js'
import { useAnimation } from '../hooks/useAnimation.js'

export default function Booking() {
  const [services, setServices] = useState([])
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    notes: ''
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  useAnimation('booking')

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices()
        setServices(response.data)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createBooking(formData)
      setSuccess(true)
      setFormData({
        service: '',
        date: '',
        time: '',
        notes: ''
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="p-6 text-center">Loading booking form...</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Book a Service</h1>
      
      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          Booking created successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Service</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service._id} value={service._id}>{service.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Additional Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
        
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {submitting ? 'Submitting...' : 'Book Now'}
        </button>
      </form>
    </div>
  )
}