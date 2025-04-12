import { Movie } from "@/types/MovieTypes";
import axiosConfig from "@/services/axiosConfig";

export async function fetchPopularMovies(): Promise<Movie[]> {
  const response = await axiosConfig.get<Movie[]>("/movies/popular-movies");
  return response.data;
}
