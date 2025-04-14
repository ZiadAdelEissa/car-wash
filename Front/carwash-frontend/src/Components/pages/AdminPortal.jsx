import { Routes, Route } from 'react-router-dom'
import Dashboard from '../components/Admin/Dashboard'
import ServicesCRUD from '../components/Admin/ServicesCRUD'
import PackagesCRUD from '../components/Admin/PackagesCRUD'
import BranchesCRUD from '../components/Admin/BranchesCRUD'
import BookingsManagement from '../components/Admin/BookingsManagement'

export default function AdminPortal() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="services" element={<ServicesCRUD />} />
      <Route path="packages" element={<PackagesCRUD />} />
      <Route path="branches" element={<BranchesCRUD />} />
      <Route path="bookings" element={<BookingsManagement />} />
    </Routes>
  )
}