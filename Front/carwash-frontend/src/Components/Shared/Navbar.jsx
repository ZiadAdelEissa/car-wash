import { Link, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAuth } from "../../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const { t } = useTranslation();
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

    // Common button style
    const navButtonClass = "flex items-center justify-center gap-2 text-white bg-gray-800/70 hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-white/50 font-medium rounded-full text-sm px-4 py-2.5 transition-all duration-200 border border-white/20";

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
                        veloce Car Wash
                    </Link>

                    <div className="flex items-center space-x-2 max-md:hidden">
                        {user ? (
                            <>
                                {user.role === "super-admin" || user.role === "branch-admin" ? (
                                    <Link to="/AdminDashboard" className={navButtonClass}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                        </svg>
                                        {t('navigation.adminDashboard')}
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Link to="/profile" className={navButtonClass}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            {t('navigation.profile')}
                                        </Link>
                                        <Link to="/customer/dashboard" className={navButtonClass}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="14" width="7" height="7"></rect>
                                                <rect x="3" y="14" width="7" height="7"></rect>
                                            </svg>
                                            {t('navigation.dashboard')}
                                        </Link>
                                        <Link to="/services" className={navButtonClass}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                                <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                            </svg>
                                            {t('navigation.services')}
                                        </Link>
                                        <Link to="/packages" className={navButtonClass}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                            </svg>
                                            {t('navigation.packages')}
                                        </Link>
                                    </div>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className={`${navButtonClass} bg-red-600/80 hover:bg-red-700/80`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
                                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                                    </svg>
                                    {t('auth.logout')}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={navButtonClass}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                        <polyline points="10 17 15 12 10 7"></polyline>
                                        <line x1="15" y1="12" x2="3" y2="12"></line>
                                    </svg>
                                    {t('auth.login')}
                                </Link>
                                <Link to="/register" className={`${navButtonClass} bg-emerald-500/80 hover:bg-emerald-600/80 text-white`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    {t('auth.register')}
                                </Link>
                                <Link to="/admin/login" className={navButtonClass}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    {t('auth.adminLogin')}
                                </Link>
                            </>
                        )}
                        <LanguageSwitcher className="hidden md:block" />
                    </div>
                </div>
            </nav>
            {open && (
                <nav
                    ref={comp}
                    className="bg-[#5c55553a] text-white p-4 shadow-md hover:shadow-indigo-900 transition-shadow backdrop-blur-xs md:hidden fixed top-0 z-10"
                >
                    <div className="menuNav flex flex-col h-screen justify-between mt-[40%] w-[200px] items-start text-center">
                        <div className="flex flex-col justify-centre items-center gap-3 text-center">
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
                                />
                            </i>
                            {user ? (
                                <>
                                    {user.role === "super-admin" || user.role === "branch-admin" ? (
                                        <Link to="/AdminDashboard" className={navButtonClass}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                            </svg>
                                            {t('navigation.adminDashboard')}
                                        </Link>
                                    ) : (
                                        <div className="flex flex-col justify-around items-start space-x-4 gap-3 text-center w-full">
                                            <Link to="/profile" className={navButtonClass}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </svg>
                                                {t('navigation.profile')}
                                            </Link>
                                            <Link to="/customer/dashboard" className={navButtonClass}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="3" y="3" width="7" height="7"></rect>
                                                    <rect x="14" y="3" width="7" height="7"></rect>
                                                    <rect x="14" y="14" width="7" height="7"></rect>
                                                    <rect x="3" y="14" width="7" height="7"></rect>
                                                </svg>
                                                {t('navigation.dashboard')}
                                            </Link>
                                            <Link to="/services" className={navButtonClass}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                                </svg>
                                                {t('navigation.services')}
                                            </Link>
                                            <Link to="/packages" className={navButtonClass}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                                </svg>
                                                {t('navigation.packages')}
                                            </Link>
                                        </div>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className={`${navButtonClass} bg-red-600/80 hover:bg-red-700/80`}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
                                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                                        </svg>
                                        {t('auth.logout')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className={navButtonClass}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                            <polyline points="10 17 15 12 10 7"></polyline>
                                            <line x1="15" y1="12" x2="3" y2="12"></line>
                                        </svg>
                                        {t('auth.login')}
                                    </Link>
                                    <Link to="/register" className={`${navButtonClass} bg-emerald-500/80 hover:bg-emerald-600/80 text-white`}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        {t('auth.register')}
                                    </Link>
                                    <Link to="/admin/login" className={navButtonClass}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        {t('auth.adminLogin')}
                                    </Link>
                                </>
                            )}
                            <LanguageSwitcher className="w-full mb-4" />
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}