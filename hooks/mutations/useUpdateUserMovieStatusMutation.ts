import { useMutation } from "@tanstack/react-query";
import { UserMovieRequest } from "@/types/UserMovieTypes";
import { handleUpdateMovieStatus } from "@/services/userMoviesApi";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";
import Toast from "react-native-toast-message";

function useUpdateUserMovieStatusMutation(onSuccess?: () => void) {
  const { mutate: updateUserMovieStatus, isPending: updatingUserMovieStatus } =
    useMutation({
      mutationKey: ["updateUserMovieStatus"],
      mutationFn: (data: UserMovieRequest) => handleUpdateMovieStatus(data),
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
    });

  return { updateUserMovieStatus, updatingUserMovieStatus };
}

export default useUpdateUserMovieStatusMutation;
