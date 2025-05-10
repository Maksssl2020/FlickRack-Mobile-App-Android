import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateActorMetricsRequest } from "@/types/MetricsTypes";
import { handleUpdateActorMetricsCount } from "@/services/metricsApi";

function useUpdateActorMetricsCount() {
  const queryClient = useQueryClient();

  const {
    mutate: updateActorMetricsCount,
    isPending: updatingActorMetricsCount,
  } = useMutation({
    mutationKey: ["updateMetrics"],
    mutationFn: (data: UpdateActorMetricsRequest) =>
      handleUpdateActorMetricsCount(data),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["actorsMetricsData"]);
    },
  });

  return { updateActorMetricsCount, updatingActorMetricsCount };
}

export default useUpdateActorMetricsCount;
