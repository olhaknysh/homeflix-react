import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import {
  addIdToFavorite,
  deleteFromPreferences,
  addFilmToWatchList,
} from '../../redux/auth/auth-operations';
import {
  getUserPreferences,
  getUserUid,
  favoriteShowsId,
} from '../../redux/auth/auth-selectors';

import { MdFavoriteBorder } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { BiCameraMovie } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';

import styles from './Preferences.module.scss'


const Preferences = ({ location }) => {
    const dispatch = useDispatch();
    
    const preferences = useSelector(getUserPreferences);
    const userUid = useSelector(getUserUid);
    const favorites = useSelector(favoriteShowsId)
 

    const handleAddToFavorite = async (e) => {
        const { id } = e.currentTarget.dataset;
        await dispatch(addIdToFavorite(id, userUid))
        await dispatch(deleteFromPreferences(id,userUid))
    }

    const handleAddToWatchList = async (e) => {
        const { id, name } = e.currentTarget.dataset;
        const show = {
            id,
            uid: userUid,
            name
        }
        await dispatch(addFilmToWatchList(show))
        await dispatch(deleteFromPreferences(id, userUid));
    }

    const handleDelete = async (e) => {
        const { id } = e.currentTarget.dataset;
        await dispatch(deleteFromPreferences(id, userUid))
    } 

    return (
      <div className={styles.container}>
        <h3>Preferences</h3>
        <IconContext.Provider
          value={{
            color: 'white',
            size: '1.4rem',
            className: 'global-class-name',
          }}
        >
          {preferences.length > 0 ? (
            <ul className={styles.list}>
              {preferences.map(({ from, showName, showId }) => (
                <li className={styles.item} key={`${showId}+${from}`}>
                  <p>
                    {from} recommends you to watch
                    <Link
                      className={styles.link}
                      to={{
                        pathname: `show/${showId}`,
                        state: { from: location },
                      }}
                    >
                      {showName}
                    </Link>
                  </p>
                  <div className={styles.buttons}>
                    {favorites.includes(showId) ? (
                      <button type='button' className={styles.button}>
                        <AiFillHeart />
                      </button>
                    ) : (
                      <button
                        type='button'
                        className={styles.button}
                        data-id={showId}
                        onClick={handleAddToFavorite}
                      >
                        <MdFavoriteBorder />
                      </button>
                    )}
                    <button
                      type='button'
                      data-name={showName}
                      data-id={showId}
                      onClick={handleAddToWatchList}
                      className={styles.button}
                    >
                      <BiCameraMovie />
                    </button>
                    <button
                      type='button'
                      data-id={showId}
                      onClick={handleDelete}
                      className={styles.button}
                    >
                      <TiDelete />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven`t got any recommendations to watch yet</p>
          )}
        </IconContext.Provider>
      </div>
    );
}

export default withRouter(Preferences);