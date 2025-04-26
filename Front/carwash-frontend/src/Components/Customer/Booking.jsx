import { useState, useEffect } from "react";
import {
  getServices,
  getServicesUser,
  createBooking,
  getAllBranches,
  getBranchesUser,
  getUserPackages,
} from "../services/api.js";
import { useAnimation } from "../hooks/useAnimation.js";
import Loader from "../loaders/Loader.jsx";
export default function Booking() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: "",
    bookingDate: "",
    bookingTime: "",
    notes: "",
    branchId: "",
    userPackageId: "",

  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [branches, setBranches] = useState([]);
  const [userPackages, setUserPackages] = useState([]);
  useAnimation("booking");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServicesUser();
        setServices(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
    fetchBranches();
    fetchUserPackages();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await getBranchesUser();
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  const fetchUserPackages = async () => {
    try {
      const response = await getUserPackages();
      // console.log(response.data);
      setUserPackages(response.data);
    } catch (error) {
      console.error("Error fetching user packages:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createBooking(formData);
      setSuccess(true);
      setFormData({
        serviceId: "",
        bookingDate: "",
        bookingTime: "",
        notes: "",
        branchId: "",
        userPackageId: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Book a Service</h1>

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          Booking created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Branch</label>
            <select
              value={formData.branch}
              onChange={(e) =>
                setFormData({ ...formData, branchId: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a branch</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name} - {branch.location}
                </option>
              ))}
            </select>
            <label className="block text-gray-700 mb-2">userPackage</label>
            <select
              value={formData.userPackageId}
              onChange={(e) =>
                setFormData({ ...formData, userPackageId: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a package</option>
              {userPackages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.packageId?.name} - {pkg.packageId?.dicription} 
                </option>
              ))}
            </select>
            <label className="block text-gray-700 mb-2">Service</label>
            <select
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, serviceId: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, bookingDate: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
            <label className="block text-gray-700 mb-2">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, bookingTime: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Additional Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {submitting ? "Submitting..." : "Book Now"}
        </button>
      </form>
    </div>
  );
}
