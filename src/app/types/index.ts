export type Movie = {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  original_name?: string;
  genre?: string;
  release_date?: string;
  [key: string]: unknown;
};

// export type MovieList = {
//   results: Movie[];
//   total_results: number;
//   total_pages: number;
// };

// export type HomeBaseProps = {
//   movieList: Movie[];
//   onSelectedVideo: (movie: Movie) => void;
//   trailerUrl: string;
// };

// export type ApiResponse<T> = {
//   data: T;
//   error?: string;
// };

export type MovieDetails = {
  title: string;
  genre?: string;
  releaseYear?: number;
};

export type YT = {
  Player: any;
};
