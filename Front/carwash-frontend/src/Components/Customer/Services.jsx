import { useState, useEffect } from 'react'
import { getServices } from '../services/api.js'
import { useAnimation } from '../hooks/useAnimation.js'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  useAnimation('services')

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

  if (loading) return <div className="p-6 text-center">Loading services...</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">${service.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}