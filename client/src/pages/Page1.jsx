import img from "../assets/img.png";
import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  "Nature",
  "Interior",
  "Fashion",
  "Travel",
  "Art",
  "Food",
  "Technology",
  "Sports",
  "Aesthetic",
  "Architecture",
];

const Page1 = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const imgRef = useRef(null);
  const boxRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    // Left Image Animation
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

    // Right Text Animation
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

    // Image Parallax
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

    // Topic Box hover
    boxRefs.current.forEach((box) => {
      box.addEventListener("mouseenter", () => {
        gsap.to(box, {
          scale: 1.05,
          boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
          duration: 0.3,
        });
      });
      box.addEventListener("mouseleave", () => {
        gsap.to(box, {
          scale: 1,
          boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
          duration: 0.3,
        });
      });
    });
  }, []);

  const handleClick = (topic) => {
    navigate(`/results/${topic}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start rounded-2xl overflow-hidden bg-gradient-to-r from-amber-200 to-amber-400 p-4 sm:p-10">
      {/* Topics */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {topics.map((topic, i) => (
          <div
            key={i}
            ref={(el) => (boxRefs.current[i] = el)}
            onClick={() => handleClick(topic)}
            className="px-4 py-2 rounded-full bg-white text-black font-semibold text-sm cursor-pointer shadow-md transition-all duration-100 hover:bg-teal-600 hover:text-white font-inter"
          >
            {topic}
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="flex flex-col-reverse md:flex-row w-full h-full items-center justify-center">
        {/* Left - Image */}
        <div
          ref={leftRef}
          className="w-full md:w-1/2 flex items-center justify-center mt-6 md:mt-0"
        >
          <img
            ref={imgRef}
            src={img}
            alt="Moodboard AI"
            className="max-w-[90%] sm:max-w-[70%] md:max-w-full max-h-[400px] object-contain z-10"
          />
        </div>

        {/* Right - Text */}
        <div
          ref={rightRef}
          className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left p-4 md:p-10 text-slate-900"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to IdeaScape
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl drop-shadow-md leading-relaxed">
            Create and explore stunning AI-generated moodboards to spark your
            creativity. Organize your ideas and bring your vision to life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page1;
