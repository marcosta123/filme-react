import CategoryMovies from "../services/MoviesApi";

function FilmPage() {
  return (
    <>
      <CategoryMovies type="popular" />
      <CategoryMovies type="top_rated" />
      <CategoryMovies type="now_playing" />
      <CategoryMovies type="upcoming" />
    </>
  );
}

export default FilmPage;