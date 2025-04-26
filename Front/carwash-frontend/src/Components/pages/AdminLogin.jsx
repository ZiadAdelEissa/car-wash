import LoginForm from '../Auth/LoginForm.jsx'
import { Link } from 'react-router-dom'

export default function AdminLogin() {
  return (
    <div className="min-h-[100vh] bg-[#171717] flex items-center justify-center p-4 ">
                  {/* <img src="https://i.ibb.co/mFSmqjCg/pexels-tima-miroshnichenko-6873123.jpg" alt="Logo" className=" mb-6 bg-cover bg-center absolute -z-10" /> */}

      <div className=" max-w-md flex flex-col justify-evenly items-center">
        <LoginForm isAdmin={true} />
        <div className="mt-4 text-center">
          <p className="text-[#b4b4b4]">Customer login? <Link to="/login" className="text-blue-600 hover:underline">Click here</Link></p>
        </div>
      </div>
    </div>
  )
}