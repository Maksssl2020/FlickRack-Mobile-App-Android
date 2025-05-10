import { MovieReview, MovieTmbdReview } from "@/types/MovieTypes";
import { UserMovieReview } from "./UserReviewTypes";

export function mapTmdbReviewToMovieReview(
  tmdbReview: MovieTmbdReview,
): MovieReview {
  return {
    id: tmdbReview.id,
    userId: -1,
    movieId: -1,
    rating: tmdbReview.author_details.rating ?? 0,
    content: tmdbReview.content,
    username: tmdbReview.author_details.username || tmdbReview.author,
    createdAt: tmdbReview.created_at,
    updatedAt: tmdbReview.updated_at,
    isUserReview: false,
  };
}

export function mapUserReviewToMovieReview(
  userReview: UserMovieReview,
): MovieReview {
  return {
    id: userReview.id.toString(),
    userId: userReview.userId,
    movieId: userReview.movieId,
    rating: userReview.rating ?? 0,
    content: userReview.content,
    username: userReview.username,
    createdAt: userReview.createdAt,
    updatedAt: userReview.updatedAt,
    isUserReview: true,
  };
}
