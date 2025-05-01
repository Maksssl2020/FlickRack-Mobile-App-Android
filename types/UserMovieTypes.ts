import { MovieTmbd } from "@/types/MovieTypes";

export type UserMovieStatus = "Watched" | "ToWatch" | "Watching";

export interface MovieDataToSave {
  id: string;
  title: string;
}

export interface MovieDataToManage {
  id: string;
  title: string;
  userMovieStatus: UserMovieStatus;
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
