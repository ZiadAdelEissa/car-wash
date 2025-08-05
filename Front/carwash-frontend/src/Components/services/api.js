import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://167.99.242.141:5000/api",
  withCredentials: true, // This ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to ensure credentials are always sent
API.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Authentication failed - session may have expired');
      // Optionally redirect to login or clear local storage
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const registerCustomer = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const loginAdmin = (data) => API.post("/auth/login", data);
export const logoutUser = () => API.post("/auth/logout");
export const registerAdmin = (data) => API.post("/auth/admin-register", data);
export const registerBranchAdmin = (data) =>
  API.post("/auth/register-branch-admin", data);

// Customer
export const getServices = () => API.get("/services");
export const getPackages = () => API.get("/packages");
export const purchasePackage = (id) =>
  API.post("/packages/purchase", { packageId: id });
export const createBooking = (data) => API.post("/bookings", data);

// User
export const getUserProfile = () => API.get("/users/profile");
export const updateUserProfile = (data) => API.put("/users/profile", data);
export const addFamilyMember = (data) => API.post("/users/family", data);
export const getUserPackages = () => API.get("/users/packages");
export const sharePackage = (data) => API.post("/users/packages/share", data);
export const getUserBookings = () => API.get("/users/bookings");
export const getBranchesUser = () => API.get("/bookings/branches");
export const getServicesUser = () => API.get("/bookings/services");
export const getPackagesUser = () => API.get("/bookings/packages");
export const getBookingDetails = (id) => API.get(`/bookings/${id}`);
// Admin
export const getAllBookings = () => API.get("/admin/bookings");
// Admin User Packages
export const getAllUserPackages = () => API.get("/admin/user-packages");
export const deleteUserPackage = (id) =>
  API.delete(`/admin/user-packages/${id}`);
export const updateBranchBooking = (id) =>
  API.patch(`/branch-admin//branches/:id/bookings/:bookingId`, id);
export const updateBookingStatus = (id, status) =>
  API.patch(`/admin/bookings/${id}/${status}`, { status });
export const getNotifications = async () => API.get("/notifications");
export const markNotificationsAsRead = async (id) =>
  API.patch(`/notifications/${id}`);
export const deleteBooking = (id) => API.delete(`/admin/bookings/${id}`);
export const getSystemStats = () => API.get("/admin/stats");
export const getAllBranches = () => API.get("/admin/branches");
export const createBranch = (data) => API.post("/admin/branches", data);
export const updateBranch = (id, data) =>
  API.put(`/admin/branches/${id}`, data);
export const getBranchStats = (id) => API.get(`/admin/branches/${id}/stats`);
export const completeBooking = (id) => API.patch(`/bookings/${id}/complete`);
// Admin Services
export const createService = (data) => API.post("/services", data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);

// Admin Packages
export const createPackage = (data) => API.post("/packages", data);
export const updatePackage = (id, data) => API.put(`/packages/${id}`, data);
export const deletePackage = (id) => API.delete(`/packages/${id}`);