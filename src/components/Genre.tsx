type GenreProps = {
  name: string;
};

function Genre({ name }: GenreProps) {
  return <span className="details__genre">{name}</span>;
}

export default Genre;
