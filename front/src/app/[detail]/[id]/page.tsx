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
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-4xl mx-auto mt-4">
      {movie ? (
        <div>
          <h1 className="text-4xl font-bold mb-4 text-yellow-400">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.overview}</p>

          <div className="mb-4">
            <p className="text-sm">
              <span className="font-semibold">Fecha de estreno:</span> {movie.release_date}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Duración:</span> {movie.runtime} minutos
            </p>
            <p className="text-sm">
              <span className="font-semibold">Géneros:</span> {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <img
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <p className="text-sm">
              <span className="font-semibold">Idiomas:</span>{" "}
              {movie.spoken_languages.map((lang) => lang.name).join(", ")}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Presupuesto:</span> ${movie.budget.toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Ingresos:</span> ${movie.revenue.toLocaleString()}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Países de Producción:</span>{" "}
              {movie.production_countries.map((country) => country.name).join(", ")}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Compañías de Producción:</span>{" "}
              {movie.production_companies.map((company) => company.name).join(", ")}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Tagline:</span> {movie.tagline}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Estado:</span> {movie.status}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Popularidad:</span> {movie.popularity}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Puntuación:</span> {movie.vote_average}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Votos:</span> {movie.vote_count}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-500">Vuelva más tarde</p>
        </div>
      )}
    </div>
  );
};

export default Detail;
