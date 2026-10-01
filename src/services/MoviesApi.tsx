import { useEffect, useState } from "react";
import CardFilm from "../components/CardFilm";

type Movie = {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
};

function PopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODk0NDljZjRhMzczNTAwYTIwZTdkMTU5ODNjMjY2ZiIsIm5iZiI6MTc5MDcxMDAyOS40MDQsInN1YiI6IjZhYmMxMTBkMDM2YjY0ZmUyNDhiZDFiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zvhw_t0vsLzb3HE3tZdj-jgEA2MqBvIb-aYjtTyjgPw",
          },
        },
      );
      const fetchedPopularMovies: { results: Movie[] } = await response.json();
      setMovies(fetchedPopularMovies.results);
    };

    fetchPopularMovies();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr" }}>
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
        />
      ))}
    </div>
  );
}

export default PopularMovies;
