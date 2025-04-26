import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const mobileMenuItemsRef = useRef([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const comp = useRef(null);
  useLayoutEffect(() => {
    const t1 = gsap.timeline();
    t1.fromTo(
      comp.current,
      { opacity: 0, xPercent: "-100" },
      { opacity: 1, xPercent: "0", duration: 1 }
    );
  }, []);

  return (
    <>
      <nav
        ref={comp}
        className="bg-[#5c55553a] text-white p-4 shadow-md hover:shadow-indigo-900 transition-shadow backdrop-blur-sm fixed top-0 w-full z-10"
      >
        <div className="container mx-auto flex justify-between items-center">
          <i
            onClick={() => setOpen((open) => !open)}
            className="icon md:hidden cursor-pointer"
          >
            {open ? (
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/top-menu.png"
                alt="top-menu"
              />
            ) : (
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/top-menu.png"
                alt="top-menu"
              />
            )}
          </i>
          <Link to="/" className="text-xl font-bold">
            Car wash Pro
          </Link>

          <div className="flex items-center space-x-4 max-md:hidden">
            {user ? (
              <>
                {user.role === "super-admin" || user.role === "branch-admin" ? (
                  <button className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800/30 backdrop-blur-lg px-3 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
                    <Link to="/AdminDashboard" className="text-lg">
                      Admin Dashboard
                    </Link>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                      <div className="relative h-full w-10 bg-white/20" />
                    </div>
                  </button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/profile"
                      className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/customer/dashboard"
                      className=" cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      <div className="relative overflow-hidden">
                        <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                          Dashboard
                        </p>
                        <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                          <img
                            width="24"
                            height="24"
                            src="https://img.icons8.com/material-rounded/24/arrow.png"
                            alt="arrow"
                          />
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/services"
                      className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Services
                    </Link>
                    <Link
                      to="/packages"
                      className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Packages
                    </Link>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className=" group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                >
                  <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                    <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                  <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    Logout
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800/30 backdrop-blur-lg px-3 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
                  <h1  className="text-lg">
                    Login Now
                  </h1>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/20" />
                  </div>
                </Link>
                <button className="cursor-pointer group relative bg-[#a9a8a8] hover:bg-emerald-500 text-black font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-40 h-12">
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="relative inline-block overflow-hidden">
                      <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                        Go Register
                      </span>
                      <Link
                        to="/register"
                        className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0"
                      >
                        Right Now
                      </Link>
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                      viewBox="0 0 24 24"
                    >
                      <circle fill="currentColor" r={11} cy={12} cx={12} />
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth={2}
                        stroke="white"
                        d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                      />
                    </svg>
                  </div>
                </button>
                <Link  to="/admin/login" className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800/30 backdrop-blur-lg px-3 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
                  <h1 className="text-lg">
                    Admin Login
                  </h1>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-10 bg-white/20" />
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {open && (
        <nav
          ref={comp}
          className="bg-[#5c55553a] text-white p-4 shadow-md hover:shadow-indigo-900 transition-shadow backdrop-blur-xs md:hidden fixed top-0  z-10"
        >
          <div className="menuNav flex flex-col h-screen justify-between mt-[40%] w-[200px] items-start text-center">
            <div className="flex flex-col justify-centre items-center  gap-3 text-center ">
              <i
                onClick={() => setOpen(!open)}
                className="text-xl font-bold cursor-pointer flex justify-between items-center w-full gap-12 p-4"
              >
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/badges/48/automatic-car-wash.png"
                  alt="automatic-car-wash"
                />
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png"
                  alt="delete-sign--v1"
                />{" "}
              </i>
              {user ? (
                <>
                  {user.role === "super-admin" ||
                  user.role === "branch-admin" ? (
                    <Link
                      to="/AdminDashboard"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <div className="flex flex-col justify-around items-start space-x-4 gap-3 text-center w-full ">
                      <Link
                        to="/profile"
                        className="w-[150px]  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/customer/dashboard"
                        className="w-[150px] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      >
                        My Dashboard
                      </Link>
                      <Link
                        to="/services"
                        className="w-[150px] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      >
                        Services
                      </Link>
                      <Link
                        to="/packages"
                        className="  w-[150px] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      >
                        Packages
                      </Link>
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className=" group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                  >
                    <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 512 512"
                        fill="white"
                      >
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                    </div>
                    <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      Logout
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800/30 backdrop-blur-lg px-3 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
                    <Link to="/login" className="text-lg">
                      Login Now
                    </Link>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                      <div className="relative h-full w-10 bg-white/20" />
                    </div>
                  </button>
                  <Link
                    to="/register"
                    className="cursor-pointer group relative bg-[#a9a8a8] hover:bg-emerald-500 text-black font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-40 h-12"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <span className="relative inline-block overflow-hidden">
                        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                          Go Register
                        </span>
                        <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                          Right Now
                        </span>
                      </span>
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                        viewBox="0 0 24 24"
                      >
                        <circle fill="currentColor" r={11} cy={12} cx={12} />
                        <path
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth={2}
                          stroke="white"
                          d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                        />
                      </svg>
                    </div>
                  </Link>
                  <button className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800/30 backdrop-blur-lg px-3 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
                    <Link to="/admin/login" className="text-lg">
                      Admin Login
                    </Link>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                      <div className="relative h-full w-10 bg-white/20" />
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
