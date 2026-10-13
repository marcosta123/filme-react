import CategorySeries from "../services/SeriesApi";

function SeriePage() {
  return (
    <>
      <CategorySeries type="popular" />
      <CategorySeries type="top_rated" />
      <CategorySeries type="on_the_air" />
      <CategorySeries type="airing_today" />
    </>
  );
}

export default SeriePage;