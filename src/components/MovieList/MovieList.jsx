import MoviesListItem from './MoviesListItem';
import styles from './MovieList.module.scss';

const MovieList = ({ shows }) => {
  return (
    <ul className={styles.container}>
      {shows &&
        shows.map(({ id, genres, image, name, language }) => (
          <MoviesListItem
            key={id}
            genres={genres}
            image={image?.medium}
            name={name}
            language={language}
            id={id}
          />
        ))}
    </ul>
  );
};

export default MovieList;
