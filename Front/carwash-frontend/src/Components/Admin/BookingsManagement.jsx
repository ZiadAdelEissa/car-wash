import { useState, useEffect, useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../services/api.js";
import Loader from "../loaders/Loader.jsx";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef();
  const tableRowsRef = useRef([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAllBookings();
        setBookings(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useLayoutEffect(() => {
    // Reset the refs array when bookings change
    tableRowsRef.current = tableRowsRef.current.slice(0, bookings.length);
    
    if (tableRowsRef.current.length > 0) {
      // Kill any existing animations
      gsap.killTweensOf(tableRowsRef.current);
      
      // Only animate if the element is not already visible
      tableRowsRef.current.forEach((el, index) => {
        if (el && getComputedStyle(el).opacity !== "1") {
          gsap.from(el, {
            duration: 0.6,
            y: 30,
            opacity: 0,
            delay: 0.1 + index * 0.05,
            ease: "back.out"
          });
        }
      });
    }
  }, [bookings]);
  const handleStatusChange = async (id, status) => {
    try {
      setLoading(true);
      await updateBookingStatus(id, status);
      const response = await getAllBookings();
      setBookings(response.data);
    } catch (error) {
      alert("Failed to update booking status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        setLoading(true);
        await deleteBooking(id);
        const response = await getAllBookings();
        setBookings(response.data);
      } catch (error) {
        alert("Failed to delete booking");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && bookings.length === 0) {
    return <Loader />;
  }

  return (
    <div className="p-6 mt-[80px] min-h-screen">
      <h1 className="text-4xl m-5 text-center bg-gradient-to-r from-orange-400 to-pink-600 text-transparent bg-clip-text">
        Manage Bookings
      </h1>

      <div className="overflow-x-auto" ref={tableRef}>
        <table className="min-w-full bg-[#454545] backdrop-blur-lg rounded-lg overflow-hidden">
          <thead className="bg-[#f8f8f8]">
            <tr>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Branch</th>
              <th className="py-3 px-4 text-left">Remaining Washes</th>
              <th className="py-3 px-4 text-left">Package Expiry</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking, index) => (
              <tr 
                key={booking._id}
                ref={el => tableRowsRef.current[index] = el}
                className="hover:bg-gray-700 transition-colors"
              >
                <td className="py-3 px-4 text-white">{booking.userId?.name || "N/A"}</td>
                <td className="py-3 px-4 text-gray-300">
                  {booking.serviceId?.name || "N/A"}
                </td>
                <td className="py-3 px-4 text-white">
                  {booking.serviceId?.price || "N/A"} $
                </td>
                <td className="py-3 px-4 text-gray-300">{booking.branchId?.name || "N/A"}</td>
                <td className="py-3 px-4 text-white">{booking.userPackageId?.remainingWashes || "N/A"}</td>
                <td className="py-3 px-4 text-white">
                  {booking.userPackageId?.expiryDate ? 
                    new Date(booking.userPackageId.expiryDate).toLocaleDateString() : 
                    "N/A"}
                </td>
                <td className="py-3 px-4 text-white">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-white">{booking.bookingTime}</td>
                <td className="py-3 px-4">
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking._id, e.target.value)
                    }
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      booking.status === "confirmed"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : booking.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : booking.status === "completed"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}