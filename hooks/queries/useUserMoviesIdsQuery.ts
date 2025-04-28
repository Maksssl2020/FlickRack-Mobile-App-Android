import { useAuthenticationStore } from "@/store/AuthenticationStore";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUserMoviesIds } from "@/services/userMoviesApi";

function useUserMoviesIdsQuery() {
  const { userId } = useAuthenticationStore.getState().authentication;

  const { data: userMoviesIds, isLoading: fetchingUserMoviesIds } = useQuery({
    queryKey: ["userMoviesIds", userId],
    queryFn: async () => {
      if (userId) {
        return await fetchAllUserMoviesIds(userId);
      }
    },
    enabled: userId !== undefined && userId !== null,
  });

  return { userMoviesIds, fetchingUserMoviesIds };
}

export default useUserMoviesIdsQuery;
