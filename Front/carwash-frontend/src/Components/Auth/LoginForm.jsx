import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function LoginForm({ isAdmin = false }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  const fadeup = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }, isAdmin);
      isAdmin ? navigate("/AdminDashboard") : navigate("/profile");
    } catch (err) {
      setError(t("login.error"));
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        fadeup.current,
        {
          opacity: 0,
          y: 100,
          skewY: 3,
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: fadeup.current,
            start: "top 85%",
            end: "bottom 20%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <form
      ref={fadeup}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md shadow-fuchsia-900 hover:shadow-gray-900 animate-fade-in mt-[90px]"
    >
      <h2 className="text-2xl text-black font-bold mb-6 text-center">
        {isAdmin ? t("login.adminTitle") : t("login.title")}
      </h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-black mb-2" htmlFor="email">
          {t("login.email")}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-black p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-black mb-2" htmlFor="password">
          {t("login.password")}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-black p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg transition-all duration-300"
      >
        {loading ? t("login.loading") : t("login.submit")}
      </button>
    </form>
  );
}