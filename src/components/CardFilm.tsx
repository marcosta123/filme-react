import "../CardFilm.css"
import { Link } from "react-router-dom";

type CardFilmProps = {
  image: string;
  title: string;
  year: string | number;
  to?: string;
};

function CardFilm({ image, title, year, to }: CardFilmProps) {
  const card = (
    <div className="movie-card">
      <img src={image} alt={title} className="movie-card-image" />

      <div className="movie-card__content">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__year">{year}</p>
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="movie-card-link">
      {card}
    </Link>
  ) : card;
}

export default CardFilm;
