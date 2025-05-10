import axiosConfig from "@/services/axiosConfig";
import {
  ActorMetrics,
  MovieMetrics,
  UpdateActorMetricsRequest,
  UpdateMovieMetricsRequest,
} from "@/types/MetricsTypes";

export async function fetchMoviesMetrics(): Promise<MovieMetrics[]> {
  const response = await axiosConfig.get<MovieMetrics[]>(
    `/metrics/movies/top-metrics`,
  );
  return response.data;
}

export async function handleUpdateMovieMetricsCount(
  data: UpdateMovieMetricsRequest,
): Promise<void> {
  const response = await axiosConfig.post("/metrics/movies/update-metrics", {
    searchTerm: data.searchTerm,
    movieTmdb: data.movieTmdb,
  });
  return response.data;
}

export async function fetchActorsMetrics() {
  const response = await axiosConfig.get<ActorMetrics[]>(
    `/metrics/actors/top-metrics`,
  );
  return response.data;
}

export async function handleUpdateActorMetricsCount(
  data: UpdateActorMetricsRequest,
) {
  const response = await axiosConfig.post<void>(
    "/metrics/actors/update-metrics",
    {
      isFavourite: data.isFavourite,
      actorTmdb: data.actorTmdb,
    },
  );
  return response.data;
}
