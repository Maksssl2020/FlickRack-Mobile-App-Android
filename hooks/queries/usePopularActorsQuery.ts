import { useQuery } from "@tanstack/react-query";
import { fetchPopularActors } from "@/services/actorsApi";

function usePopularActorsQuery() {
  const { data: tmdbActors, isLoading: fetchingTmdbActors } = useQuery({
    queryKey: ["popularActors"],
    queryFn: () => fetchPopularActors(),
  });

  return { tmdbActors, fetchingTmdbActors };
}

export default usePopularActorsQuery;
