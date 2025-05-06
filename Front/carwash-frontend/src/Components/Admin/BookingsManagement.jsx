import { useState, useEffect, useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
  getAllUserPackages,
} from "../services/api.js";
import Loader from "../loaders/Loader.jsx";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [userPackages, setUserPackages] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");
  const [loading, setLoading] = useState(true);
  const tableRef = useRef();
  const tableRowsRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (activeTab === "bookings") {
          const bookingsResponse = await getAllBookings();
          setBookings(bookingsResponse.data);
        } else {
          const packagesResponse = await getAllUserPackages();
          setUserPackages(packagesResponse.data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  useLayoutEffect(() => {
    tableRowsRef.current = tableRowsRef.current.slice(
      0,
      activeTab === "bookings" ? bookings.length : userPackages.length
    );

    if (tableRowsRef.current.length > 0) {
      gsap.killTweensOf(tableRowsRef.current);

      tableRowsRef.current.forEach((el, index) => {
        if (el && getComputedStyle(el).opacity !== "1") {
          gsap.from(el, {
            duration: 0.6,
            y: 30,
            opacity: 0,
            delay: 0.1 + index * 0.05,
            ease: "back.out",
          });
        }
      });
    }
  }, [bookings, userPackages, activeTab]);

  const handleStatusChange = async (id, status) => {
    try {
      setLoading(true);
      await updateBookingStatus(id, status);
  
      const updatedBooking = bookings.find((b) => b._id === id);
      
      // Calculate new remaining washes if status is being changed to completed
      const newRemainingWashes = status === "completed" && updatedBooking.userPackageId?.remainingWashes 
        ? updatedBooking.userPackageId.remainingWashes - 1 
        : updatedBooking.userPackageId?.remainingWashes;
  
      const emailSubject = `Booking Update: #${id}`;
      const emailBody = `
  Hello ${updatedBooking.userId?.name || "Customer"},
  
  Your booking (#${id}) status has been updated to ${status.toUpperCase()}.
  
  Booking Details:
  - Service: ${updatedBooking.serviceId?.name || "N/A"}
  - Branch: ${updatedBooking.branchId?.name || "N/A"}
  - Date: ${new Date(updatedBooking.bookingDate).toLocaleDateString()}
  - Time: ${updatedBooking.bookingTime}
  ${
    newRemainingWashes !== undefined 
      ? `- Remaining Washes: ${newRemainingWashes}`
      : ""
  }
  
  Thank you for choosing our service!
      `.trim();
  
      if (updatedBooking.userId?.email) {
        window.location.href = `mailto:${
          updatedBooking.userId.email
        }?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
          emailBody
        )}`;
      }
  
      const response = await getAllBookings();
      setBookings(response.data);
    } catch (error) {
      alert("Failed to update booking status");
    } finally {
      setLoading(false);
    }
  };
  const handlePaymentStatusChange = async (id, isPaid) => {
    try {
      setLoading(true);

      // Update locally without API call
      const updatedPackages = userPackages.map((pkg) =>
        pkg._id === id ? { ...pkg, isPaid } : pkg
      );
      setUserPackages(updatedPackages);

      // Find the updated package
      const updatedPackage = updatedPackages.find((p) => p._id === id);

      // If payment was just marked as paid, send confirmation email
      if (isPaid && updatedPackage?.userId?.email) {
        const emailSubject = `Payment Confirmation for ${
          updatedPackage.packageId?.name || "Package"
        }`;
        const emailBody = `
Hello ${updatedPackage.userId?.name || "Customer"},

We have received your payment for the ${
          updatedPackage.packageId?.name || "package"
        }.

Package Details:
- Package Name: ${updatedPackage.packageId?.name || "N/A"}
- Price: $${updatedPackage.packageId?.price || "N/A"}
- Total Washes: ${updatedPackage.packageId?.numberOfWashes || "N/A"}
- Expiry Date: ${
          updatedPackage.expiryDate
            ? new Date(updatedPackage.expiryDate).toLocaleDateString()
            : "N/A"
        }

Thank you for your payment! Your package is now active.

Best regards,
Car Wash Team
        `.trim();

        window.location.href = `mailto:${
          updatedPackage.userId.email
        }?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
          emailBody
        )}`;
      }
    } catch (error) {
      alert("Failed to update payment status");
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

  if (loading && bookings.length === 0 && userPackages.length === 0) {
    return <Loader />;
  }

  return (
    <div className="p-6 mt-[80px] min-h-screen">
      <h1 className="text-4xl m-5 text-center bg-gradient-to-r from-orange-400 to-pink-600 text-transparent bg-clip-text">
        Manage {activeTab === "bookings" ? "Bookings" : "User Packages"}
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 mx-2 rounded-l-lg ${
            activeTab === "bookings"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => setActiveTab("packages")}
          className={`px-4 py-2 mx-2 rounded-r-lg ${
            activeTab === "packages"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          User Packages
        </button>
      </div>

      <div className="overflow-x-auto" ref={tableRef}>
        {activeTab === "bookings" ? (
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
                  ref={(el) => (tableRowsRef.current[index] = el)}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-4 text-white">
                    {booking.userId?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {booking.serviceId?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {booking.serviceId?.price || "N/A"} $
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {booking.branchId?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {booking.userPackageId?.remainingWashes || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {booking.userPackageId?.expiryDate
                      ? new Date(
                          booking.userPackageId.expiryDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {booking.bookingTime}
                  </td>
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
        ) : (
          <table className="min-w-full bg-[#454545] backdrop-blur-lg rounded-lg overflow-hidden">
            <thead className="bg-[#f8f8f8]">
              <tr>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Package</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Total Washes</th>
                <th className="py-3 px-4 text-left">Remaining Washes</th>
                <th className="py-3 px-4 text-left">Expiry Date</th>
                <th className="py-3 px-4 text-left">Payment Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userPackages.map((userPackage, index) => (
                <tr
                  key={userPackage._id}
                  ref={(el) => (tableRowsRef.current[index] = el)}
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-4 text-white">
                    {userPackage.userId?.name || "N/A"}
                    {userPackage.userId?.email && (
                      <div className="text-xs text-gray-400">
                        {userPackage.userId.email}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {userPackage.packageId?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-white">
                    ${userPackage.packageId?.price || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {userPackage.packageId?.numberOfWashes || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {userPackage.remainingWashes || "0"}
                  </td>
                  <td className="py-3 px-4 text-white">
                    {userPackage.expiryDate
                      ? new Date(userPackage.expiryDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={userPackage.isPaid ? "paid" : "unpaid"}
                      onChange={(e) =>
                        handlePaymentStatusChange(
                          userPackage._id,
                          e.target.value === "paid"
                        )
                      }
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        userPackage.isPaid
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      <option value="paid">Paid</option>
                      <option value="unpaid">Unpaid</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    {userPackage.userId?.email && (
                      <button
                        onClick={() => {
                          const emailSubject = `Package Details: ${
                            userPackage.packageId?.name || "Package"
                          }`;
                          const emailBody = `
Hello ${userPackage.userId?.name || "Customer"},

Here are your package details:

Package Name: ${userPackage.packageId?.name || "N/A"}
Price: $${userPackage.packageId?.price || "N/A"}
Total Washes: ${userPackage.packageId?.numberOfWashes || "N/A"}
Remaining Washes: ${userPackage.remainingWashes || "0"}
Expiry Date: ${
                            userPackage.expiryDate
                              ? new Date(
                                  userPackage.expiryDate
                                ).toLocaleDateString()
                              : "N/A"
                          }

Thank you for choosing our service!

Best regards,
Car Wash Team
                          `.trim();
                          window.location.href = `mailto:${
                            userPackage.userId.email
                          }?subject=${encodeURIComponent(
                            emailSubject
                          )}&body=${encodeURIComponent(emailBody)}`;
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors text-sm"
                      >
                        Send Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
