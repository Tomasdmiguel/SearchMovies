"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface MovieResult {
  id: number;
  title: string;
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
      <h1 className="text-3xl font-bold mb-6">Resultados de búsqueda</h1>
      {results.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((movie) => (
            <li key={movie.id} className=" shadow rounded-lg p-4">
              <h2 className="text-xl  mb-2">{movie.title}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg">No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default Search;
