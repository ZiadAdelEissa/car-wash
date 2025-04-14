import { Link } from 'react-router-dom'
import { useAnimation } from '../../Components/hooks/useAnimation.js'

export default function Home() {
  useAnimation('home')

  return (
    <div className="min-h-[80vh] bg-[#cdd5db] text-black flex flex-col items-center justify-center text-center p-6 max-sm:mt-[80px]">
      {/* <img src="https://i.ibb.co/mFSmqjCg/pexels-tima-miroshnichenko-6873123.jpg" alt="Logo" className=" w-full h-fit mb-6 object-cover bg-center absolute -z-10" /> */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6 ">Welcome to Spa & Wellness</h1>
      <p className="text-xl mb-8 max-w-2xl">Discover our premium services and packages for your ultimate relaxation experience</p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/login" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Customer Login
        </Link>
        <Link 
          to="/admin/login" 
          className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-colors"
        >
          Admin Login
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-blue-900  transition-shadow">
          <h3 className="text-xl  font-bold mb-3">Services</h3>
          <p>Explore our wide range of spa services tailored for your needs</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-indigo-900 transition-shadow">
          <h3 className="text-xl font-bold mb-3">Packages</h3>
          <p>Special packages combining multiple services at discounted rates</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-fuchsia-900 transition-shadow">
          <h3 className="text-xl font-bold mb-3">Bookings</h3>
          <p>Easy online booking system for your convenience</p>
        </div>
      </div>
    </div>
  )
}