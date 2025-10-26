import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

export default function ImageCard({ img, index, imagesArray }) {
  const cardRef = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = cardRef.current;

    if (!loaded) return; // wait for image to load

    // Entrance animation: fade + slide + subtle glow
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 0.95, filter: "brightness(0.9) contrast(0.9) drop-shadow(0px 0px 0px rgba(255,255,255,0))" },
      {
        opacity: 1,
        scale: 1,
        filter: "brightness(1.1) contrast(1.1) drop-shadow(0px 5px 15px rgba(0,0,0,0.2))",
        duration: 1,
        delay: index * 0.1,
        ease: "power3.out",
      }
    );

    // Hover & tilt animation
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;

      const rotateY = ((x - midX) / midX) * 5;
      const rotateX = -((y - midY) / midY) * 5;

      gsap.to(el, { rotationY: rotateY, rotationX: rotateX, scale: 1.07, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(el, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.4 });
      gsap.to(imgRef.current, {
        scale: 1,
        rotate: 0,
        filter: "brightness(1) contrast(1) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
        duration: 0.4,
      });
    };

    const onMouseEnter = () => {
      gsap.to(imgRef.current, {
        scale: 1.05,
        rotate: 1,
        filter: "brightness(1.15) contrast(1.15) drop-shadow(0px 8px 20px rgba(0,0,0,0.25))",
        duration: 0.3,
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseenter", onMouseEnter);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [index, loaded]);

  const handleClick = () => {
    navigate("/full-image", { state: { imagesArray, currentIndex: index } });
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full mb-4 rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500 perspective-1000"
      onClick={handleClick}
    >
      {/* Gradient behind */}
      <div className="absolute inset-0 rounded-lg bg-linear-to-t from-black/20 to-transparent z-0 pointer-events-none" />

      {/* Image above gradient */}
      <img
        ref={imgRef}
        src={img.urls.small}
        alt="Mood"
        className={`relative z-10 w-full h-auto object-cover rounded-lg transition-transform duration-500 ${
          loaded ? "" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        style={{ filter: "brightness(1) contrast(1)" }}
      />
    </div>
  );
}
