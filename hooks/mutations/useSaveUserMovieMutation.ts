import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserMovieRequest } from "@/types/UserMovieTypes";
import { handleSaveUserMovie } from "@/services/userMoviesApi";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";
import Toast from "react-native-toast-message";
import { useAuthenticationStore } from "@/store/AuthenticationStore";

function useSaveUserMovieMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { userId } = useAuthenticationStore.getState().authentication;

  const { mutate: saveUserMovie, isPending: savingUserMovie } = useMutation({
    mutationKey: ["saveUserMovie"],
    mutationFn: (data: UserMovieRequest) => handleSaveUserMovie(data),
    onSuccess: () => {
      onSuccess?.();

      Toast.show({
        type: "success",
        text1: "Saved movie successfully.",
      });

      if (userId) {
        queryClient.invalidateQueries({
          queryKey: ["userMoviesData", userId],
        });
      }
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

  return { saveUserMovie, savingUserMovie };
}

export default useSaveUserMovieMutation;
