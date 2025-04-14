import { useState, useEffect } from 'react'
import { getPackages, purchasePackage } from '../services/api.js'
import { useAnimation } from '../hooks/useAnimation.js'

export default function Packages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  useAnimation('packages')

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getPackages()
        setPackages(response.data)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const handlePurchase = async (id) => {
    try {
      await purchasePackage(id)
      alert('Package purchased successfully!')
    } catch (error) {
      alert('Failed to purchase package')
    }
  }

  if (loading) return <div className="p-6 text-center">Loading packages...</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Packages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div key={pkg._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Includes:</h4>
                {/* <ul className="list-disc pl-5">
                  {pkg.services.map(service => (
                    <li key={service._id}>{service.name}</li>
                  ))}
                </ul> */}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">${pkg.price}</span>
                <button 
                  onClick={() => handlePurchase(pkg._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}