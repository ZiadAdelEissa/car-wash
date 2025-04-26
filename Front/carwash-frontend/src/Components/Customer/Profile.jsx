import { useState, useEffect } from "react";

import {
  getUserProfile,
  updateUserProfile,
  addFamilyMember,
} from "../services/api.js";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [familyMember, setFamilyMember] = useState({
    name: "",
    relationship: "",
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response.data);
        setTempProfile(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(tempProfile);
      setProfile(response.data);
      setEditMode(false);
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  const handleAddFamilyMember = async (e) => {
    e.preventDefault();
    try {
      const response = await addFamilyMember(familyMember);
      setProfile((prev) => ({
        ...prev,
        familyMembers: [...prev.familyMembers, response.data],
      }));
      setFamilyMember({ name: "", relationship: "" });
    } catch (error) {
      alert("Failed to add family member");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }
  return (
    <div  className=" min-h-[100vh] p-6  bg-[#171717] text-[#b4b4b4]">
      <div className="mt-[100px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-white text-center w-40 rounded-2xl h-14 relative text-black text-xl font-semibold group"
            >
              <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[155px] z-10 duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  height="25px"
                  width="25px"
                >
                  <path
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    fill="#000000"
                  />
                  <path
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    fill="#000000"
                  />
                </svg>
              </div>
              <p className="translate-x-2">Go Edit</p>
            </button>
          )}
        </div>

        {editMode ? (
          <form
            onSubmit={handleProfileUpdate}
            className="bg-[#a9a8a8] text-[#1d1d1d] hover:shadow-md hover:shadow-gray-900 p-6 rounded-lg shadow-md mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block  mb-2">Name</label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block  mb-2">Email</label>
                <input
                  type="email"
                  value={tempProfile.email}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block  mb-2">Phone</label>
                <input
                  type="tel"
                  value={tempProfile.phone || ""}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, phone: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block  mb-2">Address</label>
                <input
                  type="text"
                  value={tempProfile.address || ""}
                  onChange={(e) =>
                    setTempProfile({ ...tempProfile, address: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="w-[100px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setTempProfile(profile);
                }}
                className="w-[100px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#FF0000] before:to-[rgb(255, 0, 0)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-[#a9a8a8] text-[#1d1d1d] p-6 rounded-lg shadow-md mb-8 hover:shadow-md shadow-fuchsia-950 hover:shadow-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className=" text-sm">Name</h3>
                <p className="text-lg">{profile.name}</p>
              </div>
              <div>
                <h3 className=" text-sm">Email</h3>
                <p className="text-lg">{profile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className=" text-sm">Phone</h3>
                <p className="text-lg">{profile.phone || "Not provided"}</p>
              </div>
              <div>
                <h3 className=" text-sm">Address</h3>
                <p className="text-lg">{profile.address || "Not provided"}</p>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">Family Members</h2>

        <form
          onSubmit={handleAddFamilyMember}
          className="bg-[#a9a8a8] text-[#1d1d1d]  p-6 rounded-lg shadow-md shadow-fuchsia-950 hover:shadow-gray-900 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block  mb-2">Name</label>
              <input
                type="text"
                value={familyMember.name}
                onChange={(e) =>
                  setFamilyMember({ ...familyMember, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block  mb-2">Relationship</label>
              <input
                type="text"
                value={familyMember.relationship}
                onChange={(e) =>
                  setFamilyMember({
                    ...familyMember,
                    relationship: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          >
            Add Family Member
          </button>
        </form>

        {profile.familyMembers?.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.familyMembers.map((member, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.relationship}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="">No family members added yet.</p>
        )}
      </div>
    </div>
  );
}
