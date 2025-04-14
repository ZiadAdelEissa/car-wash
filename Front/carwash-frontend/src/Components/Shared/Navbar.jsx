import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="bg-[#4545453a] text-white p-4 shadow-md backdrop-blur-sm fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Spa & Wellness</Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role === 'super-admin' ? (
                <Link to="/AdminDashboard" className="hover:underline">Admin Dashboard</Link>
              ) : (
                <div className="flex items-center space-x-4">
                <Link to="/customer/dashboard" className="hover:underline">My Dashboard</Link>
                <Link to="/services" className="hover:underline">Services</Link>
                <Link to="/packages" className="hover:underline">Packages</Link>
                </div>
              )}
              <button onClick={handleLogout} className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-100">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Customer Login</Link>
              <Link to="/admin/login" className="hover:underline">Admin Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}