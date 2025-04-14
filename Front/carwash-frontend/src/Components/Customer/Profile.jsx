import { useState, useEffect } from 'react'
import { getUserProfile, updateUserProfile, addFamilyMember } from '../services/api.js'
import { useAnimation } from '../hooks/useAnimation.js'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [familyMember, setFamilyMember] = useState({ name: '', relationship: '' })
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [tempProfile, setTempProfile] = useState({})
  useAnimation('profile')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile()
        setProfile(response.data)
        setTempProfile(response.data)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await updateUserProfile(tempProfile)
      setProfile(response.data)
      setEditMode(false)
    } catch (error) {
      alert('Failed to update profile')
    }
  }

  const handleAddFamilyMember = async (e) => {
    e.preventDefault()
    try {
      const response = await addFamilyMember(familyMember)
      setProfile(prev => ({
        ...prev,
        familyMembers: [...prev.familyMembers, response.data]
      }))
      setFamilyMember({ name: '', relationship: '' })
    } catch (error) {
      alert('Failed to add family member')
    }
  }

  if (loading) {
    return <div className="p-6 text-center">Loading profile...</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      {editMode ? (
        <form onSubmit={handleProfileUpdate} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={tempProfile.name}
                onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={tempProfile.email}
                onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                className="w-full p-2 border rounded"
                required
                disabled
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={tempProfile.phone || ''}
                onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={tempProfile.address || ''}
                onChange={(e) => setTempProfile({...tempProfile, address: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setEditMode(false)
                setTempProfile(profile)
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-gray-500 text-sm">Name</h3>
              <p className="text-lg">{profile.name}</p>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Email</h3>
              <p className="text-lg">{profile.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-gray-500 text-sm">Phone</h3>
              <p className="text-lg">{profile.phone || 'Not provided'}</p>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Address</h3>
              <p className="text-lg">{profile.address || 'Not provided'}</p>
            </div>
          </div>
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-4">Family Members</h2>
      
      <form onSubmit={handleAddFamilyMember} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={familyMember.name}
              onChange={(e) => setFamilyMember({...familyMember, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Relationship</label>
            <input
              type="text"
              value={familyMember.relationship}
              onChange={(e) => setFamilyMember({...familyMember, relationship: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Family Member
        </button>
      </form>
      
      {profile.familyMembers?.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.familyMembers.map((member, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.relationship}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No family members added yet.</p>
      )}
    </div>
  )
}