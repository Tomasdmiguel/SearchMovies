"use client";
import { useEffect, useState } from "react";
import { GeTrailer } from "@/service/GetMovies";
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const MThrilers = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await GeTrailer();
        setMovies(response.results);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) return <div>Cargando próximos estrenos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="movies-container">
      <h2>Thrilers</h2>
      <div className="movies-grid">
        {movies?.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>Fecha de estreno: {movie.release_date}</p>
            <button
              onClick={() => alert(`Reproducir tráiler de ${movie.title}`)}>
              Ver Tráiler
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MThrilers;
