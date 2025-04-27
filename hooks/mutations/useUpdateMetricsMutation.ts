import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUpdateMetricsCount } from "@/services/metricsApi";
import { UpdateMetricsRequest } from "@/types/MetricsTypes";

function useUpdateMetricsMutation() {
  const queryClient = useQueryClient();

  const { mutate: updateMetricsCount, isPending: updatingMetricsCount } =
    useMutation({
      mutationKey: ["updateMetrics"],
      mutationFn: (data: UpdateMetricsRequest) =>
        handleUpdateMetricsCount(data),
      onSuccess: () => {
        // @ts-ignore
        queryClient.invalidateQueries(["metricsData"]);
      },
    });

  return { updateMetricsCount, updatingMetricsCount };
}

export default useUpdateMetricsMutation;
