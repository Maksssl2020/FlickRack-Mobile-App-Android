import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserMovieRequest } from "@/types/UserMovieTypes";
import { handleUpdateMovieStatus } from "@/services/userMoviesApi";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";
import Toast from "react-native-toast-message";
import { useAuthenticationStore } from "@/store/AuthenticationStore";

function useUpdateUserMovieStatusMutation(onSuccess?: () => void) {
  const { userId } = useAuthenticationStore.getState().authentication;
  const queryClient = useQueryClient();

  const { mutate: updateUserMovieStatus, isPending: updatingUserMovieStatus } =
    useMutation({
      mutationKey: ["updateUserMovieStatus"],
      mutationFn: (data: UserMovieRequest) => handleUpdateMovieStatus(data),
      onSuccess: () => {
        onSuccess?.();

        Toast.show({
          type: "success",
          text1: "Updated movie successfully.",
        });

        queryClient.invalidateQueries({
          queryKey: ["userMoviesData", userId],
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

  return { updateUserMovieStatus, updatingUserMovieStatus };
}

export default useUpdateUserMovieStatusMutation;
