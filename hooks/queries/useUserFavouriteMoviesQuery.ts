import { useAuthenticationStore } from "@/store/AuthenticationStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUserFavouritesMovies } from "@/services/favouritesApi";

function useUserFavouriteMoviesQuery() {
  const { userId } = useAuthenticationStore.getState().authentication;

  const { data: userFavouriteMovies, isLoading: fetchingUserFavouriteMovies } =
    useQuery({
      queryKey: ["userFavouriteMovies", userId],
      queryFn: async () => {
        if (userId !== undefined && userId !== null) {
          return await fetchUserFavouritesMovies(userId);
        }
      },
      enabled: userId !== undefined && userId !== null,
    });

  return { userFavouriteMovies, fetchingUserFavouriteMovies };
}

export default useUserFavouriteMoviesQuery;
