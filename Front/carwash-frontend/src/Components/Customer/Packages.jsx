import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { getPackages, purchasePackage } from "../services/api.js";
import Loader from "../loaders/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gsap from "gsap";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    // Only animate the title if it exists
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });
    }
  }, [loading]); // Run when loading completes

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getPackages();
        setPackages(response.data);
      } catch (error) {
        toast.error("Failed to load packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handlePurchase = async (id) => {
    try {
      const response = await purchasePackage(id);
      
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/booking');
      } else {
        if (response.data.error === "ACTIVE_PACKAGE") {
          toast.warning(
            <div>
              <p className="font-bold">{response.data.message}</p>
              <p>Current package: {response.data.packageName}</p>
              <p>Remaining washes: {response.data.remainingWashes}</p>
              <p>Expires: {new Date(response.data.expiryDate).toLocaleDateString()}</p>
            </div>,
            { autoClose: 8000 }
          );
        } else if (response.data.error === "EXISTING_PACKAGE") {
          toast.warning(response.data.message, { autoClose: 5000 });
        } else {
          toast.error(response.data.message || "Failed to reserve package");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        "An error occurred. Please try again."
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-100">
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div  ref={titleRef}  className="flex flex-col items-center justify-center text-center mb-6 pt-20">
        <h1 
         
          className="text-4xl md:text-6xl bg-gradient-to-r from-orange-400 to-pink-600 inline-block text-transparent bg-clip-text my-5"
        >
          Available Packages
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          {packages.map((pkg) => (
            <div 
              key={pkg._id}
              className="w-full p-6 flex flex-col justify-between bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div>
                <h5 className="mb-4 text-2xl font-bold text-white">{pkg.name}</h5>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-extrabold tracking-tight text-white">${pkg.price}</span>
                </div>
                <p className="text-gray-300 mb-6">{pkg.description}</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg className="shrink-0 w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>
                    <span className="ml-3 text-gray-200">
                      {pkg.washCount} Washes
                    </span>
                  </li>
                  {pkg.services?.map((service, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="shrink-0 w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                      </svg>
                      <span className="ml-3 text-gray-200">
                        {service.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePurchase(pkg._id)}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Reserve Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}