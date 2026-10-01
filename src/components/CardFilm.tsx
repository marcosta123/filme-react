import "../CardFilm.css"

type CardFilmProps = {
  image: string;
  title: string;
  year: string | number;
};

function CardFilm({ image, title, year }: CardFilmProps) {
  return (
    <div className="movie-card">
      <img src={image} alt={title} className="movie-card-image" />

      <div className="movie-card__content">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__year">{year}</p>
      </div>
    </div>
  );
}

export default CardFilm;
