const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const URL_POPULAR = process.env.NEXT_PUBLIC_URL_API_POPULAR;
import { IMoviesResponsePopular, IMovieDetails } from "@/interface/Imovies";

const GetPopular = async (): Promise<IMoviesResponsePopular> => {
  try {
    const response = await fetch(
      `${URL_POPULAR}/movie/popular?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data: IMoviesResponsePopular = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const GetDetail = async (id: number) => {
  try {
    const response = await fetch(
      `${URL_POPULAR}/movie/${id}?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data: IMovieDetails = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const SearchMovie = async (query: string) => {
  try {
    const response = await fetch(
      `${URL_POPULAR}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );

    if (!response.ok) {
      throw new Error("No se encontraron resultados");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const GetEstreno = async () => {
  try {
    const response = await fetch(
      `${URL_POPULAR}/movie/upcoming?api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error("Error a obtener los proximos estrenos ");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error:", error.message);
    throw new Error(error.message);
  }
};


export const GeTrailer = async () => {
try {
  const response = await fetch(
    `${URL_POPULAR}/movie/upcoming?api_key=${API_KEY}&language=es-ES`
  );
  if (!response.ok) {
    throw new Error("Error a obtener los trhilers ");

  } else {
    const data = await response.json();
    return data.results;
  }
} catch (error:any) {
  throw new Error(error.message)
}

 }


export default GetPopular;
