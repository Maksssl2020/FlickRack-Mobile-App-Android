import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "@/services/moviesApi";

function usePopularMoviesQuery() {
  const { data: popularMovies, isLoading: fetchingPopularMovies } = useQuery({
    queryKey: ["popularMoviesData"],
    queryFn: () => fetchPopularMovies(),
  });

  return { popularMovies, fetchingPopularMovies };
}

export default usePopularMoviesQuery;
