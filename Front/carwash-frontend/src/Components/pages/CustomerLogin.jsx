import LoginForm from '../Auth/LoginForm.jsx'
import { Link } from 'react-router-dom'

export default function CustomerLogin() {
  return (
    <div className="min-h-[100vh] bg-[#171717] text-[#b4b4b4] flex items-center justify-center p-4 ">
            {/* <img src="https://i.ibb.co/mFSmqjCg/pexels-tima-miroshnichenko-6873123.jpg" alt="Logo" className=" mb-6 bg-cover bg-center absolute -z-10" /> */}

      <div className="w-full max-w-md">
        <LoginForm />
        <div className="mt-4 text-center">
          <p className="">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link></p>
        </div>
      </div>
    </div>
  )
}