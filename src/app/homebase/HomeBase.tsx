"use client";

import React, { useState } from "react";
import styles from "./HomeBase.module.scss";
import Chat from "../components/Chat/Chat";
import Videos from "../components/Videos/Videos";
import axios from "axios";
import MovieScreen from "../components/MovieScreen/MovieScreen";
import movieTrailer from "movie-trailer";
import { YouTubeProps } from "react-youtube";
import { YT, MovieDetails } from "../types";

function HomeBase() {
  const [filteredMovies, setFilteredMovies] = useState<any>([]);
  const [theater, setTheather] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [currentMovie, setCurrentMovie] = useState("");
  const [player, setPlayer] = useState<YT["Player"] | null>(null);

  const fetchMovies = async (movie: string) => {
    try {
      const response = await axios.get(
        `/api/movies?query=${encodeURIComponent(movie)}`
      );
      const movieResponse = response.data;
      return movieResponse;
    } catch (error) {
      console.error(error);
    }
  };
  const extractTitle = (details: string) => {
    const regex = /(?:\d+\.\s*)?[Tt]itle:\s*([^,]+)/;
    const match = details.match(regex);

    if (match) {
      const title = match[1].trim();
      return title;
    } else {
      //Title with nested strings not found
      return null;
    }
  };
  const onFilterMovies = async (details: string | MovieDetails) => {
    if (typeof details === "string") {
      if (details.includes(":")) {
        const cleanTitle = extractTitle(details.trim());

        if (cleanTitle) {
          const movieSet = await fetchMovies(cleanTitle);
          setFilteredMovies(movieSet.results);
        }
      }
    }
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
  };

  const handleStopAndReset = () => {
    if (player) {
      player.pauseVideo(); // Pause the video
      player.seekTo(0, true); // Reset the video to the beginning
    }
    setTrailerUrl(""); // Reset trailer URL state
    setCurrentMovie(""); // Clear current movie state
    setTheather(false);
  };

  const handleSelectedMovie = (selectedMovie) => {
    movieTrailer(selectedMovie)
      .then((url) => {
        if (url) {
          const urlParam = new URLSearchParams(new URL(url).search);
          const videoId = urlParam.get("v");

          setTrailerUrl(videoId || "");
          setCurrentMovie(selectedMovie);
          setTheather(true);
        } else {
          //No trailers found for this movie
          handleStopAndReset();
        }
      })
      .catch((err) => {
        console.error(err);
        setTrailerUrl("");
        setTheather(false);
      });
  };

  return (
    <div className={styles.homebase}>
      <div
        className={styles.homebase__chat}
        style={{
          backgroundSize: "cover",
          backgroundImage: filteredMovies[0]?.backdrop_path
            ? `url("https://image.tmdb.org/t/p/original${filteredMovies[0].backdrop_path}")`
            : "none",
          backgroundPosition: "center center",
        }}
      >
        <div className={styles.homebase__chat_main}>
          <Chat onFilterMovies={onFilterMovies} />
        </div>
        <div
          className={`${styles.homebase__chat_movie} ${
            !trailerUrl ? styles.homebase__chat_hideMovie : ""
          }`}
        >
          <MovieScreen
            trailerUrl={trailerUrl}
            currentMovie={currentMovie}
            className={`${
              !theater ? styles.homebase__chat_hideMovie_screen : ""
            }`}
            onReady={onPlayerReady}
          />
        </div>
      </div>
      <div className={styles.homebase__videos}>
        <Videos videos={filteredMovies} onSelectedVideo={handleSelectedMovie} />
      </div>
    </div>
  );
}

export default HomeBase;
