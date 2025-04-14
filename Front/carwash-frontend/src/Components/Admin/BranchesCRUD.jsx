import { useState, useEffect } from 'react'
import { getAllBranches, createBranch, updateBranch, getBranchStats } from '../services/api.js'
import { useAnimation } from '../hooks/useAnimation.js'

export default function BranchesCRUD() {
  const [branches, setBranches] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    manager: ''
  })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  useAnimation('crud')

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await getAllBranches()
        setBranches(response.data)
      } finally {
        setLoading(false)
      }
    }
    fetchBranches()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        await updateBranch(editingId, formData)
      } else {
        await createBranch(formData)
      }
      const response = await getAllBranches()
      setBranches(response.data)
      resetForm()
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (branch) => {
    setFormData({
      name: branch.name,
      location: branch.location,
      phone: branch.phone,
      manager: branch.manager
    })
    setEditingId(branch._id)
  }

  const fetchStats = async (id) => {
    try {
      const response = await getBranchStats(id)
      setStats(response.data)
    } catch (error) {
      setStats(null)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      phone: '',
      manager: ''
    })
    setEditingId(null)
    setStats(null)
  }

  if (loading && branches.length === 0) return <div className="p-6 text-center">Loading branches...</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Branches</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Branch' : 'Add New Branch'}</h2>
            
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
                <label className="block text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Manager</label>
                <input
                  type="text"
                  value={formData.manager}
                  onChange={(e) => setFormData({...formData, manager: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? 'Processing...' : editingId ? 'Update' : 'Add'} Branch
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
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
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Manager</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {branches.map(branch => (
                  <tr key={branch._id}>
                    <td className="py-3 px-4">{branch.name}</td>
                    <td className="py-3 px-4">{branch.location}</td>
                    <td className="py-3 px-4">{branch.phone}</td>
                    <td className="py-3 px-4">{branch.manager}</td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(branch)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => fetchStats(branch._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Stats
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {stats && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Branch Statistics</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Total Bookings</h3>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
              </div>
              <div>
                <h3 className="font-medium">Active Bookings</h3>
                <p className="text-2xl font-bold">{stats.activeBookings}</p>
              </div>
              <div>
                <h3 className="font-medium">Revenue</h3>
                <p className="text-2xl font-bold">${stats.revenue}</p>
              </div>
              <div>
                <h3 className="font-medium">Popular Services</h3>
                <ul className="list-disc pl-5 mt-2">
                  {stats.popularServices.map(service => (
                    <li key={service._id}>{service.name} ({service.count})</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}