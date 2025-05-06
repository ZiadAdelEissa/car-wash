import { useState, useEffect } from "react";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  getServices,
} from "../services/api.js";
import { useAnimation } from "../hooks/useAnimation.js";

export default function PackagesCRUD() {
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    services: [],
    washCount: 0,
    validityDays: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  useAnimation("crud");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packagesRes, servicesRes] = await Promise.all([
          getPackages(),
          getServices(),
        ]);
        setPackages(packagesRes.data);
        setServices(servicesRes.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updatePackage(editingId, formData);
      } else {
        await createPackage(formData);
      }
      const response = await getPackages();
      setPackages(response.data);
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg) => {
    setFormData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      washCount: pkg.washCount,
      validityDays: pkg.validityDays,
      // services: pkg.name,
    });
    setEditingId(pkg._id);
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        const response = await deletePackage(_id);
        console.log("Delete response:", response); // Log successful response
        
        const packagesResponse = await getPackages();
        setPackages(packagesResponse.data);
        alert("Package deleted successfully");
      } catch (error) {
        console.error("Full error:", {
          message: error.message,
          response: error.response,
          config: error.config
        });
        alert(`Delete failed: ${error.response?.data?.message || error.message}`);
      }
    }
    };  
    const toggleService = (serviceId ,name) => {
      setFormData(prev => ({
        ...prev,
        services: prev.services.includes(serviceId,name)
          ? prev.services.filter(id => id !== serviceId)
          : [...prev.services, serviceId]
      }))
    }  

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      services: [],
      washCount: 0,
      validityDays: 0
    });
    setEditingId(null);
  };

  if (loading && packages.length === 0)
    return <div className="p-6 text-center">Loading packages...</div>;

  return (
    <div className="p-6 flex flex-col items-center justify-center   min-h-screen">
      <div className="mt-[80px]">

      <h1 className="text-4xl m-5 text-center bg-gradient-to-r from-orange-400 to-pink-600   text-transparent bg-clip-text">Manage Packages</h1>
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-lg w-full max-w-4xl">
  <h2 className="text-2xl font-bold mb-6 text-white">
    {editingId ? "Edit Package" : "Add New Package"}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div className="space-y-2">
      <label className="block text-gray-300 font-medium">Name</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        required
      />
    </div>
    <div className="space-y-2">
      <label className="block text-gray-300 font-medium">Price</label>
      <input
        type="number"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        required
      />
    </div>
    <div className="space-y-2">
      <label className="block text-gray-300 font-medium">Wash Count</label>
      <input
        type="number"
        value={formData.washCount}
        onChange={(e) => setFormData({ ...formData, washCount: e.target.value })}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        required
      />
    </div>
    <div className="space-y-2">
      <label className="block text-gray-300 font-medium">Validity Days</label>
      <input
        type="number"
        value={formData.validityDays}
        onChange={(e) => setFormData({ ...formData, validityDays: e.target.value })}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        required
      />
    </div>
  </div>

  <div className="mb-6 space-y-2">
    <label className="block text-gray-300 font-medium">Description</label>
    <textarea
      value={formData.description}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      rows="4"
      required
    />
  </div>

  <div className="flex gap-3">
    <button
      type="submit"
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : editingId ? "Update Package" : "Add Package"}
    </button>
    {editingId && (
      <button
        type="button"
        onClick={resetForm}
        className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all"
      >
        Cancel
      </button>
    )}
  </div>
</form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#454545]  backdrop-blur-lg rounded-lg overflow-hidden">
          <thead className="bg-[#f8f8f8] ">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">NO.washes and validity</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-white">
            {packages.map((pkg) => (
              <tr key={pkg._id}>
                <td className="py-3 px-4">{pkg.name}</td>
                <td className="py-3 px-4">{pkg.description}</td>
                <td className="py-3 px-4">{pkg.price}€</td>
                <td className="py-3 px-4">
                  {pkg.washCount} washes, valid for {pkg.validityDays} days
                  {/* <div className="flex flex-wrap gap-1">
                    {packages.map(service => (
                      <span key={service._id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {service.services?.name}
                      </span>
                    ))}
                  </div> */}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
    </div>
  );
}
