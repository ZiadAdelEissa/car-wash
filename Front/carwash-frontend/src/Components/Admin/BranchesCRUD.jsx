import { useState, useEffect, useRef } from 'react'
import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { getAllBranches, createBranch, updateBranch, getBranchStats } from '../services/api.js'

export default function BranchesCRUD() {
  const [branches, setBranches] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    operatingHours: '',
    closeingHours: ''
  })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const formRef = useRef()
  const tableRef = useRef()
  const tableRowsRef = useRef([])

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

  useLayoutEffect(() => {
    // Form animation
    if (formRef.current) {
      gsap.from(formRef.current, {
        duration: 0.5,
        y: 20,
        opacity: 0,
        ease: "power2.out",
      })
    }
  }, [editingId])

  // useLayoutEffect(() => {
  //   // Table rows animation
  //   if (tableRowsRef.current.length > 0) {
  //     gsap.killTweensOf(tableRowsRef.current)
  //     gsap.from(tableRowsRef.current, {
  //       duration: 0.6,
  //       y: 30,
  //       opacity: 0,
  //       stagger: 0.1,
  //       ease: "back.out",
  //       delay: 0.2,
  //     })
  //   }
  // }, [branches])

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
      operatingHours: branch.operatingHours,
      closeingHours: branch.closeingHours
    })
    setEditingId(branch._id)
  }

  // const fetchStats = async (id) => {
  //   try {
  //     const response = await getBranchStats(id)
  //     console.log(response.data)
  //     setStats(response.data)
  //   } catch (error) {
  //     setStats(null)
  //   }
  // }

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      phone: '',
      operatingHours: '',
      closeingHours: ''
    })
    setEditingId(null)
    setStats(null)
  }

  if (loading && branches.length === 0) return <div className="p-6 text-center text-gray-500">Loading branches...</div>

  return (
    <div className="p-6 mt-[80px] min-h-screen bg-[#171717]">
      <div className='flex flex-col items-center justify-center'>

      <h1 className="text-4xl m-5 text-center bg-gradient-to-r from-orange-400 to-pink-600 text-transparent bg-clip-text">
        Manage Branches
      </h1>
      
        <div className="lg:col-span-2">
          <form ref={formRef} onSubmit={handleSubmit} className="mb-8 p-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-white">
              {editingId ? 'Edit Branch' : 'Add New Branch'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-gray-300 font-medium">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-300 font-medium">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-300 font-medium">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-300 font-medium">Opening Hours</label>
                <input
                  type="time"
                  value={formData.operatingHours}
                  onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-300 font-medium">Closing Hours</label>
                <input
                  type="time"
                  value={formData.closeingHours}
                  onChange={(e) => setFormData({...formData, closeingHours: e.target.value})}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : editingId ? 'Update Branch' : 'Add Branch'}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="overflow-x-auto" ref={tableRef}>
            <table className="min-w-full bg-[#454545] backdrop-blur-lg rounded-lg overflow-hidden">
              <thead className="bg-[#f8f8f8]">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Operating Hours</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {branches.map((branch, index) => (
                  <tr 
                    key={branch._id}
                    ref={el => tableRowsRef.current[index] = el}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 px-4 text-white">{branch.name}</td>
                    <td className="py-3 px-4 text-gray-300">{branch.location}</td>
                    <td className="py-3 px-4 text-white">{branch.phone}</td>
                    <td className="py-3 px-4 text-white">
                      {branch.operatingHours} - {branch.closeingHours}
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(branch)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

  
      </div>
      </div>
  )
}