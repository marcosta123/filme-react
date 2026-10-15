import { useEffect, useState } from "react";
import CardFilm from "../components/CardFilm";

const TMDB_HEADERS = {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODk0NDljZjRhMzczNTAwYTIwZTdkMTU5ODNjMjY2ZiIsIm5iZiI6MTc5MDcxMDAyOS40MDQsInN1YiI6IjZhYmMxMTBkMDM2YjY0ZmUyNDhiZDFiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zvhw_t0vsLzb3HE3tZdj-jgEA2MqBvIb-aYjtTyjgPw",
          };

type Movie = {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
};
type MovieType = { type: "top_rated" | "popular" | "now_playing" | "upcoming" };

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  runtime: number | null;
  genres: { id: number; name: string }[];
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; name: string; job: string }[];
  };
  recommendations: {
    results: {
      id: number;
      title: string;
      poster_path: string | null;
      vote_average: number;
    }[];
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export async function getMovieDetails(id: number): Promise<MovieDetails> {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,recommendations`,
    { headers: TMDB_HEADERS },
  );

  if (!response.ok) {
    throw new Error(`Não foi possível carregar o filme (${response.status}).`);
  }

  return response.json();
}

function CategoryMovies({ type }: MovieType) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchCategoryMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${type}`,
        {
          headers: TMDB_HEADERS,
        },
      );
      const fetchedPopularMovies: { results: Movie[] } = await response.json();
      setMovies(fetchedPopularMovies.results);
    };

    fetchCategoryMovies();
  }, [type]);
  const moviesTypes = {
    popular: "Popular Movies",
    top_rated: "Top Rated",
    now_playing: "Filmes em Exibicao",
    upcoming: "Filmes Embreve"
  };
  return (
    <section>
      <h2>{moviesTypes[type]}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        {movies.map((movie) => (
          <CardFilm
            key={movie.id}
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : ""
            }
            title={movie.title}
            year={movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
            to={`/movie/${movie.id}`}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryMovies;
