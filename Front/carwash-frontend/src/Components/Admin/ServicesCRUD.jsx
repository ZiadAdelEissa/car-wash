import { useState, useEffect, useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../Components/services/api.js";

export default function ServicesCRUD() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    duration: 0,
  });
  const [addService, setAddService] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const tableRef = useRef();
  const tableRowsRef = useRef([]);

  useEffect(() => {
    fetchServices();
  }, []);

  useLayoutEffect(() => {
    // Form animation
    if (formRef.current) {
      gsap.from(formRef.current, {
        duration: 0.5,
        y: 20,
        opacity: 0,
        ease: "power2.out",
      });
    }
  }, [addService, editingId]);

  // useLayoutEffect(() => {
  //   // Table rows animation
  //   if (tableRowsRef.current.length > 0) {
  //     gsap.killTweensOf(tableRowsRef.current);
  //     gsap.from(tableRowsRef.current, {
  //       duration: 0.6,
  //       y: 30,
  //       opacity: 0,
  //       stagger: 0.1,
  //       ease: "back.out",
  //       delay: 0.2,
  //     });
  //   }
  // }, [services]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await getServices();
      setServices(response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateService(editingId, formData);
      } else {
        await createService(formData);
      }
      await fetchServices();
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
    });
    setAddService(true);
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setLoading(true);
      try {
        await deleteService(id);
        await fetchServices();
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", price: 0, duration: 0 });
    setEditingId(null);
    setAddService(false);
  };

  const handleAddService = () => {
    resetForm();
    setAddService(!addService);
  };

  const renderForm = () => {
    return (
      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="mb-8 p-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-lg w-full max-w-4xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-white">
          {editingId ? "Edit Service" : "Add New Service"}
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
            <label className="block text-gray-300 font-medium">Price ($)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-300 font-medium">Duration (minutes)</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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
            ) : editingId ? "Update Service" : "Add Service"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="h-full p-6 mt-[80px] flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl m-5 text-center bg-gradient-to-r from-orange-400 to-pink-600 text-transparent bg-clip-text">
        Manage Services
      </h1>

      <button
        onClick={handleAddService}
        disabled={loading}
        className={`mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          addService && !editingId ? "Hide Form" : "Add New Service"
        )}
      </button>

      {(addService || editingId) && renderForm()}

      <div className="w-full overflow-x-auto" ref={tableRef}>
        {loading && services.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Loading services...</div>
        ) : (
          <table className="min-w-full bg-[#454545] backdrop-blur-lg rounded-lg overflow-hidden">
            <thead className="bg-[#f8f8f8]">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Duration</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {services.map((service, index) => (
                <tr 
                  key={service._id} 
                  className="hover:bg-gray-700 transition-colors"
                  ref={el => tableRowsRef.current[index] = el}
                >
                  <td className="py-3 px-4 text-white">{service.name}</td>
                  <td className="py-3 px-4 text-gray-300">{service.description}</td>
                  <td className="py-3 px-4 text-white">${service.price}</td>
                  <td className="py-3 px-4 text-white">{service.duration} min</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
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