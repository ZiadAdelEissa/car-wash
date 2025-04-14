import { Routes, Route } from 'react-router-dom'
import Dashboard from '../components/Customer/Dashboard'
import Services from '../components/Customer/Services'
import Packages from '../components/Customer/Packages'
import Booking from '../components/Customer/Booking'
import Profile from '../components/Customer/Profile'

export default function CustomerPortal() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="services" element={<Services />} />
      <Route path="packages" element={<Packages />} />
      <Route path="booking" element={<Booking />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  )
}