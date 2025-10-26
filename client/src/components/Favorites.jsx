import { useEffect, useState } from "react";
import axios from "axios";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await axios.get("http://localhost:5000/api/user/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data);
    };
    fetchFavorites();
  }, []);

  return (
    <div className="mt-20 p-6">
      <h1 className="text-3xl font-bold mb-4">Your Favorites ❤️</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.map((img) => (
          <img key={img.id} src={img.imageUrl} alt={img.description} className="rounded-lg" />
        ))}
      </div>
    </div>
  );
}
