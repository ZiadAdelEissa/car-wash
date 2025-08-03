import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getUserBookings, getUserPackages } from "../services/api.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import Loader from "../loaders/Loader.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiCalendar, FiPackage, FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

export default function Dashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ bookings: 0, packages: 0 });
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const comp = useRef(null);
  const statsRef = useRef(null);
  const bookingsTableRef = useRef(null);
  const packagesTableRef = useRef(null);

  useLayoutEffect(() => {
    if (loading) return;

    let ctx = gsap.context(() => {
      if (comp.current) {
        gsap.fromTo(
          comp.current,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          }
        );
      }

      if (statsRef.current) {
        gsap.fromTo(
            statsRef.current,
            { opacity: 0, y: 100, skewY: 3 },
            {
              opacity: 1,
              y: 0,
              skewY: 0,
              duration: 1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 85%",
                end: "bottom 20%",
              },
            }
        );
      }

      if (bookingsTableRef.current) {
        gsap.fromTo(
            bookingsTableRef.current,
            { x: -150, opacity: 0, rotateY: 15 },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bookingsTableRef.current,
                start: "top 80%",
                end: "top 40%",
              },
            }
        );
      }

      if (packagesTableRef.current) {
        gsap.fromTo(
            packagesTableRef.current,
            { x: 150, opacity: 0, rotateY: -15 },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: packagesTableRef.current,
                start: "top 80%",
                end: "top 40%",
              },
            }
        );
      }
    });

    return () => ctx.revert();
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, packagesRes] = await Promise.all([
          getUserBookings(),
          getUserPackages(),
        ]);
        setStats({
          bookings: bookingsRes.data.length,
          packages: packagesRes.data.length,
        });
        toast.success(t('dashboard.dataLoaded'), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        toast.error(t('dashboard.dataError'), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };
    fetchData();
  }, [t]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getUserBookings();
        setBookings(response.data);
      } catch (error) {
        toast.error(t('dashboard.bookingsError'), {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };
    
    const fetchPackages = async () => {
      try {
        const response = await getUserPackages();
        setPackages(response.data);
      } catch (error) {
        toast.error(t('dashboard.packagesError'), {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
    fetchPackages();
  }, [t]);

  const getStatusBadge = (status) => {
    const statusKey = status.toLowerCase();
    const badgeConfig = {
      completed: {
        className: "bg-green-100 text-green-800",
        icon: <FiCheckCircle className="mr-1" />,
      },
      pending: {
        className: "bg-yellow-100 text-yellow-800",
        icon: <FiClock className="mr-1" />,
      },
      cancelled: {
        className: "bg-red-100 text-red-800",
        icon: <FiAlertCircle className="mr-1" />,
      },
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeConfig[statusKey]?.className || 'bg-gray-100 text-gray-800'}`}>
        {badgeConfig[statusKey]?.icon}
        {t(`status.${statusKey}`)}
      </span>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div ref={comp} className="bg-[#171717] p-4 md:p-6 flex flex-col justify-around items-center gap-6 mt-[99px] w-full">
      <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-orange-400 to-pink-600 inline-block text-transparent bg-clip-text font-bold tracking-tight">
        {t('dashboard.title')}
      </h1>

      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-6xl">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg border border-blue-200 text-center transition-all hover:shadow-xl hover:scale-[1.02]">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <FiCalendar className="text-blue-600 text-2xl" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            {t('dashboard.bookings')}
          </h2>
          <p className="text-4xl font-bold text-blue-600">{stats.bookings}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg border border-green-200 text-center transition-all hover:shadow-xl hover:scale-[1.02]">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-green-100 rounded-full">
              <FiPackage className="text-green-600 text-2xl" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            {t('dashboard.packages')}
          </h2>
          <p className="text-4xl font-bold text-green-600">{stats.packages}</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div ref={bookingsTableRef} className="w-full max-w-6xl overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-700 flex items-center">
            <FiCalendar className="mr-2" /> {t('dashboard.recentBookings')}
          </h2>
          {bookings.length === 0 && (
            <p className="text-gray-500">{t('common.noBookings')}</p>
          )}
        </div>
        <div className="min-w-[600px]">
          <table className="w-full bg-white rounded-xl overflow-hidden shadow-md">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">{t('booking.branch')}</th>
                <th className="py-3 px-4 text-left">{t('dashboard.branchNumber')}</th>
                <th className="py-3 px-4 text-left">{t('navigation.services')}</th>
                <th className="py-3 px-4 text-left">{t('booking.date')}</th>
                <th className="py-3 px-4 text-left">{t('booking.time')}</th>
                <th className="py-3 px-4 text-left">{t('dashboard.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id || booking._id} className="hover:bg-blue-50 transition-colors">
                  <td className="py-3 px-4">{booking.branchId?.name}</td>
                  <td className="py-3 px-4">{booking.branchId?.phone}</td>
                  <td className="py-3 px-4">{booking.serviceId?.name}</td>
                  <td className="py-3 px-4">{booking.bookingDate}</td>
                  <td className="py-3 px-4">{booking.bookingTime}</td>
                  <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Packages Table */}
      <div ref={packagesTableRef} className="w-full max-w-6xl overflow-x-auto mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-700 flex items-center">
            <FiPackage className="mr-2" /> {t('dashboard.recentPackages')}
          </h2>
          {packages.length === 0 && (
            <p className="text-gray-500">{t('common.noPackages')}</p>
          )}
        </div>
        <div className="min-w-[500px]">
          <table className="w-full bg-white rounded-xl overflow-hidden shadow-md">
            <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">{t('navigation.packages')}</th>
                <th className="py-3 px-4 text-left">{t('common.price')}</th>
                <th className="py-3 px-4 text-left">{t('common.expireDate')}</th>
                <th className="py-3 px-4 text-left">{t('common.remainingWashes')}</th>
                <th className="py-3 px-4 text-left">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {packages.map((packageItem) => (
                <tr key={packageItem.id || packageItem._id} className="hover:bg-green-50 transition-colors">
                  <td className="py-3 px-4 font-medium">{packageItem.packageId?.name}</td>
                  <td className="py-3 px-4">{packageItem.packageId?.price} €</td>
                  <td className="py-3 px-4">{packageItem.expiryDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-fit bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            packageItem.remainingWashes <= 2 ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(packageItem.remainingWashes / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {packageItem.remainingWashes}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => {
                        if (packageItem.remainingWashes > 0) {
                          toast.info(t('dashboard.redirectMessage'))
                        }
                      }}
                      disabled={packageItem.remainingWashes === 0}
                      className={`group relative text-sm px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow w-45 h-12 ${
                        packageItem.remainingWashes === 0 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-emerald-700 hover:bg-emerald-300 text-black hover:shadow-lg'
                      }`}
                    >
                      {packageItem.remainingWashes > 0 ? (
                        <Link to="/booking" className="relative flex items-center justify-center gap-2">
                          <span className="relative inline-block overflow-hidden">
                            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                              {t('common.bookNow')}
                            </span>
                            <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                              {t('dashboard.rightNow')}
                            </span>
                          </span>
                          <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45" viewBox="0 0 24 24">
                            <circle fill="currentColor" r={11} cy={12} cx={12} />
                            <path
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              strokeWidth={2}
                              stroke="white"
                              d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                            />
                          </svg>
                        </Link>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          {t('dashboard.noWashesLeft')}
                          <FiAlertCircle className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}