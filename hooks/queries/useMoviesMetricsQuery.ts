import { useQuery } from "@tanstack/react-query";
import { fetchMoviesMetrics } from "@/services/metricsApi";

function useMoviesMetricsQuery() {
  const { data: moviesMetrics, isLoading: fetchingMoviesMetrics } = useQuery({
    queryKey: ["moviesMetricsData"],
    queryFn: () => fetchMoviesMetrics(),
  });

  return { moviesMetrics, fetchingMoviesMetrics };
}

export default useMoviesMetricsQuery;
