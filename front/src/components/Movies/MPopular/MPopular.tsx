"use client";
import { IMoviesResponsePopular } from "@/interface/Imovies";
import GetPopular from "@/service/GetMovies";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

const MPoular = () => {
  const [popularmovies, setPopularmovies] =
    useState<IMoviesResponsePopular | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await GetPopular();
        setPopularmovies(movies);
      } catch (error) {
        console.error("Falla en el fetch popular peliculas:", error);
      }
    };

    fetchMovies();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? popularmovies!.results.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === popularmovies!.results.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Películas Populares</h1>
      {popularmovies ? (
        <div className="relative">
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
            <FaChevronLeft />
          </button>
          <div className="flex overflow-x-auto space-x-4 py-2">
            {popularmovies.results.map((moviePopular, index) => (
              <Link href={`/detail/${moviePopular.id}`}>
              <div
                key={moviePopular.id}
                className={`flex-none w-64 bg-white shadow-md rounded-lg overflow-hidden ${
                  index === currentIndex ? "scale-105" : ""
                }`}>
    
                <img
                  className="w-full h-40 object-cover"
                  src={`https://image.tmdb.org/t/p/w500${moviePopular.poster_path}`}
                  alt={moviePopular.title}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {moviePopular.title}
                  </h2>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {moviePopular.overview}
                  </p>
                </div>
              </div>
              </Link>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
            <FaChevronRight />
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando...</p>
      )}
    </div>
  );
};

export default MPoular;
