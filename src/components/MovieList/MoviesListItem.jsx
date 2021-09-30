import styles from './MovieListItem.module.scss';
import { FaQuestionCircle } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom';

const MovieListItem = ({ id, genres, image, name, language, location }) => {
  return (
    <li
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0)),url(${image})`,
      }}
      className={styles.item}
      data-id={id}
    >
      <Link
        className={styles.link}
        to={{
          pathname: `show/${id}`,
          state: { from: location },
        }}
      >
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          {genres.length > 0 ? (
            <div className={styles.genres}>
              {genres.map((genre) => (
                <p className={styles.genre} key={genre}>
                  {genre}
                </p>
              ))}
            </div>
          ) : (
            <p className={styles.nogenre}>
              <FaQuestionCircle /> genres
            </p>
          )}
          <p className={styles.language}>Language: {language}</p>
        </div>
      </Link>
    </li>
  );
};

export default withRouter(MovieListItem);
