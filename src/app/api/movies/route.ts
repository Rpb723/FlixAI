// app/api/movies/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movie = searchParams.get("query");
  if (!movie) {
    return NextResponse.json({ error: "Movie is required" }, { status: 400 });
  }
  const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    movie
  )}`;

  try {
    const response = await axios.get(movieUrl, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        "Content-Type": "application/json",
      },
    }); // Fetch movie data from the provided URL
    return NextResponse.json(response.data); // Send AI response back to frontend
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movie data" },
      { status: 500 }
    );
  }
}
