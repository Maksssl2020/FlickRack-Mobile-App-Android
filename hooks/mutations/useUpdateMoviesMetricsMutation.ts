import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateMovieMetricsCount } from "@/services/metricsApi";
import { UpdateMovieMetricsRequest } from "@/types/MetricsTypes";

function useUpdateMoviesMetricsMutation() {
  const queryClient = useQueryClient();

  const {
    mutate: updateMovieMetricsCount,
    isPending: updatingMovieMetricsCount,
  } = useMutation({
    mutationKey: ["updateMovieMetrics"],
    mutationFn: (data: UpdateMovieMetricsRequest) =>
      handleUpdateMovieMetricsCount(data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["moviesMetricsData"]);
    },
  });

  return { updateMovieMetricsCount, updatingMovieMetricsCount };
}

export default useUpdateMoviesMetricsMutation;
