import { useState, useEffect } from 'react'
import { getServices, createService, updateService, deleteService } from '../../Components/services/api.js'
import { useAnimation } from '../../Components/hooks/useAnimation.js'

export default function ServicesCRUD() {
  const [services, setServices] = useState([])
  const [formData, setFormData] = useState({ name: '', description: '', price: 0 })
  const [editingId, setEditingId] = useState(null)
  useAnimation('crud')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const response = await getServices()
    setServices(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await updateService(editingId, formData)
    } else {
      await createService(formData)
    }
    fetchServices()
    resetForm()
  }

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price
    })
    setEditingId(service._id)
  }

  const handleDelete = async (id) => {
    await deleteService(id)
    fetchServices()
  }

  const resetForm = () => {
    setFormData({ name: '', description: '', price: 0 })
    setEditingId(null)
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Services</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editingId ? 'Update' : 'Add'} Service
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service._id}>
                <td className="py-3 px-4">{service.name}</td>
                <td className="py-3 px-4">{service.description}</td>
                <td className="py-3 px-4">${service.price}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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