import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails, type MovieDetails } from "../services/MoviesApi";
import Cast from "../components/Cast";
import Genre from "../components/Genre";
import "../DetailsFilm.css";

const imageBase = "https://image.tmdb.org/t/p/";

function DetailsFilm() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    getMovieDetails(Number(id))
      .then(setMovie)
      .catch((error: unknown) => console.error("Erro ao carregar filme:", error));
  }, [id]);

  return (
    <main className="details">
      {movie && (
        <>
          <section
            className="details__header"
          >
            {movie.backdrop_path && (
              <img
                className="details__backdrop"
                src={`${imageBase}original${movie.backdrop_path}`}
                alt=""
                aria-hidden="true"
              />
            )}
            <Link to="/">Voltar</Link>
            <div className="details__main">
              {movie.poster_path && (
                <img
                  className="details__poster"
                  src={`${imageBase}w500${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <div>
                <h1>{movie.title}</h1>
                <p>
                  ★ {movie.vote_average.toFixed(1)} | {movie.release_date?.slice(0, 4)} |{" "}
                  {movie.runtime} min
                </p>
                <div className="details__genres">
                  {movie.genres.map((genre) => (
                    <Genre key={genre.id} name={genre.name} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="details__content">
            <h2>Overview</h2>
            <p>{movie.overview || "Sinopse indisponível."}</p>

            <h2>Cast</h2>
            <div className="details__list">
              {movie.credits.cast.slice(0, 10).map((person) => (
                <Cast
                  key={person.id}
                  name={person.name}
                  character={person.character}
                  image={
                    person.profile_path
                      ? `${imageBase}w185${person.profile_path}`
                      : null
                  }
                />
              ))}
            </div>

            <h2>Crew</h2>
            <div className="details__list">
              {movie.credits.crew
                .filter((person) =>
                  ["Director", "Writer", "Producer"].includes(person.job),
                )
                .slice(0, 8)
                .map((person) => (
                  <article className="details__crew-card" key={`${person.id}-${person.job}`}>
                    <strong>{person.name}</strong>
                    <p>{person.job}</p>
                  </article>
                ))}
            </div>

            <h2>More like this</h2>
            <div className="details__list">
              {movie.recommendations.results.slice(0, 8).map((relatedMovie) => (
                <Link
                  className="details__card details__related"
                  key={relatedMovie.id}
                  to={`/movie/${relatedMovie.id}`}
                >
                  {relatedMovie.poster_path && (
                    <img
                      src={`${imageBase}w342${relatedMovie.poster_path}`}
                      alt={relatedMovie.title}
                    />
                  )}
                  <strong>{relatedMovie.title}</strong>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default DetailsFilm;
