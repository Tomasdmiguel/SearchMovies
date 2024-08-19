"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { SearchMovie } from "@/service/GetMovies";
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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const search = await SearchMovie(searchQuery);
      if (search.results && search.results.length > 0) {
        const encodedResults = encodeURIComponent(
          JSON.stringify(search.results)
        );
        router.push(`/search?results=${encodedResults}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se encontraron resultados con esa búsqueda!",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema con la búsqueda. Inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

    return (
    <div className="relative h-96 w-full max-w-6xl mx-auto my-8 rounded-lg overflow-hidden shadow-lg">
      <div className="absolute inset-0">
        <Image
          src={imagenes[currentImageIndex]}
          alt={`Carousel image ${currentImageIndex + 1}`}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/75"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-6xl text-white mb-8 font-extrabold drop-shadow-lg">
          Bienvenido
        </h1>
        <div className="flex items-center bg-white rounded-full overflow-hidden shadow-2xl w-3/4 max-w-xl">
          <input
            type="text"
            placeholder="Busca tu peli"
            className="py-3 px-6 w-full text-black focus:outline-none text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white py-3 px-8 hover:bg-green-600 transition-colors text-lg font-semibold"
            disabled={isLoading}>
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
