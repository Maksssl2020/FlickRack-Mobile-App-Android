export interface Movie {
  title: string;
  year: number;
  ids: MovieIds;
  images: MovieImages;
}

interface MovieIds {
  trakt: number;
  slug: string;
  imdb: string;
  tmdb: number;
}

interface MovieImages {
  poster: string[];
  logo: string[];
  banner: string[];
}
