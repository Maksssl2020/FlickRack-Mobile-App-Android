import { useQuery } from "@tanstack/react-query";
import { fetchTmdbActors } from "@/services/actorsApi";
import { useDebounce } from "use-debounce";

function useTmdbActorsQuery(query?: string) {
  const [debouncedQuery] = useDebounce(query, 500);

  const { data: tmdbActors, isLoading: fetchingTmdbActors } = useQuery({
    queryKey: ["popularActors", debouncedQuery],
    queryFn: () => fetchTmdbActors(debouncedQuery),
  });

  return { tmdbActors, fetchingTmdbActors };
}

export default useTmdbActorsQuery;
