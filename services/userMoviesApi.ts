import { UserMovie, UserMovieRequest } from "@/types/UserMovieTypes";
import axiosConfig from "@/services/axiosConfig";

export async function handleSaveUserMovie(data: UserMovieRequest) {
  const response = await axiosConfig.post<void>("user-movies/save-movie", data);
  return response.data;
}

export async function fetchAllUserMovies(userId: number): Promise<UserMovie[]> {
  const response = await axiosConfig.get<UserMovie[]>(
    `user-movies/get-all/${userId}`,
  );
  return response.data;
}

export async function fetchAllUserMoviesIds(userId: number): Promise<number[]> {
  const response = await axiosConfig.get<number[]>(
    `user-movies/get-all-ids/${userId}`,
  );
  return response.data;
}

export async function handleUpdateMovieStatus(data: UserMovieRequest) {
  const response = await axiosConfig.put(
    "user-movies/update-movie-status",
    data,
  );
  return response.data;
}

export async function handleDeleteUserMovie(userId: number, movieId: number) {
  const response = await axiosConfig.delete<void>(
    `user-movies/delete-movie/${userId}/${movieId}`,
  );
  return response.data;
}
