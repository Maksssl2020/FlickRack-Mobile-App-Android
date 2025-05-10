import { useQuery } from "@tanstack/react-query";
import { fetchUserAllReviews } from "@/services/userReviewsApi";
import { useAuthenticationStore } from "@/store/AuthenticationStore";

function useUserReviewsQuery() {
  const { userId } = useAuthenticationStore.getState().authentication;

  const { data: allUserReviews, isLoading: fetchingAllUserReviews } = useQuery({
    queryKey: ["allUserReviews", userId],
    queryFn: async () => {
      if (userId !== undefined && userId !== null) {
        return await fetchUserAllReviews(userId);
      }
    },
    enabled: userId !== undefined && userId !== null,
  });

  return { allUserReviews, fetchingAllUserReviews };
}

export default useUserReviewsQuery;
