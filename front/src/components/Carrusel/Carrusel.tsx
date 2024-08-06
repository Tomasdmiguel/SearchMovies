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
    <div className="relative h-60 w-full">
      <div className="absolute inset-0">
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
        <h1 className="text-5xl text-white mb-8">Bienvenido</h1>
        <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Busca tu peli"
            className="py-2 px-4 w-full text-black focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white py-2 px-6 hover:bg-green-600 transition-colors">
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
