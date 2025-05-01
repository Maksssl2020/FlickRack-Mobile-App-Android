import axiosConfig from "@/services/axiosConfig";
import { Metrics, UpdateMetricsRequest } from "@/types/MetricsTypes";

export async function fetchMetrics(): Promise<Metrics[]> {
  const response = await axiosConfig.get<Metrics[]>(
    `/metrics/movies/top-metrics`,
  );
  return response.data;
}

export async function handleUpdateMetricsCount(
  data: UpdateMetricsRequest,
): Promise<void> {
  const response = await axiosConfig.post("/metrics/movies/update-metrics", {
    searchTerm: data.searchTerm,
    movieTmdb: data.movieTmdb,
  });
  return response.data;
}
