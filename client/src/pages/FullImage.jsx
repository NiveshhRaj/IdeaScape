import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export default function FullImage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { imagesArray, currentIndex } = location.state || {};
  const [index, setIndex] = useState(currentIndex || 0);

  if (!imagesArray || imagesArray.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p>No images to display</p>
      </div>
    );
  }

  const handleNext = () => setIndex((prev) => (prev + 1) % imagesArray.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + imagesArray.length) % imagesArray.length);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") handleNext();
    else if (e.key === "ArrowLeft") handlePrev();
    else if (e.key === "Escape") navigate(-1);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const img = imagesArray[index];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4"
      onClick={() => navigate(-1)}
    >
      {/* Close Button */}
      <button
        className="cursor-pointer absolute top-6 right-6 text-white hover:text-gray-300 transition"
        onClick={(e) => {
          e.stopPropagation();
          navigate(-1);
        }}
      >
        <X size={32} />
      </button>

      {/* Left Arrow */}
      <button
        className="cursor-pointer absolute left-6 text-white hover:text-gray-300 transition"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
      >
        <ArrowLeft size={40} />
      </button>

      {/* Right Arrow */}
      <button
        className="cursor-pointer absolute right-6 text-white hover:text-gray-300 transition"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
      >
        <ArrowRight size={40} />
      </button>

      {/* Image with Animation */}
      <AnimatePresence mode="wait">
        <motion.img
          key={img.id}
          src={img.urls.regular}
          alt={img.alt_description || "Moodboard Image"}
          className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>
    </div>
  );
}
