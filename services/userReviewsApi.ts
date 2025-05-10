import axiosConfig from "@/services/axiosConfig";
import {
  UserMovieReview,
  UserMovieReviewRequest,
} from "@/types/UserReviewTypes";

export async function fetchMovieUsersReviews(movieId: string) {
  const response = await axiosConfig.get<UserMovieReview[]>(
    `/users-reviews/movie/${movieId}`,
  );
  return response.data;
}

export async function fetchUserAllReviews(userId: number) {
  const response = await axiosConfig.get<UserMovieReview[]>(
    `/users-reviews/all/${userId}`,
  );
  return response.data;
}

export async function handleAddMovieUserReview(data: UserMovieReviewRequest) {
  const response = await axiosConfig.post<void>(`/users-reviews/add`, data);
  return response.data;
}

export async function handleUpdateMovieUserReview(
  data: UserMovieReviewRequest,
) {
  const response = await axiosConfig.put<void>(`/users-reviews/update`, data);
  return response.data;
}

export async function handleDeleteReview(userId: number, movieId: string) {
  const response = await axiosConfig.delete<void>(
    `/users-reviews/delete/${userId}/${movieId}`,
  );
  return response.data;
}

export async function userReviewExists(userId: number, movieId: string) {
  const response = await axiosConfig.post<boolean>(
    `/users-reviews/exists/${userId}/${movieId}`,
  );
  return response.data;
}
