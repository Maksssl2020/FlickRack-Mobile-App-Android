import { useQuery } from "@tanstack/react-query";
import { fetchActorsMetrics } from "@/services/metricsApi";

function useActorsMetricsQuery() {
  const { data: actorsMetrics, isLoading: fetchingActorsMetrics } = useQuery({
    queryKey: ["actorsMetricsData"],
    queryFn: () => fetchActorsMetrics(),
  });

  return { actorsMetrics, fetchingActorsMetrics };
}

export default useActorsMetricsQuery;
