type CastProps = {
  name: string;
  character: string;
  image: string | null;
};

function Cast({ name, character, image }: CastProps) {
  return (
    <article className="details__cast-person">
      {image ? (
        <img className="details__cast-image" src={image} alt={name} loading="lazy" />
      ) : (
        <div className="details__cast-placeholder" aria-hidden="true">
          {name.charAt(0)}
        </div>
      )}
      <strong>{name}</strong>
      <p>{character}</p>
    </article>
  );
}

export default Cast;