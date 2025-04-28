import { useMutation } from "@tanstack/react-query";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import { handleDeleteUserMovie } from "@/services/userMoviesApi";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";
import Toast from "react-native-toast-message";

function useDeleteUserMovieMutation(onSuccess?: () => void) {
  const { userId } = useAuthenticationStore.getState().authentication;

  const { mutate: deleteUserMovie, isPending: deletingUserMovie } = useMutation(
    {
      mutationKey: ["deleteUserMovie"],
      mutationFn: async (movieId: number) => {
        if (userId) {
          await handleDeleteUserMovie(userId, movieId);
        }
      },
      onSuccess: () => {
        onSuccess?.();
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
    },
  );

  return { deleteUserMovie, deletingUserMovie };
}

export default useDeleteUserMovieMutation;
