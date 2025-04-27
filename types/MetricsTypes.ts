import { MovieTmbd } from "@/types/MovieTypes";

export interface UpdateMetricsRequest {
  searchTerm: string;
  movieTmdb: MovieTmbd;
}

export interface Metrics {
  id: number;
  count: number;
  searchTerm: string;
  movieId: number;
  moviePosterUrl: string;
  movieTitle: string;
}
