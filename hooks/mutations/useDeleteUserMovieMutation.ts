import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import { handleDeleteUserMovie } from "@/services/userMoviesApi";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";
import Toast from "react-native-toast-message";

function useDeleteUserMovieMutation(onSuccess?: () => void) {
  const { userId } = useAuthenticationStore.getState().authentication;
  const queryClient = useQueryClient();

  const { mutate: deleteUserMovie, isPending: deletingUserMovie } = useMutation(
    {
      mutationKey: ["deleteUserMovie"],
      mutationFn: async (movieId: number) => {
        if (userId) {
          return await handleDeleteUserMovie(userId, movieId);
        }
      },
      onSuccess: () => {
        onSuccess?.();
        console.log("SUCCESS");
        Toast.show({
          type: "success",
          text1: "Deleted movie successfully.",
        });

        queryClient.invalidateQueries({
          queryKey: ["userMoviesData", userId],
        });
        queryClient.invalidateQueries({
          queryKey: ["userMoviesIds", userId],
        });
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        console.log("API Error:", error.response?.status, error.response?.data);
        const errorMessage = error.response?.data.message;
        if (errorMessage) {
          Toast.show({
            type: "error",
            text1: errorMessage,
          });
        }
      },
    },
  );

  return { deleteUserMovie, deletingUserMovie };
}

export default useDeleteUserMovieMutation;
