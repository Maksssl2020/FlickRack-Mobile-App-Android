import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FavouriteRequest } from "@/types/FavouritesTypes";
import { handleRemoveFavouriteMovie } from "@/services/favouritesApi";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";

function useDeleteFavouriteMovieMutation() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteMovieFromFavourites,
    isPending: deletingMovieFromFavourites,
  } = useMutation({
    mutationKey: ["deleteFavouriteMovie"],
    mutationFn: (data: FavouriteRequest) =>
      handleRemoveFavouriteMovie(data.userId, data.entityId),
    onSuccess: (_, data) => {
      Toast.show({
        type: "success",
        text1: "Successfully removed movie from favourites.",
      });

      queryClient.invalidateQueries({
        queryKey: ["movieData", data.entityId],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data.message;
      if (errorMessage) {
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      }
    },
  });

  return { deleteMovieFromFavourites, deletingMovieFromFavourites };
}

export default useDeleteFavouriteMovieMutation;
