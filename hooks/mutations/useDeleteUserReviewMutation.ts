import { useMutation } from "@tanstack/react-query";
import { UserReviewRequestsWithIdOnly } from "@/types/UserReviewTypes";
import { handleDeleteReview } from "@/services/userReviewsApi";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";

function useDeleteUserReviewMutation() {
  const { mutate: deleteUserReview, isPending: deletingUserReview } =
    useMutation({
      mutationKey: ["deleteUserReview"],
      mutationFn: (data: UserReviewRequestsWithIdOnly) =>
        handleDeleteReview(data.userId, data.movieId),
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Successfully deleted review",
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

  return { deleteUserReview, deletingUserReview };
}

export default useDeleteUserReviewMutation;
