import { useAuthenticationStore } from "@/store/AuthenticationStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUserFavouritesActors } from "@/services/favouritesApi";

function useUserFavouriteActorsQuery() {
  const { userId } = useAuthenticationStore.getState().authentication;

  const { data: userFavouriteActors, isLoading: fetchingUserFavouriteActors } =
    useQuery({
      queryKey: ["userFavouriteActors", userId],
      queryFn: async () => {
        if (userId !== undefined && userId !== null) {
          return await fetchUserFavouritesActors(userId);
        }
      },
      enabled: userId !== undefined && userId !== null,
    });

  return { userFavouriteActors, fetchingUserFavouriteActors };
}

export default useUserFavouriteActorsQuery;