import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Loader from '../loaders/Loader'
import {  useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default function LoginForm({ isAdmin = false }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const [loadings, setLoading] = useState(true)
const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login({ email, password }, isAdmin)
      isAdmin ? Navigate('/AdminDashboard') : Navigate('/profile  ')
    } catch (err) {
      setError('Invalid credentials')
    }
  }
  const fadeup = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. ONE-TIME ENTRANCE ANIMATION (comp)
      
      
      // 2. SCROLL-REVERSIBLE ANIMATIONS
      // Fade-up section
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
      
      // Left slide-in
      
    });
    
    return () => ctx.revert();
  }, []);
  
  // if (loadings) return <Loader/>

  return (
    <form ref={fadeup} onSubmit={handleSubmit} className="w-[300px] min-h-[60vh] max-w-md mx-auto p-6 bg-[#a9a8a8] text-[#1d1d1d]  hover:scale-[1] rounded-lg shadow-lg  animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">{isAdmin ? 'Admin Login' : 'Customer Login'}</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      <div className="mb-4">
        <label className="block  mb-2" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block  mb-2" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#234c58] text-white p-2 rounded cursor-pointer disabled:bg-blue-300"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}