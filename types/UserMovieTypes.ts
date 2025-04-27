import { MovieTmbd } from "@/types/MovieTypes";

export type UserMovieStatus = "ToWatch" | "Watching" | "Watched";

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
}
