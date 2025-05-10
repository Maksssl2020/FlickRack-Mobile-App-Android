import { useMutation } from "@tanstack/react-query";
import { UserMovieReviewRequest } from "@/types/UserReviewTypes";
import { handleUpdateMovieUserReview } from "@/services/userReviewsApi";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";

function useUpdateUserReviewMutation(onSuccess?: () => void) {
  const { mutate: updateUserReview, isPending: updatingUserReview } =
    useMutation({
      mutationKey: ["updateUserReview"],
      mutationFn: (data: UserMovieReviewRequest) =>
        handleUpdateMovieUserReview(data),
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Successfully updated review.",
        });

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

  return { updateUserReview, updatingUserReview };
}

export default useUpdateUserReviewMutation;
