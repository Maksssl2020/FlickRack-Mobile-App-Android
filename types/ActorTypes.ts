export interface Actor {
  adult: boolean;
  gender: ActorGender;
  popularity: number;
  name: string;
  id: number;
  profile_path: string;
  known_for: ActorKnownFor[];
}

export interface ActorDetails {
  adult: boolean;
  gender: ActorGender;
  biography: string;
  birthday: string;
  deathday: string;
  isFavourite: boolean;
  popularity: number;
  name: string;
  id: number;
  profile_path: string;
}

export type ActorGender = "NOT_SPECIFIED" | "FEMALE" | "MALE" | "NON_BINARY";

export interface ActorKnownFor {
  title: string;
  overview: string;
  movieId: number;
  poster_path: string;
}
