"use client";

import { IMovieDetails } from "@/interface/Imovies";
import { GetDetail } from "@/service/GetMovies";
import { useEffect, useState } from "react";

interface DetailProps {
  params: {
    id: string;
  };
}

const Detail = ({ params }: DetailProps) => {
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const idMovie = parseInt(params.id, 10);
  console.log(movie);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const movieDetails = await GetDetail(idMovie);
        setMovie(movieDetails);
      } catch (error) {
        console.error("Error al obtener los detalles de la película:", error);
      }
    };

    fetchDetail();
  }, [idMovie]);

  return (
    <div>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>

          <p>Fecha de estreno: {movie.release_date}</p>
          <p>Duración: {movie.runtime} minutos</p>
          <p>Géneros: {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>
            Idiomas:{" "}
            {movie.spoken_languages.map((lang) => lang.name).join(", ")}
          </p>

          {/* Presupuesto */}
          <p>Presupuesto: ${movie.budget.toLocaleString()}</p>

          {/* Ingresos */}
          <p>Ingresos: ${movie.revenue.toLocaleString()}</p>

          {/* Países de Producción */}
          <p>
            Países de Producción:{" "}
            {movie.production_countries
              .map((country) => country.name)
              .join(", ")}
          </p>

          {/* Compañías de Producción */}
          <p>
            Compañías de Producción:{" "}
            {movie.production_companies
              .map((company) => company.name)
              .join(", ")}
          </p>

          {/* Tagline */}
          <p>Tagline: {movie.tagline}</p>

          {/* Estado */}
          <p>Estado: {movie.status}</p>

          {/* Popularidad */}
          <p>Popularidad: {movie.popularity}</p>

          {/* Puntuación Media */}
          <p>Puntuación: {movie.vote_average}</p>

          {/* Conteo de Votos */}
          <p>Votos: {movie.vote_count}</p>
        </div>
      ) : (
        <div>
          <p>Vuelva más tarde</p>
        </div>
      )}
    </div>
  );
};

export default Detail;
