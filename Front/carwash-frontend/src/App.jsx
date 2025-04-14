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
// import RegisterAdmin from "./Components/pages/Admin/RegisterAdmin";
// import RegisterSuberAdmin from "./Components/pages/Admin/superadmin";
import Booking from "./Components/Customer/Booking";

export default function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Services" element={<Servicess />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/booking" element={<Booking/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/customer/dashboard" element={<Dashboard />} />
          {/* <Route path="/Registeradmin" element={<RegisterAdmin />} /> */}
          {/* <Route path="/Registersuperadmin" element={<RegisterSuberAdmin />} /> */}
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
        </Routes>
    </>
  );
}
