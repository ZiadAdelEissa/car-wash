import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getUserBookings, getUserPackages } from "../services/api.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useLayoutEffect } from "react";
import Loader from "../loaders/Loader.jsx";
export default function Dashboard() {
  const [stats, setStats] = useState({ bookings: 0, packages: 0 });
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const comp = useRef(null);
  const statsRef = useRef(null); // For the stats section
  const bookingsTableRef = useRef(null); // For bookings table
  const packagesTableRef = useRef(null); // For packages table
  useLayoutEffect(() => {
    if (loading) return; // Don't animate while loading

    let ctx = gsap.context(() => {
      // Only animate if elements exist
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
          { x: 150, opacity: 0, rotateY: -15 }, // Different direction for variety
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
      const [bookingsRes, packagesRes] = await Promise.all([
        getUserBookings(),
        getUserPackages(),
      ]);
      setStats({
        bookings: bookingsRes.data.length,
        packages: packagesRes.data.length,
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getUserBookings();
        setBookings(response.data);
      } finally {
        setLoading(false);
      }
    };
    const fetchPackages = async () => {
      try {
        const response = await getUserPackages();
        setPackages(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
    fetchPackages();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div
      ref={comp}
      className="p-4 md:p-6 flex flex-col justify-around items-center gap-6 mt-[80px] w-full"
    >
      <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-orange-400 to-pink-600 inline-block text-transparent bg-clip-text">
        MY Dashboard
      </h1>

      <div
        ref={statsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full"
      >
        <div className="bg-[#a9a8a8] p-4 md:p-6 rounded-lg shadow-md shadow-gray-900 text-center">
          <h2 className="text-lg md:text-xl font-semibold mb-2">
            Your Bookings
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-blue-600">
            {stats.bookings}
          </p>
        </div>
        <div className="bg-[#a9a8a8] p-4 md:p-6 rounded-lg shadow-md shadow-gray-900 text-center">
          <h2 className="text-lg md:text-xl font-semibold mb-2">
            Your Packages
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-green-600">
            {stats.packages}
          </p>
        </div>
      </div>

      {/* Responsive Bookings Table */}
      <div ref={bookingsTableRef} className="w-full overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-400">
          Recent Bookings
        </h2>
        <div className="min-w-[600px]">
          {" "}
          {/* Minimum width for small screens */}
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm md:text-base">
                  Branch
                </th>
                <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm md:text-base">
                  Branch Number
                </th>
                <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm md:text-base">
                  Service
                </th>
                <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm md:text-base">
                  Date
                </th>
                <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm md:text-base">
                  Time
                </th>
                <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm md:text-base">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {bookings.map((booking) => (
                <tr key={booking.id || booking._id}>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b text-sm md:text-base">
                    {booking.branchId?.name}
                  </td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b text-sm md:text-base">
                    {booking.branchId?.phone}
                  </td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b text-sm md:text-base">
                    {booking.serviceId?.name}
                  </td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b text-sm md:text-base">
                    {booking.bookingDate}
                  </td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b text-sm md:text-base">
                    {booking.bookingTime}
                  </td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b text-sm md:text-base">
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsive Packages Table */}
      <div
        ref={packagesTableRef}
        className="w-full overflow-x-auto mt-6 md:mt-10"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-400">
          Recent Package
        </h2>
        <div className="min-w-[500px]">
          {" "}
          {/* Minimum width for small screens */}
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm md:text-base">
                  Packages
                </th>
                <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm md:text-base">
                  Price
                </th>
                <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm md:text-base">
                  Expire Date
                </th>
                <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm md:text-base">
                  Remaining Washes
                </th>
                <th className="py-2 px-3 md:py-3 md:px-4 text-left text-sm md:text-base">
                  Next Wash from here
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {packages.map((packageItem) => (
                <tr key={packageItem.id || packageItem._id}>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b text-sm md:text-base">
                    {packageItem.packageId?.name}
                  </td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b text-sm md:text-base">
                    {packageItem.packageId?.price}
                  </td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b text-sm md:text-base">
                    {packageItem.expiryDate}
                  </td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b text-sm md:text-base">
                    {packageItem.remainingWashes}
                  </td>
                  <td className="py-2 px-3 md:py-3 md:px-4 border-b text-sm md:text-base">
                    <button className="cursor-pointer group relative bg-emerald-700 hover:bg-emerald-300 text-black font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-45 h-12">
                      <Link
                        to="/booking"
                        className="relative flex items-center justify-center gap-2"
                      >
                        <span className="relative inline-block overflow-hidden">
                          <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                            Book Wash
                          </span>
                          <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                            Right Now
                          </span>
                        </span>
                        <svg
                          className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                          viewBox="0 0 24 24"
                        >
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
