"use client";

import React, { useEffect, useState } from "react";
import styles from "./Videos.module.scss";
import DynamicRow from "./DynamicRow/DynamicRow";
import Image from "next/image";
import flixAiNoPoster from "@/app/assets/images/flix-ai-ticket.png";
import { Movie } from "../../types";

function Videos({ videos, onSelectedVideo }) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const baseMovieSet = [
      {
        id: "23",
        poster_path: "",
        title: "Flix-AI",
      },
      {
        id: "24",
        poster_path: "",
        title: "Flix-AI",
      },
      {
        id: "25",
        poster_path: "",
        title: "Flix-AI",
      },
      {
        id: "26",
        poster_path: "",
        title: "Flix-AI",
      },
      {
        id: "27",
        poster_path: "",
        title: "Flix-AI",
      },
      {
        id: "28",
        poster_path: "",
        title: "Flix-AI",
      },
      {
        id: "29",
        poster_path: "",
        title: "Flix-AI",
      },
      {
        id: "30",
        poster_path: "",
        title: "Flix-AI",
      },
      {
        id: "31",
        poster_path: "",
        title: "Flix-AI",
      },
      {
        id: "32",
        poster_path: "",
        title: "Flix-AI",
      },
      {
        id: "33",
        poster_path: "",
        title: "Flix-AI",
      },
      {
        id: "34",
        poster_path: "",
        title: "Flix-AI",
      },
    ];
    setMovieList(videos?.length ? videos : baseMovieSet);
  }, [videos]);

  const movieClicked = (movie: Movie) => {
    onSelectedVideo(movie);
  };

  return (
    <div className={styles.videos}>
      <div className={styles.videos__header}>AI-Recommended Selections</div>
      <div className={styles.videos__rows}>
        <div
          className={`${styles.videos__rows_ai} ${
            movieList.length <= 5 ? styles.videos__rows_smallSet : ""
          }`}
        >
          {movieList.map((movie) => (
            <div
              key={movie.id}
              className={styles.videos__rows_ai__image_container}
            >
              <Image
                src={
                  movie.poster_path
                    ? `${base_url}${movie.poster_path}`
                    : flixAiNoPoster
                }
                alt={movie.title}
                fill={true}
                className={styles.videos__rows_ai__image_container_image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onClick={() =>
                  movieClicked(
                    movie?.title || movie?.name || movie?.original_name
                  )
                }
              />
            </div>
          ))}
        </div>
        <div className={styles.videos__rows_categories}></div>
        <DynamicRow />
      </div>
    </div>
  );
}

export default Videos;
