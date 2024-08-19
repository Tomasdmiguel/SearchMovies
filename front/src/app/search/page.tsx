"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface MovieResult {
  id: number;
  title: string;
  poster_path: string;
}

const Search = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<MovieResult[]>([]);

  useEffect(() => {
    const resultsParam = searchParams.get("results");
    if (resultsParam) {
      try {
        const decodedResults = JSON.parse(
          decodeURIComponent(resultsParam)
        ) as MovieResult[];
        setResults(decodedResults);
      } catch (error) {
        console.error("Error al buscar la busquedad:", error);
      }
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-red-600 mb-12 text-center drop-shadow-lg">
        Resultados de búsqueda
      </h1>
      {results.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((movie) => (
            <Link key={movie.id} href={`/detail/${movie.id}`}>
              <div
                key={movie.id}
                className="relative bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl hover:border-red-500">
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-transparent text-white">
                    <h2 className="text-xl font-bold">{movie.title}</h2>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-500 text-center italic">
          No se encontraron resultados.
        </p>
      )}
    </div>
  );
};

export default Search;
