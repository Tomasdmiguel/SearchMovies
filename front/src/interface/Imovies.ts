export interface IMoviePopular {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
 
  export interface IMoviesResponsePopular {
    page: number;
    results: IMoviePopular[];
    total_pages: number;
    total_results: number;
  }

  export interface IMovieDetails {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: {
      id: number;
      name: string;
      poster_path: string | null;
      backdrop_path: string | null;
    } | null;
    budget: number;
    genres: Array<{
      id: number;
      name: string;
    }>;
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: Array<{
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    }>;
    production_countries: Array<{
      iso_3166_1: string;
      name: string;
    }>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<{
      english_name: string;
      iso_639_1: string;
      name: string;
    }>;
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }