"use client";
import { IMoviesResponsePopular } from "@/interface/Imovies";
import { IMoviePopular } from "@/interface/Imovies";
import { GetEstreno } from "@/service/GetMovies";
import { useState, useEffect } from "react";

const MEstrenos = () => {
  const [data, setData] = useState<IMoviesResponsePopular | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Próximos Estrenos</h2>
      {data && data.results && data?.results?.length > 0 ? (
        <ul>
          {data.results.map((movie: IMoviePopular) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
              <p>{movie.overview}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay próximos estrenos disponibles.</p>
      )}
    </div>
  );
};

export default MEstrenos;
