import { useQuery } from "@tanstack/react-query";
import { fetchMoviesTmdb } from "@/services/moviesApi";
import { useDebounce } from "use-debounce";

function useTmdbMoviesQuery(query?: string) {
  const [debouncedQuery] = useDebounce(query, 500);

  const { data: tmdbMovies, isLoading: fetchingTmdbMovies } = useQuery({
    queryKey: ["tmdbPopularMoviesData", debouncedQuery],
    queryFn: () => fetchMoviesTmdb(debouncedQuery),
  });

  return { tmdbMovies, fetchingTmdbMovies };
}

export default useTmdbMoviesQuery;
