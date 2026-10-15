import { useEffect, useState } from "react";
import CardFilm from "../components/CardFilm";

type Serie = {
  id: number;
  poster_path: string | null;
  name: string;
  first_air_date: string;
};

type SerieType = { type: "popular" | "top_rated" | "on_the_air" | "airing_today" };

export type SerieDetails = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  first_air_date: string;
  last_air_date: string;
  episode_run_time: number[];
  number_of_seasons: number;
  number_of_episodes: number;
  genres: { id: number; name: string }[];
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; name: string; job: string }[];
  };
  recommendations: {
    results: {
      id: number;
      name: string;
      poster_path: string | null;
      vote_average: number;
    }[];
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export async function getSerieDetails(id: number): Promise<SerieDetails> {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits,recommendations`,
    {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODk0NDljZjRhMzczNTAwYTIwZTdkMTU5ODNjMjY2ZiIsIm5iZiI6MTc5MDcxMDAyOS40MDQsInN1YiI6IjZhYmMxMTBkMDM2YjY0ZmUyNDhiZDFiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zvhw_t0vsLzb3HE3tZdj-jgEA2MqBvIb-aYjtTyjgPw",
      },
    },
  );

  return response.json();
}


function CategorySeries({ type }: SerieType) {
  const [series, setSeries] = useState<Serie[]>([]);

  useEffect(() => {
    const fetchCategorySeries = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${type}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODk0NDljZjRhMzczNTAwYTIwZTdkMTU5ODNjMjY2ZiIsIm5iZiI6MTc5MDcxMDAyOS40MDQsInN1YiI6IjZhYmMxMTBkMDM2YjY0ZmUyNDhiZDFiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zvhw_t0vsLzb3HE3tZdj-jgEA2MqBvIb-aYjtTyjgPw",
          },
        },
      );
      const fetchedCategorySeries: { results: Serie[] } = await response.json();
      setSeries(fetchedCategorySeries.results);
    };

    fetchCategorySeries();
  }, [type]);
  const seriesTypes = {
    popular: "Series Popular",
    top_rated: "Series Melhor Avalidas",
    on_the_air: "Series no Ar",
    airing_today: "Series em Exibição Hoje"
  };
  return (
    <section>
      <h2>{seriesTypes[type]}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        {series.map((serie) => (
          <CardFilm
            key={serie.id}
            image={serie.poster_path
              ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
              : ""}
            title={serie.name}
              year={serie.first_air_date ? serie.first_air_date.slice(0, 4) : "N/A"}
              to={`/tv/${serie.id}`}
          />
        ))}
      </div>
    </section>
  );
}

export default CategorySeries;
