"use client";
import { IMoviesResponsePopular } from "@/interface/Imovies";
import GetPopular from "@/service/GetMovies";
import Image from "next/image";
import { useEffect, useState } from "react";

const MPoular = () => {
  const [popularmovies, setPopularmovies] = useState<IMoviesResponsePopular | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await GetPopular();
        setPopularmovies(movies);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Populares</h1>
      {popularmovies ? (
        <ul>
          {popularmovies.results.map((moviePopular) => (
            <li key={moviePopular.id}>
              <h2>{moviePopular.title}</h2>
              <Image
                src={`https://image.tmdb.org/t/p/w500${moviePopular.poster_path}`}
                alt={moviePopular.title}
                width={500}
                height={750}
              />
              <p>{moviePopular.overview}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default MPoular;

