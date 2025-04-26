import { useState } from "react";
import {registerAdmin,getAllBranches} from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function RegisterAdmin() {
  const [branches, setBranches] = useState([]);
  const formRef = useRef();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    phone:"",
    password:"",
    role:"", // Will now save exactly what you send
    branch:""
  })

  const navigate = useNavigate();

  // Fetch branches for branch-admin assignment
  useEffect(() => {
    gsap.from(formRef.current, { opacity: 0, y: 20, duration: 0.8 });
    gsap.to(formRef.current, { opacity: 1, y: 0, duration: 0.8 });

  const fetchBranches = async () => {
    try {
      const response = await getAllBranches();
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
    fetchBranches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await registerAdmin(formData)
      navigate('/AdminDashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-8">
      <div ref={formRef} className="max-w-md mx-auto">
        <h1 className="text-3xl mb-6 text-center">Register Admin</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />

<label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-2 border rounded"
          required
        />

          <input
            type="text"
            className="w-full p-3 rounded bg-gray-800"
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <input
            type="password"
            className="w-full p-3 rounded bg-gray-800"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <select
            className="w-full p-3 rounded bg-gray-800"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="branch-admin">Chosse role</option>
            <option value="branch-admin">Branch Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>

          {formData.role === "branch-admin" && (
            <select
              className="w-full p-3 rounded bg-gray-800"
              required
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name} - {branch.location}
                </option>
              ))}
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 py-3 rounded hover:bg-blue-700"
          >
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
}
