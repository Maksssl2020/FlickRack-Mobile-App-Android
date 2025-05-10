import { Actor } from "@/types/ActorTypes";
import { MovieTmbd } from "@/types/MovieTypes";

export interface FavouriteRequest {
  userId: number;
  entityId: number;
}

export interface UserFavourite<T extends Actor | MovieTmbd> {
  userId: number;
  item: T;
}
