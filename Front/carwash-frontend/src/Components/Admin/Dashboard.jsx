import { useState, useEffect } from "react";
import { getSystemStats } from "../services/api.js";
// import { useAnimation } from "../hooks/useAnimation.js";
import { useTranslation } from "react-i18next";
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    activeUsers: 0,
    branches: 0,
  });
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  // useAnimation("dashboard");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getSystemStats();
        setStats(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return <div className="p-6 text-center">Loading dashboard...</div>;

  return (
    <div className="Dashboard p-6 minh-[100vh] flex flex-col items-center justify-center text-center mt-[70px]">
      {/* <img src="https://i.ibb.co/mFSmqjCg/pexels-tima-miroshnichenko-6873123.jpg" alt="Logo" className=" mb-6 bg-cover bg-center absolute -z-10" /> */}

      <h1 className="text-4xl m-5 text-center bg-gradient-to-r from-orange-400 to-pink-600 text-transparent bg-clip-text">{t("admin.title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-lg shadow-md dashboard-stats">
          <h2 className="text-xl font-semibold mb-2">{t("admin.totalBookings")}</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.totalBookings}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md dashboard-stats">
          <h2 className="text-xl font-semibold mb-2">{t("admin.completedBookings")}</h2>
          <p className="text-4xl font-bold text-green-600">{stats.completedBookings}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md dashboard-stats">
          <h2 className="text-xl font-semibold mb-2">{t("admin.activeUsers")}</h2>
          <p className="text-4xl font-bold text-purple-600">{stats.activeUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md dashboard-stats">
          <h2 className="text-xl font-semibold mb-2">{t("admin.branches")}</h2>
          <p className="text-4xl font-bold text-orange-600">{stats.branches}</p>
        </div>
      </div>

      <div className="bg-white  p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{t("admin.quickActions")}</h2>
        <div className="flex flex-wrap max-sm:flex-col items-center gap-4">
          <a
            href="/ServicesCrud"
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200"
          >
           {t("admin.manageServices")} 
          </a>
          <a
            href="/PackagesCRUD"
            className="bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200"
          >
            {t("admin.managePackages")}
          </a>
          <a
            href="/BranchCrud"
            className="bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200"
          >
            {t("admin.manageBranches")}
          </a>
          <a
            href="/AdminDashboard/Bookings"
            className="bg-orange-100 text-orange-700 px-4 py-2 rounded hover:bg-orange-200"
          >
            {t("admin.manageBookings")}
          </a>
        </div>
      </div>
    </div>
  );
}
