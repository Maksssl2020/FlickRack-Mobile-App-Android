import { useMutation } from "@tanstack/react-query";
import { UserReviewRequestsWithIdOnly } from "@/types/UserReviewTypes";
import { userReviewExists } from "@/services/userReviewsApi";

function useUserReviewExistsMutation(onSuccess: (value: boolean) => void) {
  const { mutate: checkUserReviewExists, isPending: checkingUserReviewExists } =
    useMutation({
      mutationKey: ["userReviewExists"],
      mutationFn: (data: UserReviewRequestsWithIdOnly) =>
        userReviewExists(data.userId, data.movieId),
      onSuccess: (data) => {
        onSuccess(data);
      },
    });

  return { checkUserReviewExists, checkingUserReviewExists };
}

export default useUserReviewExistsMutation;
