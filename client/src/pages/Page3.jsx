import "../App.css";
import img from "../assets/img3.png";
import { useNavigate } from "react-router-dom";

const Page3 = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-center h-screen rounded-2xl overflow-hidden p-2 md:p-10">
      {/* Background Image */}
      <div className="relative w-full h-full">
        <img
          src={img}
          alt="Image"
          className="rounded-2xl w-full h-full object-cover"
        />

        {/* Overlay Text */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/70 p-4 md:p-6 rounded-lg text-center"
          data-aos="zoom-in"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-orange-600 capitalize mb-4">
            Sign Up to get your Ideas
          </h1>
          {/* <button
            className="px-6 py-3 text-lg sm:text-xl font-bold rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Page3;
