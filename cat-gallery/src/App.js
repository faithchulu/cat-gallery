import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [catImage, setCatImage] = useState("");
  const [menuSelection, setMenuSelection] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [catImages, setCatImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchCatImage();
    fetchCatImages();
  }, [menuSelection, currentPage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === catImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [catImages]);

  const fetchCatImage = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      setCatImage(response.data[0].url);
    } catch (error) {
      console.error("Error fetching cat image:", error);
    }
  };

  useEffect(() => {
    fetchCatImages();
  }, []);

  const fetchCatImages = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?api_key=live_i3F7rN4Nrkzf3rfShLlELgSSWCFJPSfgQA18ryjI0vkQRlXM8Z1wGjTadL1IZMQc&limit=30"
      );
      setCatImages(response.data);
    } catch (error) {
      console.error("Error fetching cat images:", error);
    }
  };

  const handleMenuChange = (selection) => {
    setMenuSelection(selection);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-900 text-white">
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${catImages[currentIndex]?.url})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome CAT LOVER!</h1>

          <p className="leading ">
            Home to all cats!
            <br />
            Arabian Mau's, Australian Mists, Balinese, Chantilly-Tiffany, name
            it! We have em' all
          </p>
        </div>
      </div>
      <div className="flex justify-center my-4  p-4">
        <div className="flex bg-blue-900 w-full rounded-md justify-center mt-8">
          <button
            onClick={() => handleMenuChange("All")}
            className={`mx-2 p-4 ${
              menuSelection === "All" ? "bg-pink-600" : "hover:bg-pink-600"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
          >
            All
          </button>
          <button
            onClick={() => handleMenuChange("lihu")}
            className={`mx-2 p-4 ${
              menuSelection === "lihu" ? "bg-yellow-600" : "hover:bg-yellow-500"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
          >
            Dragon Li
          </button>
          <button
            onClick={() => handleMenuChange("beng")}
            className={`mx-2 p-4 ${
              menuSelection === "beng" ? "bg-yellow-500" : "hover:bg-yellow-500"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
          >
            Bengal
          </button>
          <button
            onClick={() => handleMenuChange("bali")}
            className={`mx-2 p-4 ${
              menuSelection === "bali" ? "bg-yellow-500" : "hover:bg-yellow-500"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
          >
            Balinese
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center  p-4">
        {catImages.map((cat, index) => (
          <div key={index} className="aspect-w-1 aspect-h-1">
            <img
              src={cat.url}
              alt="Cat"
              className="object-cover w-full h-full rounded-md shadow-xl"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center my-4">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-2 ${
              page === currentPage ? "text-blue-500" : "text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
