import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { deleteFilmFromWatchList } from '../../redux/auth/auth-operations';
import { getUserWatchList, getUserUid } from '../../redux/auth/auth-selectors'

import { TiDelete } from 'react-icons/ti'

import styles from './WatchList.module.scss';


const WatchList = ({ location }) => {
    const dispatch = useDispatch();
    
    const userUid = useSelector(getUserUid);
    const watchList = useSelector(getUserWatchList)

    const handleDelete = (e) => {
        const { id } = e.currentTarget.dataset;
        const show = {
            id,
            uid:userUid
        }
        dispatch(deleteFilmFromWatchList(show))
    }

    return (
      <div className={styles.container}>
        <h3>Not forget to watch</h3>
        <IconContext.Provider
          value={{
            color: 'white',
            size: '1.4rem',
            className: 'global-class-name',
          }}
        >
          {watchList.length > 0 ? (
            <ul className={styles.list}>
              {watchList.map((show) => (
                <li className={styles.item} key={show.id}>
                  <Link
                    className={styles.link}
                    to={{
                      pathname: `show/${show.id}`,
                      state: { from: location },
                    }}
                  >
                    {show.name}
                  </Link>
                  <button
                    type='button'
                    data-id={show.id}
                    onClick={handleDelete}
                    className={styles.delete}
                  >
                    <TiDelete />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Please add shows you would like to watch</p>
          )}
        </IconContext.Provider>
      </div>
    );
}

export default withRouter(WatchList);