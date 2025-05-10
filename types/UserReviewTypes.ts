export interface UserMovieReview {
  id: number;
  userId: number;
  movieId: number;
  movieTitle: string;
  rating: number;
  content: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserMovieReviewRequest {
  userId: number;
  movieId: string;
  movieTitle: string;
  username: string;
  rating: number;
  content: string;
}

export interface UserReviewRequestsWithIdOnly {
  userId: number;
  movieId: string;
}
