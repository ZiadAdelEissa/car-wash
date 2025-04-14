import axios from 'axios'

const API = axios.create({
  baseURL: '/api', // Let Vite proxy handle the base URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Auth
export const registerCustomer = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const loginAdmin = (data) => API.post('/auth/login', data)
export const logoutUser = () => API.post('/auth/logout')
export const registerAdmin = (data) => API.post('/auth/admin-register', data)
export const registerBranchAdmin = (data) => API.post('/auth/register-branch-admin', data)

// Customer
export const getServices = () => API.get('/services')
export const getPackages = () => API.get('/packages')
export const purchasePackage = (id) => API.post('/packages/purchase', { packageId: id })
export const createBooking = (data) => API.post('/bookings', data)

// User
export const getUserProfile = () => API.get('/users/profile')
export const updateUserProfile = (data) => API.put('/users/profile', data)
export const addFamilyMember = (data) => API.post('/users/family', data)
export const getUserPackages = () => API.get('/users/packages')
export const getUserBookings = () => API.get('/users/bookings')

// Admin
export const getAllBookings = () => API.get('/admin/bookings')
export const updateBookingStatus = (id, status) => API.patch(`/branch-admin/bookings/${id}`, { status })
export const deleteBooking = (id) => API.delete(`/admin/bookings/${id}`)
export const getSystemStats = () => API.get('/admin/stats')
export const getAllBranches = () => API.get('/admin/branches')
export const createBranch = (data) => API.post('/admin/branches', data)
export const updateBranch = (id, data) => API.put(`/admin/branches/${id}`, data)
export const getBranchStats = (id) => API.get(`/admin/branches/${id}/stats`)
// Admin Services
export const createService = (data) => API.post('/services', data)
export const updateService = (id, data) => API.put(`/services/${id}`, data)
export const deleteService = (id) => API.delete(`/services/${id}`)

// Admin Packages
export const createPackage = (data) => API.post('/packages', data)
export const updatePackage = (id, data) => API.put(`/packages/${id}`, data)
export const deletePackage = (id) => API.delete(`/packages/${id}`)