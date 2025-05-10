import { useQuery } from "@tanstack/react-query";
import { fetchMovieByIdTmdb } from "@/services/moviesApi";

function useTmdbMovieByIdQuery(movieId?: string, userId?: number | null) {
  const { data: movieDataById, isLoading: fetchingMovieById } = useQuery({
    queryKey: ["movieData", movieId],
    queryFn: async () => {
      if (
        movieId !== undefined &&
        movieId !== null &&
        userId !== undefined &&
        userId !== null
      ) {
        return await fetchMovieByIdTmdb(parseInt(movieId), userId);
      }
    },
    enabled:
      movieId !== undefined &&
      movieId !== null &&
      userId !== undefined &&
      userId !== null,
  });

  return { movieDataById, fetchingMovieById };
}

export default useTmdbMovieByIdQuery;
