import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { getServices } from "../services/api.js";
import { Link } from "react-router-dom";
import Loader from "../loaders/Loader.jsx";
import { gsap } from "gsap";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);
  useLayoutEffect(() => {
    // Only animate the title if it exists
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [loading]); // Run when loading completes

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-[100vh] p-6 bg-[#171717] text-white ">
      <div
        ref={titleRef}
        className="flex flex-col items-center justify-center text-center mb-6 mt-[80px]"
      >
        <h1 className="text-6xl bg-gradient-to-r from-orange-400 to-pink-600  inline-block text-transparent bg-clip-text m-5">
          Our Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 ">
          {services.map((service) => (
            <div
              key={service._id}
              className="w-full p-6 flex flex-col justify-between items-center bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 "
            >
              <h5 className="mb-4 text-xl font-medium ">{service.name}</h5>
              <div className="flex items-center ">
                <span className="text-5xl font-extrabold tracking-tight">
                  {service.price}
                </span>
                <span className="text-3xl font-semibold">$</span>
              </div>
              <p className="mt-4 ">{service.description}</p>

              <ul role="list" className="space-y-3 my-5">
                {service.features?.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="shrink-0 w-4 h-4 text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-400 ms-3">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to={`/serviceBooking`}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
