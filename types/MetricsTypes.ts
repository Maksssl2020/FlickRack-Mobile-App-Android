import { MovieTmbd } from "@/types/MovieTypes";
import { ActorDetails } from "@/types/ActorTypes";

export interface UpdateMovieMetricsRequest {
  searchTerm: string;
  movieTmdb: MovieTmbd;
}

export interface UpdateActorMetricsRequest {
  isFavourite: boolean;
  actorTmdb: ActorDetails;
}

export interface MovieMetrics {
  id: number;
  count: number;
  searchTerm: string;
  movieId: number;
  moviePosterUrl: string;
  movieTitle: string;
}

export interface ActorMetrics {
  id: number;
  actorId: number;
  favouritesCount: number;
  name: string;
  posterPath: string;
}
