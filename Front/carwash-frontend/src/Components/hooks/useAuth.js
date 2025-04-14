import { useState, useEffect } from 'react'
import { loginUser, logoutUser, getUserProfile, loginAdmin } from '../services/api.js'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserProfile()
        setUser(response.data)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const login = async (credentials, isAdmin = false) => {
    setLoading(true)
    try {
      const loginFn = isAdmin ? loginAdmin : loginUser
      await loginFn(credentials)
      const response = await getUserProfile()
      setUser(response.data)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await logoutUser()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return { user, loading, login, logout }
}