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
      services: pkg.services.map((s) => s._id),
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
    const toggleService = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Packages</h1>

      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Package" : "Add New Package"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Wash Count</label>
            <input
              type="number"
              value={formData.washCount}
              onChange={(e) =>
                setFormData({ ...formData, washCount: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1"> validityDays</label>
            <input
              type="number"
              value={formData.validityDays}
              onChange={(e) =>
                setFormData({ ...formData, validityDays: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Services</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {services.map((service) => (
              <div key={service._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`service-${service._id}`}
                  checked={formData.services.includes(service._id)}
                  onChange={() => toggleService(service._id)}
                  className="mr-2"
                />
                <label htmlFor={`service-${service._id}`}>{service.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Processing..." : editingId ? "Update" : "Add"} Package
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Services</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {packages.map((pkg) => (
              <tr key={pkg._id}>
                <td className="py-3 px-4">{pkg.name}</td>
                <td className="py-3 px-4">{pkg.description}</td>
                <td className="py-3 px-4">${pkg.price}</td>
                <td className="py-3 px-4">
                  {/* <div className="flex flex-wrap gap-1">
                    {pkg.services.map(service => (
                      <span key={service._id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {service.name}
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
  );
}
