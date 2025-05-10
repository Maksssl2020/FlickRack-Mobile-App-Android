import { useQuery } from "@tanstack/react-query";
import { fetchActorDetailsById } from "@/services/actorsApi";

function useTmdbActorByIdQuery(actorId?: string, userId?: number | null) {
  const { data: actorDataById, isLoading: fetchingActorById } = useQuery({
    queryKey: ["actorData", actorId],
    queryFn: async () => {
      if (
        actorId !== undefined &&
        actorId !== null &&
        userId !== undefined &&
        userId !== null
      ) {
        return await fetchActorDetailsById(parseInt(actorId), userId);
      }
    },
    enabled:
      actorId !== undefined &&
      actorId !== null &&
      userId !== undefined &&
      userId !== null,
  });

  return { actorDataById, fetchingActorById };
}

export default useTmdbActorByIdQuery;
