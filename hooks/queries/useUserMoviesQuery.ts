import { useQuery } from "@tanstack/react-query";
import { fetchAllUserMovies } from "@/services/userMoviesApi";
import { useAuthenticationStore } from "@/store/AuthenticationStore";

function useUserMoviesQuery() {
  const { userId } = useAuthenticationStore.getState().authentication;

  const { data: userMovies, isLoading: fetchingUserMovies } = useQuery({
    queryKey: ["userMoviesData", userId],
    queryFn: async () => {
      if (userId !== undefined && userId !== null) {
        return await fetchAllUserMovies(userId);
      }
    },
    enabled: userId !== undefined && userId !== null,
  });

  return { userMovies, fetchingUserMovies };
}

export default useUserMoviesQuery;
