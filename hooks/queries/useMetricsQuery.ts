import { useQuery } from "@tanstack/react-query";
import { fetchMetrics } from "@/services/metricsApi";

function useMetricsQuery() {
  const { data: metrics, isLoading: fetchingMetrics } = useQuery({
    queryKey: ["metricsData"],
    queryFn: () => fetchMetrics(),
  });

  return { metrics, fetchingMetrics };
}

export default useMetricsQuery;
