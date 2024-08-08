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

export default GetPopular;
