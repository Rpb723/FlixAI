declare module "movie-trailer" {
  interface MovieTrailerOptions {
    apiKey?: string;
    id?: boolean;
    language?: string;
    multi?: boolean;
    tmdbId?: string | number;
    year?: string | number;
  }

  function movieTrailer(
    movie: string | null,
    options?: MovieTrailerOptions
  ): Promise<string[]>;

  export = movieTrailer;
}
