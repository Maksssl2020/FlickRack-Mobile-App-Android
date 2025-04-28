import { MovieTmbd } from "@/types/MovieTypes";

export type UserMovieStatus = "Watched" | "ToWatch" | "Watching";

export interface MovieDataToDisplayInModalToSave {
  id: string;
  title: string;
}

export interface UserMovieRequest {
  userId: number;
  movieId: number;
  userMovieStatus: UserMovieStatus;
}

export interface UserMovie {
  userId: number;
  movie: MovieTmbd;
  userMovieStatus: UserMovieStatus;
}
