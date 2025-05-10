import axiosConfig from "@/services/axiosConfig";
import { UserFavourite } from "@/types/FavouritesTypes";
import { MovieTmbd } from "@/types/MovieTypes";
import { Actor } from "@/types/ActorTypes";

export async function fetchUserFavouritesMovies(userId: number) {
  const response = await axiosConfig.get<UserFavourite<MovieTmbd>[]>(
    `user-favourites/movies/${userId}`,
  );
  return response.data;
}

export async function handleAddFavouriteMovie(userId: number, movieId: number) {
  const response = await axiosConfig.post<void>(
    `user-favourites/movies/${userId}/${movieId}`,
  );
  return response.data;
}

export async function handleRemoveFavouriteMovie(
  userId: number,
  movieId: number,
) {
  const response = await axiosConfig.delete<void>(
    `user-favourites/movies/${userId}/${movieId}`,
  );
  return response.data;
}

export async function fetchUserFavouritesActors(userId: number) {
  const response = await axiosConfig.get<UserFavourite<Actor>[]>(
    `user-favourites/actors/${userId}`,
  );
  return response.data;
}

export async function handleAddFavouriteActor(userId: number, actorId: number) {
  const response = await axiosConfig.post<void>(
    `user-favourites/actors/${userId}/${actorId}`,
  );
  return response.data;
}

export async function handleRemoveFavouriteActor(
  userId: number,
  actorId: number,
) {
  const response = await axiosConfig.delete<void>(
    `user-favourites/actors/${userId}/${actorId}`,
  );
  return response.data;
}
