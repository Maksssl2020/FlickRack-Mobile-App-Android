export interface Actor {
  adult: boolean;
  gender: ActorGender;
  popularity: number;
  name: string;
  actorId: number;
  profile_path: string;
  known_for: ActorKnownFor[];
}

export type ActorGender = "NOT_SPECIFIED" | "FEMALE" | "MALE" | "NON_BINARY";

export interface ActorKnownFor {
  title: string;
  overview: string;
  movieId: number;
  poster_path: string;
}
