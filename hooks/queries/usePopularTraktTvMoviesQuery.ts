import { useQuery } from "@tanstack/react-query";
import { fetchPopularMoviesTraktTv } from "@/services/moviesApi";

function usePopularTraktTvMoviesQuery() {
  const {
    data: popularMoviesTraktTv,
    isLoading: fetchingTraktTvPopularMovies,
  } = useQuery({
    queryKey: ["traktTvPopularMoviesData"],
    queryFn: () => fetchPopularMoviesTraktTv(),
  });

  return { popularMoviesTraktTv, fetchingTraktTvPopularMovies };
}

export default usePopularTraktTvMoviesQuery;
