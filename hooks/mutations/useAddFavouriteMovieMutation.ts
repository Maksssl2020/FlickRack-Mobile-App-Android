import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FavouriteRequest } from "@/types/FavouritesTypes";
import { handleAddFavouriteMovie } from "@/services/favouritesApi";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";

function useAddFavouriteMovieMutation() {
  const queryClient = useQueryClient();

  const { mutate: addMovieToFavourites, isPending: addingMovieToFavourites } =
    useMutation({
      mutationKey: ["addFavouriteMovie"],
      mutationFn: (data: FavouriteRequest) =>
        handleAddFavouriteMovie(data.userId, data.entityId),
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Successfully added movie to favourites.",
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

  return { addMovieToFavourites, addingMovieToFavourites };
}

export default useAddFavouriteMovieMutation;
