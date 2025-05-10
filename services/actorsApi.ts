import { Actor, ActorDetails } from "@/types/ActorTypes";
import axiosConfig from "@/services/axiosConfig";

export async function fetchTmdbActors(query?: string): Promise<Actor[]> {
  let url;

  if (query && query !== "") {
    const encodedQuery = encodeURIComponent(query);
    url = `/actors/tmdb?query=${encodedQuery}`;
  } else {
    url = "/actors/tmdb";
  }

  const response = await axiosConfig.get<Actor[]>(url);
  return response.data;
}

export async function fetchActorDetailsById(actorId: number, userId: number) {
  const response = await axiosConfig.get<ActorDetails>(
    `/actors/tmdb/actor/${actorId}/${userId}`,
  );
  return response.data;
}
