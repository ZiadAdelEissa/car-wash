import { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { gsap } from "gsap";
import {
  getServicesUser,
  createBooking,
  getBranchesUser,
  getUserPackages,
} from "../services/api.js";
import Loader from "../loaders/Loader.jsx";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
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
  const [branches, setBranches] = useState([]);
  const [userPackages, setUserPackages] = useState([]);
   const [formDisabled, setFormDisabled] = useState(false);
  const formRef = useRef();
  const titleRef = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    if (!loading) {
      gsap.from(titleRef.current, {
        duration: 0.8,
        y: -50,
        opacity: 0,
        ease: "power3.out",
      });
      
      gsap.from(formRef.current, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3
      });
      
      gsap.from(".form-element", {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        delay: 0.6,
        ease: "back.out"
      });
    }
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, branchesRes, packagesRes] = await Promise.all([
          getServicesUser(),
          getBranchesUser(),
          getUserPackages(),
        ]);
        setServices(servicesRes.data);
        setBranches(branchesRes.data);
        setUserPackages(packagesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data. Please try again later.", {
          position: "top-center",
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
      toast.success("🎉 Booking created successfully ", {
        position: "top-center",
        autoClose: 3000,
      });
      setFormData({
        serviceId: "",
        bookingDate: "",
        bookingTime: "",
        notes: "",
        branchId: "",
        userPackageId: "",
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      if (error.response?.status === 400) {
        const { message, nextAvailable } = error.response.data;
        let fullMessage = message;
        if (nextAvailable) {
          fullMessage += ` Next availability at ${nextAvailable}.`;
        }
        toast.warning(fullMessage, {
          position: "top-center",
          autoClose: 6000,
        });
      } else {
        toast.error((t("booking.faildBook")), {
          position: "top-center",
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
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-orange-400 to-pink-600 text-transparent bg-clip-text"
        >
          {t("booking.title")}
        </h1>

        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="bg-white p-6 md:p-8 rounded-xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="form-element">
                <label className="block text-gray-700 mb-2 font-medium">{t("booking.branch")}</label>
                <select
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">{t("booking.selectBranch")}</option>
                  {branches.map((branch) => (
                    <option key={branch._id} value={branch._id}>
                      {branch.name} - {branch.location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-element">
                <label className="block text-gray-700 mb-2 font-medium">{t("packages.packages")}</label>
                <select
                  value={formData.userPackageId}
                  onChange={(e) => setFormData({ ...formData, userPackageId: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">{t("booking.selectPackage")}</option>
                  {userPackages.map((pkg) => (
                    <option key={pkg._id} value={pkg._id}>
                      {pkg.packageId?.name} - {pkg.packageId?.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-element">
                <label className="block text-gray-700 mb-2 font-medium">{t("services.title")}</label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">{t("booking.selectService")}</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="form-element">
                <label className="block text-gray-700 mb-2 font-medium">{t("booking.date")}</label>
                <input
                  type="date"
                  value={formData.bookingDate}
                  onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="form-element">
                <label className="block text-gray-700 mb-2 font-medium">{t("booking.time")}</label>
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

              <div className="form-element">
                <label className="block text-gray-700 mb-2 font-medium">{t("booking.additionalNotes")}</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Any special requests or notes..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center form-element">
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
                  {t("booking.processing")}
                </span>
              ) : t("booking.bookNow")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}