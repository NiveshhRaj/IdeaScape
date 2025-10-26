import "../App.css";
import img from "../assets/img3.png";
// import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Page3 = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center justify-between h-screen ml-2 mr-2 mt-2 rounded-2xl overflow-hidden">
      {/* Left side - Image */}
      <div className="h-full w-full relative">
        <img src={img} alt="Image" className="rounded-2xl w-full" />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-75 p-6 font-inter" data-aos="zoom-in">
          <h1 className="text-7xl font-bold text-orange-600 text-center capitalize">
            Sign Up to get your Ideas
          </h1>
          {/* <button className="border-2 border-black p-3 font-bold text-xl ml-[230px] mt-4 bg-amber-900 text-white cursor-pointer rounded-lg font-roboto"
          onClick={() => navigate("/signup")}
          >
            Sign up
          </button> */}
        </div>
      </div>

      {/* Right side - Text + Button */}
      {/* <div className="w-1/2 flex flex-col justify-center items-center gap-8 px-10">
        <h1 className="text-6xl font-bold text-red-700 text-center font-mono">
          Sign Up to get your ideas
        </h1>
        <Button
          variant="contained"
          onClick={() => navigate("/signup")}
          sx={{
            backgroundColor: "red", // Tailwind's red-500
            color: "#fff",
            padding: "10px 30px",
            fontSize: "1.2rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#dc2626", // red-600
            },
          }}
        >
          Sign Up
        </Button>
      </div> */}
    </section>
  );
};

export default Page3;
