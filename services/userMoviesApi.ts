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
