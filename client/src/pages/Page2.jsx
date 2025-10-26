import img from "../assets/img2.png";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page2 = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    gsap.fromTo(
      leftRef.current,
      { x: -400, opacity: 0, scale: 0.8 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    gsap.fromTo(
      rightRef.current,
      { x: 400, opacity: 0, scale: 0.8 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Image parallax
    gsap.to(imgRef.current, {
      scale: 1.05,
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row rounded-2xl overflow-hidden bg-gradient-to-r from-pink-200 to-pink-400 p-4 md:p-10 justify-center items-center">
      {/* Left - Text */}
      <div
        ref={leftRef}
        className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left p-4 md:p-10"
        data-aos="fade-right"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-pink-600">
          Save Ideas you like
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-pink-600">
          Collect your favourites so you can get back to them later.
        </p>
      </div>

      {/* Right - Image */}
      <div
        ref={rightRef}
        className="w-full md:w-1/2 flex items-center justify-center overflow-hidden mb-6 md:mb-0"
        data-aos="fade-left"
      >
        <img
          ref={imgRef}
          src={img}
          alt="Moodboard AI"
          className="max-w-[90%] sm:max-w-[70%] md:max-w-full max-h-[400px] object-contain z-10"
        />
      </div>
    </div>
  );
};

export default Page2;
