import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "../components/ImageCard";
import Background from "../components/Background";

export default function Results() {
  const { query } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/search/${query}`);
        setImages(res.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchImages();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold text-gray-700">
        Loading images...
      </div>
    );
  }

  return (
    <>
      <Background />
      <div className="p-4">
        {/* Column-wise masonry layout */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="break-inside-avoid mb-4">
              <ImageCard key={idx} img={img} index = {idx} imagesArray = {images} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
