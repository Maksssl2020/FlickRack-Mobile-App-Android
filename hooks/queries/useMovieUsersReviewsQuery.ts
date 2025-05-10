import { useQuery } from "@tanstack/react-query";
import { fetchMovieUsersReviews } from "@/services/userReviewsApi";

function useMovieUsersReviewsQuery(movieId?: string) {
  const { data: movieUsersReviews, isLoading: fetchingMovieUsersReviews } =
    useQuery({
      queryKey: ["movieUsersReviews", movieId],
      queryFn: async () => {
        if (movieId !== undefined) {
          return await fetchMovieUsersReviews(movieId);
        }
      },
      enabled: movieId !== undefined,
    });

  return { movieUsersReviews, fetchingMovieUsersReviews };
}

export default useMovieUsersReviewsQuery;
