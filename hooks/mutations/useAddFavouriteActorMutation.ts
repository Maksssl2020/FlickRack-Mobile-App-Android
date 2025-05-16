import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FavouriteRequest } from "@/types/FavouritesTypes";
import {
  handleAddFavouriteActor,
  handleAddFavouriteMovie,
} from "@/services/favouritesApi";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";

function useAddFavouriteActorMutation() {
  const queryClient = useQueryClient();

  const { mutate: addActorToFavourites, isPending: addingActorToFavourites } =
    useMutation({
      mutationKey: ["addFavouriteActor"],
      mutationFn: (data: FavouriteRequest) =>
        handleAddFavouriteActor(data.userId, data.entityId),
      onSuccess: (_, data) => {
        console.log("Actor added to favourites successfully");

        Toast.show({
          type: "success",
          text1: "Successfully added actor to favourites.",
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

  return { addActorToFavourites, addingActorToFavourites };
}

export default useAddFavouriteActorMutation;
