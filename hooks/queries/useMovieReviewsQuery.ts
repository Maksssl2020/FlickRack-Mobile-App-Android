import { useQuery } from "@tanstack/react-query";
import { fetchTmdbMovieReviewsByMovieId } from "@/services/moviesApi";

function useMovieReviewsQuery(movieId?: string) {
  const { data: movieTmdbReviews, isLoading: fetchingMovieTmdbReviews } =
    useQuery({
      queryKey: ["movieReviews", movieId],
      queryFn: async () => {
        if (movieId !== undefined) {
          return await fetchTmdbMovieReviewsByMovieId(movieId);
        }
      },
      enabled: movieId !== undefined,
    });

  return { movieTmdbReviews, fetchingMovieTmdbReviews };
}

export default useMovieReviewsQuery;
