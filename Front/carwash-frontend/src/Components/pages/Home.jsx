import { Link } from "react-router-dom";
// import { useAnimation } from '../../Components/hooks/useAnimation.js'
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // useAnimation('home')
  const comp = useRef(null);
  const fadeup = useRef(null);
  const leftElementRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. ONE-TIME ENTRANCE ANIMATION (comp)
      gsap.fromTo(
        comp.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

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
      gsap.fromTo(
        leftElementRef.current,
        {
          x: -150,
          opacity: 0,
          rotateY: 15,
        },
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
      <div
        ref={fadeup}
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
    </div>
  );
}
