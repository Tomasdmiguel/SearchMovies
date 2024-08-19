"use client";
import { IMoviesResponsePopular} from "@/interface/Imovies";
import { GetEstreno } from "@/service/GetMovies";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const MEstrenos = () => {
  const [data, setData] = useState<IMoviesResponsePopular | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const itemsToShow = 4;

  useEffect(() => {
    const fetchEstreno = async () => {
      try {
        const response = await GetEstreno();
        setData(response);
      } catch (error: any) {
        setError("Error fetching data");
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEstreno();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % (data?.results.length ?? 1)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (data?.results.length ?? 1)) %
        (data?.results.length ?? 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (data?.results.length ?? 1)
    );
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="relative p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Estrenos
      </h1>
      {data && data.results ? (
        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-4 rounded-full z-10 hover:bg-red-500 transition duration-300">
            <AiOutlineLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-4 rounded-full z-10 hover:bg-red-500 transition duration-300">
            <AiOutlineRight size={24} />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsToShow)
                }%)`,
              }}>
              {data.results.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/detail/${movie.id}`}
                  className="flex-shrink-0 w-full sm:w-1/4 p-2 relative">
                  <div className="bg-red-800 shadow-lg rounded-xl overflow-hidden flex flex-col h-full">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        className="w-full h-64 object-cover transform transition duration-500 hover:scale-105"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <div className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-lg">
                        {movie.vote_average.toFixed(1)}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 bg-gradient-to-t from-red-800 via-red-700 to-transparent">
                      <h2 className="text-lg font-semibold text-white mb-2 line-clamp-2 leading-tight">
                        {movie.title}
                      </h2>
                      <p className="text-sm text-gray-200 flex-1 line-clamp-4">
                        {movie.overview}
                      </p>
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-yellow-300 bg-red-700 rounded-full py-1 px-3 inline-block shadow-md">
                          {movie.release_date}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No hay próximos estrenos disponibles.
        </p>
      )}
    </div>
  );
};

export default MEstrenos;
