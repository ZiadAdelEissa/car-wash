// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./Components/pages/Home";
import Navbar from "./Components/Shared/Navbar";
import CustomerLogin from "./Components/pages/CustomerLogin";
import AdminLogin from "./Components/pages/AdminLogin";
import Register from "./Components/Auth/RegisterForm";
import Dashboard from "./Components/Customer/Dashboard";
import AdminDashboard from "./Components/Admin/Dashboard";
import Servicess from "./Components/Customer/Services";
import Packages from "./Components/Customer/Packages";
import RegisterAdmin from "./Components/pages/RegisterAdmin";
// import RegisterSuberAdmin from "./Components/pages/RegisterAdmin";
import Booking from "./Components/Customer/Booking";
import BranchesCRUD from "./Components/Admin/BranchesCRUD";
import ServicesCRUD from "./Components/Admin/ServicesCRUD";
import PackagesCRUD from "./Components/Admin/PackagesCRUD";
import BookingsManagement from "./Components/Admin/BookingsManagement";
import Profile from "./Components/Customer/Profile";
import ServicesBooking from "./Components/Customer/ServicesBooking";
import Footer from "./Components/Shared/Footer"
import { AuthProvider } from "./context/AuthContext";
import './i18n';
export default function App() {
  return (
    <AuthProvider>
      <div className=" min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<><Profile /><Footer/></>} />
          <Route path="/Services" element={<><Servicess /><Footer/></>} />
          <Route path="/packages" element={<><Packages /><Footer/></>} />
          <Route path="/booking" element={<><Booking /><Footer/></>} />
          <Route path="/serviceBooking" element={<><ServicesBooking /><Footer/></>} />
          <Route path="/register" element={<><Register /><Footer/></>} />
          <Route path="/login" element={<><CustomerLogin /><Footer/></>} />
          <Route path="/admin/login" element={<><AdminLogin /><Footer/></>} />
          <Route path="/customer/dashboard" element={<><Dashboard /><Footer/></>} />
          {/* <Route path="/Registers" element={<><Register />} /> */}
          <Route path="/Registeradmin" element={<><RegisterAdmin /><Footer/></>} />
          <Route path="/AdminDashboard" element={<><AdminDashboard /><Footer/></>} />
          <Route path="/BranchCrud" element={<><BranchesCRUD /><Footer/></>} />
          <Route path="/ServicesCrud" element={<><ServicesCRUD /><Footer/></>} />
          <Route path="/PackagesCRUD" element={<><PackagesCRUD /><Footer/></>} />
          <Route
            path="/AdminDashboard/Bookings"
            element={<><BookingsManagement /><Footer/></>}
          />
        </Routes>
      
      </div>
    </AuthProvider>
  );
}
