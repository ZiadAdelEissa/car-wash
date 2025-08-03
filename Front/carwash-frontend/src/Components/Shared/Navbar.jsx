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
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    // Modern button styles
    const navButtonClass = "flex items-center justify-center gap-2 text-white hover:text-indigo-100 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 transition-all duration-300";
    const primaryButtonClass = "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/50";
    const secondaryButtonClass = "bg-gray-800/50 hover:bg-gray-700/60 backdrop-blur-sm border border-gray-600/30 hover:border-indigo-400/50";
    const dangerButtonClass = "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-rose-500/30";

    return (
        <>
            <nav
                ref={comp}
                className="bg-gray-900/80 text-white p-4 fixed top-0 w-full z-30 backdrop-blur-md border-b border-gray-700/50"
            >
                <div className="container mx-auto flex justify-between items-center">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {open ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </button>

                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold  bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
                        {/* VELOCE <span className="text-white">CarWash</span> */}
                        <img src="https://i.ibb.co/5gxBgtVR/quiq-it-logo.jpg"  className="w-[75px] h-[75px] rounded-3xl " alt="logo"/>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {user ? (
                            <>
                                {user.role === "super-admin" || user.role === "branch-admin" ? (
                                    <Link to="/AdminDashboard" className={`${navButtonClass} ${primaryButtonClass}`}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                        </svg>
                                        {t('navigation.adminDashboard')}
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Link to="/profile" className={`${navButtonClass} ${secondaryButtonClass}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            {t('navigation.profile')}
                                        </Link>
                                        <Link to="/customer/dashboard" className={`${navButtonClass} ${secondaryButtonClass}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="14" width="7" height="7"></rect>
                                                <rect x="3" y="14" width="7" height="7"></rect>
                                            </svg>
                                            {t('navigation.dashboard')}
                                        </Link>
                                        <Link to="/services" className={`${navButtonClass} ${secondaryButtonClass}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                                <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                            </svg>
                                            {t('navigation.services')}
                                        </Link>
                                        <Link to="/packages" className={`${navButtonClass} ${secondaryButtonClass}`}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                            </svg>
                                            {t('navigation.packages')}
                                        </Link>
                                    </div>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className={`${navButtonClass} ${dangerButtonClass}`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
                                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                                    </svg>
                                    {t('auth.logout')}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={`${navButtonClass} ${secondaryButtonClass}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                        <polyline points="10 17 15 12 10 7"></polyline>
                                        <line x1="15" y1="12" x2="3" y2="12"></line>
                                    </svg>
                                    {t('auth.login')}
                                </Link>
                                <Link to="/register" className={`${navButtonClass} ${primaryButtonClass}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    {t('auth.register')}
                                </Link>
                                <Link to="/admin/login" className={`${navButtonClass} ${secondaryButtonClass}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    {t('auth.adminLogin')}
                                </Link>
                            </>
                        )}
                        <LanguageSwitcher className="ml-2" />
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {open && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div 
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
                        onClick={() => setOpen(false)}
                    />
                    <div className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-gray-900/95 backdrop-blur-lg border-r border-gray-700/50 shadow-2xl transform transition-transform duration-300 ease-in-out">
                        <div className="flex flex-col h-full p-4">
                            <div className="flex justify-between items-center mb-8">
                                <Link 
                                    to="/" 
                                    className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
                                    onClick={() => setOpen(false)}
                                >
                                    {/* Veloce<span className="text-white">CarWash</span> */}
                                                            <img src="https://i.ibb.co/5gxBgtVR/quiq-it-logo.jpg"  className="w-[75px] h-[75px] rounded-full" alt="logo"/>

                                </Link>
                                <button 
                                    onClick={() => setOpen(false)}
                                    className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            <nav className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                                {user ? (
                                    <>
                                        {user.role === "super-admin" || user.role === "branch-admin" ? (
                                            <Link 
                                                to="/AdminDashboard" 
                                                className={`${navButtonClass} ${primaryButtonClass} justify-start`}
                                                onClick={() => setOpen(false)}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                                </svg>
                                                {t('navigation.adminDashboard')}
                                            </Link>
                                        ) : (
                                            <>
                                                <Link 
                                                    to="/profile" 
                                                    className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                                    {t('navigation.profile')}
                                                </Link>
                                                <Link 
                                                    to="/customer/dashboard" 
                                                    className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="3" y="3" width="7" height="7"></rect>
                                                        <rect x="14" y="3" width="7" height="7"></rect>
                                                        <rect x="14" y="14" width="7" height="7"></rect>
                                                        <rect x="3" y="14" width="7" height="7"></rect>
                                                    </svg>
                                                    {t('navigation.dashboard')}
                                                </Link>
                                                <Link 
                                                    to="/services" 
                                                    className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                                    </svg>
                                                    {t('navigation.services')}
                                                </Link>
                                                <Link 
                                                    to="/packages" 
                                                    className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                                    </svg>
                                                    {t('navigation.packages')}
                                                </Link>
                                            </>
                                        )}

                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setOpen(false);
                                            }}
                                            className={`${navButtonClass} ${dangerButtonClass} justify-start mt-auto`}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
                                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                                            </svg>
                                            {t('auth.logout')}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link 
                                            to="/login" 
                                            className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                                            onClick={() => setOpen(false)}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                                <polyline points="10 17 15 12 10 7"></polyline>
                                                <line x1="15" y1="12" x2="3" y2="12"></line>
                                            </svg>
                                            {t('auth.login')}
                                        </Link>
                                        <Link 
                                            to="/register" 
                                            className={`${navButtonClass} ${primaryButtonClass} justify-start`}
                                            onClick={() => setOpen(false)}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                            {t('auth.register')}
                                        </Link>
                                        <Link 
                                            to="/admin/login" 
                                            className={`${navButtonClass} ${secondaryButtonClass} justify-start`}
                                            onClick={() => setOpen(false)}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            {t('auth.adminLogin')}
                                        </Link>
                                    </>
                                )}
                                <div className="mt-4">
                                    <LanguageSwitcher className="w-full" />
                                </div>
                                
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}