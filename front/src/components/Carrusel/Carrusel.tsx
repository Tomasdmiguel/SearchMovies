"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const imagenes = [
  "/Carrusel/image1.jpeg",
  "/Carrusel/image2.jpeg",
  "/Carrusel/image3.jpeg",
  "/Carrusel/image4.jpeg",
  "/Carrusel/image5.jpeg",
];

const Carousel: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative h-96 w-full max-w-6xl mx-auto my-8">
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <Image
          src={imagenes[currentImageIndex]}
          alt={`Carousel image ${currentImageIndex + 1}`}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-6xl text-white mb-8 font-bold">Bienvenido</h1>
        <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg w-3/4 max-w-xl">
          <input
            type="text"
            placeholder="Busca tu peli"
            className="py-3 px-6 w-full text-black focus:outline-none text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white py-3 px-8 hover:bg-green-600 transition-colors text-lg font-semibold">
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;