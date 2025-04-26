import { Link } from "react-router-dom";
// import { useAnimation } from '../../Components/hooks/useAnimation.js'
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // useAnimation('home')
  const comp = useRef(null);
  const aboutSectionRef = useRef(null); // Renamed for "Who We Are"
  const servicesSectionRef = useRef(null); // Separate ref for "Our Services"
  const leftElementRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Entrance animation
      if (comp.current) {
        gsap.fromTo(
          comp.current,
          { opacity: 0, y: 50, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
        );
      }

      // About section animation
      if (aboutSectionRef.current) {
        gsap.fromTo(
          aboutSectionRef.current,
          { opacity: 0, y: 100, skewY: 3 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: "top 85%",
              end: "bottom 20%",
            },
          }
        );
      }

      // Services section animation
      if (servicesSectionRef.current) {
        gsap.fromTo(
          servicesSectionRef.current,
          { opacity: 0, y: 100, skewY: 3 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: servicesSectionRef.current,
              start: "top 85%",
              end: "bottom 20%",
            },
          }
        );
      }

      // Left slide-in animation
      if (leftElementRef.current) {
        gsap.fromTo(
          leftElementRef.current,
          { x: -150, opacity: 0, rotateY: 15 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftElementRef.current,
              start: "top 80%",
              end: "top 40%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-[100vh] bg-[#171717] text-[#b4b4b4] flex flex-col items-center justify-center text-center p-6 ">
      {/* <img src="https://i.ibb.co/mFSmqjCg/pexels-tima-miroshnichenko-6873123.jpg" alt="Logo" className=" w-full h-fit mb-6 object-cover bg-center absolute -z-10" /> */}
      <div
        ref={comp}
        className=" flex flex-col justify-center items-center max-sm:mt-[80px] mt-24 gap-3"
      >
        <h1 className="text-6xl bg-gradient-to-r from-orange-400 to-pink-600  inline-block text-transparent bg-clip-text ">
          Welcome to Car Wash Pro
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Discover our premium services and packages for your ultimate wash
          experience
        </p>

        {/* <div className="flex flex-col sm:flex-row gap-4">
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
      </div> */}

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="  bg-[#a9a8a8] text-[#1d1d1d] p-6 rounded-lg shadow-lg  hover:shadow-[#4d3577]  scale-[0.9] transition-shadow">
            <h3 className="text-xl  font-bold mb-3">Services</h3>
            <p>
              Explore our wide range of spa services tailored for your needs
            </p>
          </div>
          <div className="bg-[#a9a8a8] text-[#1d1d1d] p-6 rounded-lg shadow-lg  hover:shadow-[#4d3577] transition-shadow">
            <h3 className="text-xl font-bold mb-3">Packages</h3>
            <p>
              Special packages combining multiple services at discounted rates
            </p>
          </div>
          <div className="bg-[#a9a8a8] text-[#1d1d1d] p-6 rounded-lg shadow-lg  hover:shadow-[#4d3577] transition-shadow">
            <h3 className="text-xl font-bold mb-3">Bookings</h3>
            <p>Easy online booking system for your convenience</p>
          </div>
        </div>
      </div>
      {/* start About section */}
      <div
        ref={aboutSectionRef}
        className="mt-16 text-center flex flex-col items-center"
      >
        <h1 className="text-4xl bg-gradient-to-r from-orange-400 to-pink-600 h-16 inline-block text-transparent bg-clip-text">
          Who We Are
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div ref={leftElementRef} className="left w-full ">
            <img
              src="https://i.ibb.co/mFSmqjCg/pexels-tima-miroshnichenko-6873123.jpg"
              alt="Logo"
              className="object-cover object-center  lg:mx-6 w-full h-96 rounded-lg lg:h-[30rem]"
            />
          </div>
          <div className="right flex flex-col items-center justify-centre mt-20 ">
            <p className="text-xl mb-8 max-w-2xl">
              We are a dedicated team of professionals committed to providing
              the best car wash experience. Our state-of-the-art facilities and
              eco-friendly products ensure your vehicle gets the care it
              deserves.
            </p>
            <p className="text-xl mb-8 max-w-2xl">
              Join us in our mission to keep your car looking its best while
              being kind to the environment.
            </p>
            <p className="text-xl mb-8 max-w-2xl">
              Experience the difference with Car Wash Pro!
            </p>
          </div>
        </div>
      </div>
      {/* end About section */}
      {/* start Services section */}
      <div
        ref={servicesSectionRef}
        className="mt-16 text-center flex flex-col h-full items-center"
      >
        <h1 className="text-4xl bg-gradient-to-r from-orange-400 to-pink-600 h-16 inline-block text-transparent bg-clip-text">
          Our Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
              <img
                src="https://i.ibb.co/CpYbC5YY/5d05aa0ec604de046ac8f600c67062d3.jpg"
                alt="Logo"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-6">
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Suv Cars
              </h5>
              <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                felis ligula.
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                data-ripple-light="true"
                type="button"
                className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full hover:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
              >
                Explore
                <svg
                  className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-gray-800 group-hover:fill-gray-800"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end Services section */}
    </div>
  );
}
