import { useState, useEffect } from "react";
import {
  getUserProfile,
  updateUserProfile,
  addFamilyMember,
} from "../services/api.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [familyMember, setFamilyMember] = useState({
    email: "",
    relationship: "",
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response.data);
        setTempProfile(response.data);
        toast.success("Profile loaded successfully");
      } catch (error) {
        console.error("Profile fetch error:", error);
        if (error.response?.status === 401) {
          toast.error("Please login again to access your profile");
        } else {
          toast.error("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!tempProfile) {
        toast.error("Profile data is null");
        return;
      }
      const response = await updateUserProfile(tempProfile);
      setProfile(response.data);
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleAddFamilyMember = async (e) => {
    e.preventDefault();
    try {
      const response = await addFamilyMember(familyMember);
      if (response.error) {
        toast.error(response.message);
        return;
      }
      setProfile((prev) => ({
        ...prev,
        familyMembers: [...prev.familyMembers, response.data],
      }));
      setFamilyMember({ email: "", relationship: "" });
      toast.success("Family member added successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add family member"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#171717]">
        <div className="animate-pulse text-[#b4b4b4]">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171717] text-[#b4b4b4] p-4 md:p-8">
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="max-w-6xl mx-auto mt-30 md:mt-24">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{t("profile.title")}</h1>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#009b49] hover:bg-[#007a3a] text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
            {t("profile.editButton")}
            </button>
          )}
        </div>

        {/* Profile Card */}
        {editMode ? (
          <form
            onSubmit={handleProfileUpdate}
            className="bg-[#2d2d2d] p-6 rounded-xl shadow-lg mb-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#009b49]/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#b4b4b4]">{t("profile.name")}</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, name: e.target.value })
                  }
                  className="w-full p-3 bg-[#1d1d1d] border border-[#3d3d3d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#009b49]"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#b4b4b4]">{t("profile.email")}</label>
                <input
                  type="email"
                  value={tempProfile.email}
                  className="w-full p-3 bg-[#1d1d1d] border border-[#3d3d3d] rounded-lg text-[#7d7d7d] cursor-not-allowed"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#b4b4b4]">\{t("profile.phone")}</label>
                <input
                  type="tel"
                  value={tempProfile.phone || ""}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, phone: e.target.value })
                  }
                  className="w-full p-3 bg-[#1d1d1d] border border-[#3d3d3d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#009b49]"
                />
              </div>
              {/* <div className="space-y-2">
                <label className="block text-sm font-medium text-[#b4b4b4]">Address</label>
                <input
                  type="text"
                  value={tempProfile.address || ""}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, address: e.target.value })
                  }
                  className="w-full p-3 bg-[#1d1d1d] border border-[#3d3d3d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#009b49]"
                />
              </div> */}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-[#009b49] hover:bg-[#007a3a] text-white font-medium rounded-full transition-all duration-300"
              >
                {t("profile.saveChanges")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setTempProfile(profile);
                  toast.warning("Changes discarded");
                }}
                className="px-6 py-3 bg-[#3d3d3d] hover:bg-[#4d4d4d] text-white font-medium rounded-full transition-all duration-300"
              >
               {t("profile.cancel")}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-[#2d2d2d] p-6 rounded-xl shadow-lg mb-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#009b49]/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-[#b4b4b4]">{t("profile.name")}</h3>
                <p className="text-lg text-white">{profile?.name || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-[#b4b4b4]">{t("profile.email")}</h3>
                <p className="text-lg text-white">{profile?.email || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-[#b4b4b4]">{t("profile.phone")}</h3>
                <p className="text-lg text-white">
                  {profile?.phone || <span className="text-[#7d7d7d]">{t("profile.notProvided")}</span>}
                </p>
              </div>
              {/* <div className="space-y-1">
                <h3 className="text-sm font-medium text-[#b4b4b4]">Address</h3>
                <p className="text-lg text-white">
                  {profile.address || <span className="text-[#7d7d7d]">{t("profile.notProvided")}</span>}
                </p>
              </div> */}
            </div>
          </div>
        )}

        {/* Family Members Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Family Members</h2>
          
          {/* Add Family Member Form */}
          <form
            onSubmit={handleAddFamilyMember}
            className="bg-[#2d2d2d] p-6 rounded-xl shadow-lg mb-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#009b49]/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#b4b4b4]">Email</label>
                <input
                  type="email"
                  value={familyMember.email}
                  onChange={(e) =>
                    setFamilyMember({ ...familyMember, email: e.target.value })
                  }
                  className="w-full p-3 bg-[#1d1d1d] border border-[#3d3d3d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#009b49]"
                  required
                  placeholder="Enter family member's email"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#b4b4b4]">Relationship</label>
                <select
                  value={familyMember.relationship}
                  onChange={(e) =>
                    setFamilyMember({
                      ...familyMember,
                      relationship: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-[#1d1d1d] border border-[#3d3d3d] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#009b49]"
                  required
                >
                  <option value="">Select relationship</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="child">Child</option>
                  <option value="sibling">Sibling</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-[#009b49] hover:bg-[#007a3a] text-white font-medium rounded-full transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Add Family Member
            </button>
          </form>

          {/* Family Members List */}
          {profile?.familyMembers?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.familyMembers?.map((member, index) => (
                <div
                  key={index}
                  className="bg-[#2d2d2d] p-4 rounded-lg border border-[#3d3d3d] hover:border-[#009b49] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-[#009b49]/20 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-[#009b49]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {member.email || member.name}
                      </h3>
                      <p className="text-sm text-[#b4b4b4]">
                        Connected to: {profile?.email || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#b4b4b4] capitalize pl-11">
                    Relationship: {member.relationship}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#2d2d2d] p-6 rounded-xl text-center">
              <p className="text-[#b4b4b4]">No family members added yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}