export interface MovieTraktTv {
  title: string;
  year: number;
  ids: MovieIds;
  images: MovieImages;
}

interface MovieIds {
  trakt: number;
  slug: string;
  imdb: string;
  tmdb: number;
}

interface MovieImages {
  poster: string[];
  logo: string[];
  banner: string[];
}

export interface MovieTmbd {
  id: number;
  adult: boolean;
  overview: string;
  popularity: number;
  title: string;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieTmdbDetails {
  id: number;
  adult: boolean;
  overview: string;
  popularity: number;
  title: string;
  backdrop_path: string;
  genres: MovieGenre[];
  runtime: number;
  original_language: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  budget: number;
  revenue: number;
  production_companies: MovieProductionCompany[];
  production_countries: MovieProductionCountry[];
}

interface MovieGenre {
  id: number;
  name: string;
}

interface MovieProductionCompany {
  id: number;
  name: string;
  origin_country: string;
}

interface MovieProductionCountry {
  iso: string;
  name: string;
}

export interface TmdbMovieCardProps {
  movieData: MovieTmbd;
}
