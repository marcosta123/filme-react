import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cast from "../components/Cast";
import Genre from "../components/Genre";
import { getSerieDetails, type SerieDetails } from "../services/SeriesApi";
import "./DetailsSerie.css";

const imageBase = "https://image.tmdb.org/t/p/";

function DetailsSerie() {
  const { id } = useParams();
  const [serie, setSerie] = useState<SerieDetails | null>(null);

  useEffect(() => {
    getSerieDetails(Number(id))
      .then(setSerie)
      .catch((error: unknown) => console.error("Erro ao carregar série:", error));
  }, [id]);

  if (!serie) {
    return <p>Carregando série...</p>;
  }

  return (
    <main className="details">
      <section className="details__header">
        {serie.backdrop_path && (
          <img
            className="details__backdrop"
            src={`${imageBase}original${serie.backdrop_path}`}
            alt=""
            aria-hidden="true"
          />
        )}
        <Link to="/series">Voltar</Link>
        <div className="details__main">
          {serie.poster_path && (
            <img
              className="details__poster"
              src={`${imageBase}w500${serie.poster_path}`}
              alt={serie.name}
            />
          )}
          <div>
            <h1>{serie.name}</h1>
            <p>
              ★ {serie.vote_average.toFixed(1)} |{" "}
              {serie.first_air_date?.slice(0, 4)} |{" "}
              {serie.number_of_seasons} temporadas
            </p>
            <div className="details__genres">
              {serie.genres.map((genre) => (
                <Genre key={genre.id} name={genre.name} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="details__content">
        <h2>Overview</h2>
        <p>{serie.overview || "Sinopse indisponível."}</p>

        <h2>Cast</h2>
        <div className="details__list">
          {serie.credits.cast.slice(0, 10).map((person) => (
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
          {serie.credits.crew
            .filter((person) =>
              ["Director", "Writer", "Producer"].includes(person.job),
            )
            .slice(0, 8)
            .map((person) => (
              <article
                className="details__crew-card"
                key={`${person.id}-${person.job}`}
              >
                <strong>{person.name}</strong>
                <p>{person.job}</p>
              </article>
            ))}
        </div>

        <h2>More like this</h2>
        <div className="details__list">
          {serie.recommendations.results.slice(0, 8).map((relatedSerie) => (
            <Link
              className="details__card details__related"
              key={relatedSerie.id}
              to={`/tv/${relatedSerie.id}`}
            >
              {relatedSerie.poster_path && (
                <img
                  src={`${imageBase}w342${relatedSerie.poster_path}`}
                  alt={relatedSerie.name}
                />
              )}
              <strong>{relatedSerie.name}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default DetailsSerie;