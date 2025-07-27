import { Link } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../Shared/Footer";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useTranslation();
  const comp = useRef(null);
  const aboutSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const leftElementRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (comp.current) {
        gsap.fromTo(
          comp.current,
          { opacity: 0, y: 50, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
        );
      }

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
 const navButtonClass = "flex items-center justify-center gap-2 text-white hover:text-indigo-100 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 transition-all duration-300";
    const primaryButtonClass = "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/50";
    const secondaryButtonClass = "bg-gray-800/50 hover:bg-gray-700/60 backdrop-blur-sm border border-gray-600/30 hover:border-indigo-400/50";
    const dangerButtonClass = "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-rose-500/30";
  return (
    <>
      <img src="https://i.ibb.co/mFSmqjCg/pexels-tima-miroshnichenko-6873123.jpg" alt="Car Wash" className=" fixed top-0 left-0 w-full h-full object-cover  z-0" />
    <div className="min-h-[100vh] bg-[#171717] text-[#fff] flex flex-col items-center justify-center text-center p-6 max-lg:hidden sm:flex ">
      <div
        ref={comp}
        className=" flex flex-col justify-center items-center max-sm:mt-[80px] mt-24 gap-3"
      >
        <h1 className="text-6xl bg-gradient-to-r from-orange-400 to-pink-600  inline-block text-transparent bg-clip-text ">
          {t('home.welcome.title')}
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          {t('home.welcome.subtitle')}
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {['services', 'packages', 'bookings'].map((key) => (
            <div key={key} className="bg-[#fff] text-[#1d1d1d] p-6 rounded-lg shadow-lg hover:shadow-[#4d3577] transition-shadow scale-[0.9]">
              <h3 className="text-xl font-bold mb-3">
                {t(`home.services.${key}.title`)}
              </h3>
              <p>{t(`home.services.${key}.description`)}</p>
              <Link
                to="/register"
                className="mt-4 inline-block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/50 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform"
              >
                {t("home.welcome.log")}
              </Link>
            </div>

          ))}
        </div>
      </div>

      {/* About section */}
      <div
        ref={aboutSectionRef}
        className="mt-24 text-center flex flex-col items-center"
      >
        <h1 className="text-4xl bg-gradient-to-r from-orange-400 to-pink-600 h-16 inline-block text-transparent bg-clip-text">
          {t('home.about.title')}
        </h1>
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-6 mt-16">
          <div ref={leftElementRef} className="left w-full h-full  ">
            <img
              src="https://i.ibb.co/5gxBgtVR/quiq-it-logo.jpg" 
              alt={t('home.about.imageAlt')}
              className="object-cover object-center   w-full h-full max-sm:w-full max-sm:h-full  rounded-lg "
            />
          </div>
          <div className="right flex flex-col items-center justify-centre  ">
            {[1, 2, 3].map((num) => (
              <p key={num} className="text-3xl mb-8 max-w-2xl">
                {t(`home.about.paragraph${num}`)}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Services section */}
      <div
        ref={servicesSectionRef}
        className="mt-16 text-center flex flex-col h-full items-center "
      >
        <h1 className="text-4xl bg-gradient-to-r from-orange-400 to-pink-600 h-16 inline-block text-transparent bg-clip-text">
          {t('home.servicesSection.title')}
        </h1>
        <div className="grid grid-cols-3 max-md:grid-cols-1 max-xl:grid-cols-2 gap-12 mt-16">
          {['suv', 'motorcycle', 'exotic'].map((vehicle) => (
            <div key={vehicle} className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                <img
                  src={t(`home.servicesSection.${vehicle}.image`)}
                  alt={t(`home.servicesSection.${vehicle}.alt`)}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {t(`home.servicesSection.${vehicle}.title`)}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {t(`home.servicesSection.${vehicle}.description`)}
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  to="/login"
                  className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full hover:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                >
                  {t('common.explore')}
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
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
      <div className="MobileContent flex flex-col items-center p-3 lg:hidden fixed bottom-0 w-full h-[350px]  lg:w-[500px] lg:h-[400px] sm:hidden rounded-t-[90px] bg-gray-900/80 backdrop-blur-md ">
      {/* <div className="img">
              <img src="https://i.ibb.co/mFSmqjCg/pexels-tima-miroshnichenko-6873123.jpg" alt="Car Wash" className=" fixed top-0 left-0 w-full h-full object-cover  z-0" />

      </div> */}
          

                  <h2 className="text-2xl bg-gradient-to-r from-orange-400 to-pink-600  inline-block text-transparent bg-clip-text ">
          {t('home.welcome.mobileWelcome')}
        </h2>
                  <h2 className="text-2xl bg-gradient-to-r from-orange-400 to-pink-600  inline-block text-transparent bg-clip-text ">
          {t('home.welcome.mobileTitle')}
        </h2>
        <div className="cardhead mt-2 text-center text-amber-50">
           <p className="text-xl  max-w-2xl">
          {t('home.welcome.subtitle')}
        </p>

        </div>
        <div className="cardbtn flex justify-evenly gap-5 p-3 mt-7 ">
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
        </div>
        <div className="socialIcons flex justify-evenly gap-3 p-3 mt-2 items-center text-center">
          <div className="social-button">
        <button className="relative w-12 h-12 rounded-full group">
          <div className="floater w-full h-full absolute top-0 left-0 bg-blue-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
          <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-500 rounded-full">
            <svg fill="none" viewBox="0 0 13 22" height={22} width={13} xmlns="http://www.w3.org/2000/svg">
              <path d="M7.71289 22H4.1898C3.60134 22 3.12262 21.5213 3.12262 20.9328V12.9863H1.06717C0.478672 12.9863 0 12.5074 0 11.9191V8.514C0 7.9255 0.478672 7.44683 1.06717 7.44683H3.12262V5.74166C3.12262 4.05092 3.6535 2.6125 4.65773 1.58207C5.6665 0.546992 7.07627 0 8.7346 0L11.4214 0.00438281C12.0089 0.00537109 12.4868 0.484086 12.4868 1.07151V4.23311C12.4868 4.82157 12.0083 5.30028 11.4199 5.30028L9.61091 5.30093C9.05919 5.30093 8.91868 5.41153 8.88864 5.44543C8.83914 5.50172 8.78023 5.66062 8.78023 6.09954V7.4467H11.284C11.4725 7.4467 11.6551 7.49319 11.812 7.58076C12.1506 7.76995 12.3611 8.12762 12.3611 8.51417L12.3597 11.9193C12.3597 12.5074 11.881 12.9861 11.2926 12.9861H8.78019V20.9328C8.78023 21.5213 8.30139 22 7.71289 22ZM4.41233 20.7103H7.49031V12.4089C7.49031 12.016 7.81009 11.6964 8.20282 11.6964H11.07L11.0712 8.73662H8.20265C7.80991 8.73662 7.49031 8.41706 7.49031 8.02411V6.09959C7.49031 5.59573 7.54153 5.0227 7.92185 4.59198C8.38144 4.07133 9.10568 4.01126 9.61056 4.01126L11.1971 4.01057V1.29375L8.73357 1.28975C6.06848 1.28975 4.41238 2.99574 4.41238 5.7417V8.02407C4.41238 8.4168 4.09277 8.73658 3.7 8.73658H1.28975V11.6964H3.7C4.09277 11.6964 4.41238 12.016 4.41238 12.4089L4.41233 20.7103Z" className="group-hover:fill-[#171543] fill-white duration-300" />
            </svg>
          </div>
        </button>
      </div>
      <div className="social-button">
        <button className="relative w-12 h-12 rounded-full group pointer-cursor">
          <div className="floater w-full h-full absolute top-0 left-0 bg-green-400 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
          <a href=" https://wa.me/+393206649855" className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-green-400    rounded-full">
          <svg viewBox="0 0 15 16"  fill="white" height={24} width={24} xmlns="http://www.w3.org/2000/svg">
        <path className="group-hover:fill-[#171543] fill-white duration-300"  d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
      </svg>
          </a>
        </button>
      </div>
        <div className="social-button">
        <button className="relative w-12 h-12 rounded-full group">
          <div className="floater w-full h-full absolute top-0 left-0 bg-violet-400 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
          <div className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-violet-400 rounded-full">
            <svg fill="none" viewBox="0 0 22 22" height={22} width={22} xmlns="http://www.w3.org/2000/svg">
              <path d="M21.94 6.46809C21.8884 5.2991 21.6994 4.49551 21.4285 3.79911C21.1492 3.05994 20.7194 2.39818 20.1564 1.84802C19.6062 1.28932 18.9401 0.855163 18.2094 0.580194C17.5091 0.309437 16.7096 0.120336 15.5407 0.0688497C14.363 0.0128932 13.9891 0 11.0022 0C8.01527 0 7.64141 0.0128932 6.46808 0.064466C5.29914 0.116039 4.49551 0.305225 3.79932 0.57581C3.05994 0.855163 2.39818 1.28494 1.84802 1.84802C1.28932 2.39813 0.855377 3.06428 0.580193 3.7949C0.309437 4.49551 0.120379 5.2948 0.0688496 6.4637C0.0129362 7.64141 0 8.01527 0 11.0022C0 13.9891 0.0129362 14.363 0.0644659 15.5363C0.116039 16.7053 0.305225 17.5089 0.576025 18.2053C0.855377 18.9444 1.28932 19.6062 1.84802 20.1564C2.39818 20.7151 3.06432 21.1492 3.79494 21.4242C4.49547 21.6949 5.29476 21.884 6.46391 21.9355C7.63702 21.9873 8.0111 22 10.998 22C13.9849 22 14.3588 21.9873 15.5321 21.9355C16.7011 21.884 17.5047 21.695 18.2009 21.4242C18.9321 21.1415 19.5961 20.7091 20.1505 20.1548C20.7048 19.6005 21.1373 18.9365 21.42 18.2053C21.6906 17.5047 21.8798 16.7052 21.9314 15.5363C21.9829 14.363 21.9958 13.9891 21.9958 11.0022C21.9958 8.01527 21.9914 7.64137 21.94 6.46809ZM19.9588 15.4503C19.9114 16.5248 19.731 17.105 19.5805 17.4918C19.2109 18.4502 18.4502 19.2109 17.4918 19.5805C17.105 19.731 16.5206 19.9114 15.4503 19.9586C14.29 20.0103 13.942 20.023 11.0066 20.023C8.07118 20.023 7.71881 20.0103 6.56259 19.9586C5.48816 19.9114 4.90796 19.731 4.52117 19.5805C4.04425 19.4043 3.61014 19.1249 3.25772 18.7596C2.89242 18.4029 2.61306 17.9731 2.43677 17.4961C2.28635 17.1094 2.10589 16.5248 2.05874 15.4547C2.007 14.2943 1.99428 13.9461 1.99428 11.0107C1.99428 8.07535 2.007 7.72298 2.05874 6.56698C2.10589 5.49254 2.28635 4.91235 2.43677 4.52555C2.61306 4.04842 2.89241 3.61439 3.26211 3.26189C3.61865 2.89658 4.04842 2.61723 4.52555 2.44115C4.91235 2.29073 5.49692 2.11023 6.56697 2.06291C7.72736 2.01134 8.07556 1.99844 11.0107 1.99844C13.9505 1.99844 14.2985 2.01134 15.4547 2.06291C16.5292 2.11027 17.1093 2.29069 17.4961 2.44111C17.9731 2.61723 18.4072 2.89658 18.7596 3.26189C19.1249 3.61865 19.4042 4.04842 19.5805 4.52555C19.731 4.91235 19.9114 5.49671 19.9587 6.56698C20.0103 7.72736 20.0232 8.07535 20.0232 11.0107C20.0232 13.9461 20.0104 14.29 19.9588 15.4503Z" className="group-hover:fill-[#171543] fill-white duration-300" />
              <path d="M11.0026 5.35054C7.88252 5.35054 5.35107 7.88182 5.35107 11.0021C5.35107 14.1223 7.88252 16.6536 11.0026 16.6536C14.1227 16.6536 16.6541 14.1223 16.6541 11.0021C16.6541 7.88182 14.1227 5.35054 11.0026 5.35054ZM11.0026 14.668C8.97844 14.668 7.33654 13.0264 7.33654 11.0021C7.33654 8.97774 8.97844 7.33609 11.0025 7.33609C13.0269 7.33609 14.6685 8.97774 14.6685 11.0021C14.6685 13.0264 13.0268 14.668 11.0026 14.668ZM18.1971 5.12706C18.1971 5.85569 17.6063 6.44646 16.8775 6.44646C16.1489 6.44646 15.5581 5.85569 15.5581 5.12706C15.5581 4.39833 16.1489 3.80774 16.8775 3.80774C17.6063 3.80774 18.1971 4.39829 18.1971 5.12706Z" className="group-hover:fill-[#171543] fill-white duration-300" />
            </svg>
          </div>
        </button>
      </div>
        </div>
      </div>
      <div className=" max-sm:hidden">
    <Footer/>
      </div>
    </>
  );
}