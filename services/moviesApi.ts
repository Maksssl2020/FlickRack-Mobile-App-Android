import { MovieTmbd, MovieTmdbDetails, MovieTraktTv } from "@/types/MovieTypes";
import axiosConfig from "@/services/axiosConfig";

export async function fetchPopularMoviesTraktTv(): Promise<MovieTraktTv[]> {
  const response = await axiosConfig.get<MovieTraktTv[]>(
    "/movies/trakt-tv/popular-movies",
  );
  return response.data;
}

export async function fetchMoviesTmdb(query?: string): Promise<MovieTmbd[]> {
  let url;

  if (query && query !== "") {
    const encodedQuery = encodeURIComponent(query);
    url = `/movies/tmdb?query=${encodedQuery}`;
  } else {
    url = "/movies/tmdb";
  }

  const response = await axiosConfig.get<MovieTmbd[]>(url);
  return response.data;
}

export async function fetchMovieByIdTmdb(
  movieId: number,
): Promise<MovieTmdbDetails> {
  const response = await axiosConfig.get<MovieTmdbDetails>(
    `/movies/tmdb/movie-data/${movieId}`,
  );
  return response.data;
}
