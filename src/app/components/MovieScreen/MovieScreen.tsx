import React from "react";
import styles from "./MovieScreen.module.scss";
import Youtube from "react-youtube";

function MovieScreen({ trailerUrl, currentMovie, className, onReady }) {
  const youtubeOpts = {
    height: "100%",
    width: "100%",
    innerWidth: "100%",
    innerHeight: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className={`${styles.movieScreen} ${className}`}>
      <div className={styles.movieScreen__header}>{currentMovie}</div>
      <div className={styles.movieScreen__video}>
        <Youtube
          className={styles.movieScreen__video_youtube}
          videoId={trailerUrl}
          opts={youtubeOpts}
          onReady={onReady}
        />
      </div>
    </div>
  );
}

export default MovieScreen;
