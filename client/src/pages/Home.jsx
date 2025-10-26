import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const sections = document.querySelectorAll(".snap-section");

    // Animate left and right inside each section
    sections.forEach((section) => {
      const left = section.querySelector(".left");
      const right = section.querySelector(".right");

      if (left) {
        gsap.fromTo(
          left,
          { x: -400, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: left,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      if (right) {
        gsap.fromTo(
          right,
          { x: 400, opacity: 0, scale: 0.8 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: right,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });

    // Snap scrolling for content sections
    ScrollTrigger.create({
      trigger: ".sections-container",
      start: "top top",
      end: "bottom bottom",
      snap: 1 / (sections.length - 1),
      ease: "power1.inOut",
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="sections-container w-full overflow-x-hidden">
      {/* Navbar */}
      <section className="w-full">
        <Navbar />
      </section>

      {/* Snap Sections */}
      <section className="snap-section min-h-screen overflow-hidden flex flex-col md:flex-row items-center justify-center px-4 md:px-10">
        <Page1 />
      </section>
      <section className="snap-section min-h-screen overflow-hidden flex flex-col md:flex-row items-center justify-center px-4 md:px-10">
        <Page2 />
      </section>
      <section className="snap-section min-h-screen overflow-hidden flex flex-col md:flex-row items-center justify-center px-4 md:px-10">
        <Page3 />
      </section>
    </div>
  );
}
