import { useEffect, useState } from "react";
import CardFilm from "../components/CardFilm";

type Serie = {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
};

type SerieType = { type: "popular" | "top_rated" | "on_the_air" | "airing_today" };


function CategorySeries({ type }: SerieType) {
  const [series, setSeries] = useState<Serie[]>([]);
  console.log(type);

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
  }, []);
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
            image={
              serie.poster_path
                ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                : ""
            }
            title={serie.title}
            year={serie.release_date ? serie.release_date.slice(0, 4) : "N/A"}
          />
        ))}
      </div>
    </section>
  );
}

export default CategorySeries;

