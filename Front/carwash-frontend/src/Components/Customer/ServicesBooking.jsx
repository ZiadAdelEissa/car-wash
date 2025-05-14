import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getServicesUser, createBooking, getBranchesUser } from "../services/api.js";
import { useAnimation } from "../hooks/useAnimation.js";
import Loader from "../loaders/Loader.jsx";
import "react-toastify/dist/ReactToastify.css";

export default function ServicesBooking() {
  const [services, setServices] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    serviceId: "",
    branchId: "",
    bookingDate: "",
    bookingTime: "",
    notes: ""
  });

  useAnimation("booking");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, branchesRes] = await Promise.all([
          getServicesUser(),
          getBranchesUser()
        ]);
        setServices(servicesRes.data);
        setBranches(branchesRes.data);
      } catch (error) {
        toast.error("❌ Failed to load data. Please refresh the page.", {
          position: "top-center",
          autoClose: 5000
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await createBooking(formData);
      toast.success("🎉 Booking created successfully!", {
        position: "top-center",
        autoClose: 3000
      });
      // Reset form
      setFormData({
        serviceId: "",
        branchId: "",
        bookingDate: "",
        bookingTime: "",
        notes: ""
      });
    } catch (error) {
      if (error.response?.status === 400) {
        toast.warning(`⏰ ${error.response.data.message}`, {
          position: "top-center",
          autoClose: 6000
        });
      } else {
        toast.error("❌ Failed to create booking. Please try again.", {
          position: "top-center"
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="w-full mt-[80px] max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-orange-400 to-pink-600 text-transparent bg-clip-text">
          Book a Service
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Branch</label>
                <select
                  value={formData.branchId}
                  onChange={(e) => setFormData({...formData, branchId: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a branch</option>
                  {branches.map((branch) => (
                    <option key={branch._id} value={branch._id}>
                      {branch.name} - {branch.location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Service</label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.bookingDate}
                  onChange={(e) => setFormData({...formData, bookingDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Time</label>
                <input
              type="time"
              value={formData.bookingTime}
              onChange={(e) => setFormData({ ...formData, bookingTime: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              step="300" // 5-minute increments
              min="08:00"
              max="20:00"
            />
</div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Any special requests or notes..."
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 disabled:opacity-50 transition-all duration-300"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : "Book Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}