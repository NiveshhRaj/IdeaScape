import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Background() {
  const bgRef = useRef();

  useEffect(() => {
    const el = bgRef.current;

    // Animate gradient background continuously
    gsap.to(el, {
      background: "linear-gradient(135deg, #ff6ec4, #7873f5, #42e695)",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return <div ref={bgRef} className="fixed inset-0 -z-10 transition-all duration-1000" />;
}
