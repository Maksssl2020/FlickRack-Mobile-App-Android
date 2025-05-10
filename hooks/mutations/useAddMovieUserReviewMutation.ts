import { useMutation } from "@tanstack/react-query";
import { UserMovieReviewRequest } from "@/types/UserReviewTypes";
import { handleAddMovieUserReview } from "@/services/userReviewsApi";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/ErrorTypes";

function useAddMovieUserReviewMutation(onSuccess?: () => void) {
  const { mutate: addMovieUserReview, isPending: addingMovieUserReview } =
    useMutation({
      mutationKey: ["addUserReview"],
      mutationFn: (data: UserMovieReviewRequest) =>
        handleAddMovieUserReview(data),
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Successfully added a review for a movie.",
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

  return { addMovieUserReview, addingMovieUserReview };
}

export default useAddMovieUserReviewMutation;
