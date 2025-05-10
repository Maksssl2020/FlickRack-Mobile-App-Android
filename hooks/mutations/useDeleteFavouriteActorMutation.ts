import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FavouriteRequest } from "@/types/FavouritesTypes";
import { handleRemoveFavouriteActor } from "@/services/favouritesApi";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";

function useDeleteFavouriteActorMutation() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteActorFromFavourites,
    isPending: deletingActorFromFavourites,
  } = useMutation({
    mutationKey: ["deleteFavouriteActor"],
    mutationFn: (data: FavouriteRequest) =>
      handleRemoveFavouriteActor(data.userId, data.entityId),
    onSuccess: (_, data) => {
      Toast.show({
        type: "success",
        text1: "Successfully removed actor from favourites.",
      });

      queryClient.invalidateQueries({
        queryKey: ["actorData", data.entityId],
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

  return { deleteActorFromFavourites, deletingActorFromFavourites };
}

export default useDeleteFavouriteActorMutation;
