"use client";
import { IMoviesResponsePopular } from "@/interface/Imovies";
import GetPopular from "@/service/GetMovies";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const MPoular = () => {
  const [popularmovies, setPopularmovies] =
    useState<IMoviesResponsePopular | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % (popularmovies?.results.length ?? 1)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [popularmovies]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (popularmovies?.results.length ?? 1)) %
        (popularmovies?.results.length ?? 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (popularmovies?.results.length ?? 1)
    );
  };

  return (
    <div className="relative p-4">
      {popularmovies ? (
        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-3 rounded-full z-10">
            <AiOutlineLeft />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-3 rounded-full z-10">
            <AiOutlineRight />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsToShow)
                }%)`,
              }}>
              {popularmovies.results.map((moviePopular) => (
                <Link
                  key={moviePopular.id}
                  href={`/detail/${moviePopular.id}`}
                  className="flex-shrink-0 w-full sm:w-1/4 p-2 relative">
                  <div className="bg-red-800 shadow-md rounded-lg overflow-hidden flex flex-col h-full">
                    <div className="relative">
                      <img
                        className="w-full h-64 object-cover"
                        src={`https://image.tmdb.org/t/p/w500${moviePopular.poster_path}`}
                        alt={moviePopular.title}
                      />
                      <div className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-3 py-1 text-xs font-bold">
                        {moviePopular.vote_average.toFixed(1)}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 bg-gradient-to-t from-red-800 via-red-700 to-transparent">
                      <h2 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {moviePopular.title}
                      </h2>
                      <p className="text-sm text-white flex-1 line-clamp-4">
                        {moviePopular.overview}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando...</p>
      )}
    </div>
  );
};

export default MPoular;
