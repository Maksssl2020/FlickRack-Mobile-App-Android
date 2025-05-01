import { Actor } from "@/types/ActorTypes";
import axiosConfig from "@/services/axiosConfig";

export async function fetchPopularActors(): Promise<Actor[]> {
  const response = await axiosConfig.get<Actor[]>("/actors/tmdb");
  return response.data;
}
