import { useQuery } from "@tanstack/react-query";
import { fetchMovieByIdTmdb } from "@/services/moviesApi";

function useTmdbMovieByIdQuery(movieId?: string) {
  const { data: movieDataById, isLoading: fetchingMovieById } = useQuery({
    queryKey: ["movieData", movieId],
    queryFn: async () => {
      if (movieId !== undefined && movieId !== null) {
        return await fetchMovieByIdTmdb(parseInt(movieId));
      }
    },
    enabled: movieId !== undefined && movieId !== null,
  });

  return { movieDataById, fetchingMovieById };
}

export default useTmdbMovieByIdQuery;
