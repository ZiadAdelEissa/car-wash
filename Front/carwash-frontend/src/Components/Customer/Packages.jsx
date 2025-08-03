import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { getPackages, purchasePackage } from "../services/api.js";
import Loader from "../loaders/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useLayoutEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [loading]);

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
        toast.success(
          <div className="flex items-start">
            <svg className="w-6 h-6 shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <div className="ml-3">
              <span className="font-semibold text-green-100">{response.data.message}</span>
              <p className="mt-1 text-sm text-green-200">{t("packages.redirecting toBooking")}</p>
            </div>
          </div>,
          { autoClose: 3000 }
        );
        setTimeout(() => navigate("/booking"), 3000);
      } else {
        if (response.data.error === "ACTIVE_PACKAGE") {
          toast.warning(
            <div className="flex items-start">
              <svg className="w-6 h-6 shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="ml-3">
                <span className="font-semibold text-yellow-100">{response.data.message}</span>
                <ul className="mt-2 text-sm text-yellow-200 space-y-1">
                  <li>• {t("packages.packages")}: {response.data.packageName}</li>
                  <li>• {t("packages.remainingWashes")}: {response.data.remainingWashes}</li>
                  <li>• {t("packages.expireDate")}: {new Date(response.data.expiryDate).toLocaleDateString()}</li>
                </ul>
              </div>
            </div>,
            { autoClose: 8000 }
          );
        } else if (response.data.error === "EXISTING_PACKAGE") {
          toast.warning(
            <div className="flex items-start">
              <svg className="w-6 h-6 shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="ml-3">
                <span className="font-semibold text-yellow-100">{response.data.message}</span>
                <p className="mt-1 text-sm text-yellow-200">{t("packages.useyourcurrentpackage")}</p>
              </div>
            </div>,
            { autoClose: 5000 }
          );
        }
      }
    } catch (error) {
      toast.error(
        <div className="flex items-start">
          <svg className="w-6 h-6 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="ml-3">
            <span className="font-semibold text-red-100">
              {error.response?.data?.message || "An error occurred. Please try again."}
            </span>
            <p className="mt-1 text-sm text-red-200">{t("packages.checkConnection")}</p>
          </div>
        </div>,
        { autoClose: 5000 }
      );
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-6 text-gray-100 bg-[#171717]">
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

      <div ref={titleRef} className="packages flex flex-col w-full h-full items-center justify-center text-center mb-6 pt-20 bg-[#171717]">
        <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-orange-400 to-pink-600 inline-block text-transparent bg-clip-text my-5">
         {t("packages.availablePackages")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-full px-4">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="w-full p-6 flex flex-col justify-between items-center bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div>
                <h5 className="mb-4 text-2xl font-bold text-white">{pkg.name}</h5>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-extrabold tracking-tight text-white">
                    {pkg.price} €
                  </span>
                </div>
                <p className="text-gray-300 mb-6">{pkg.description}</p>

                <ul className="space-y-3 mb-6">
                  <li className="flex justify-center items-center ">
                    <svg className="shrink-0 w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="ml-3 text-gray-200">{pkg.washCount} {t("packages.washes")}</span>
                  </li>
                  {pkg.services?.map((service, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="shrink-0 w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      <span className="ml-3 text-gray-200">{service.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePurchase(pkg._id)}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
               {t("packages.reserveNow")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}