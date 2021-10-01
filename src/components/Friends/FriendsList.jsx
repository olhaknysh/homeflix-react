import { IconContext } from 'react-icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromFriends } from '../../redux/auth/auth-operations';
import { getUsersFriends, isLoading } from '../../redux/auth/auth-selectors';

import { TiDelete } from 'react-icons/ti';
import { FaUserFriends } from 'react-icons/fa';
import styles from './FriendsList.module.scss'

const FriendsList = () => {
    const dispatch = useDispatch()

    const friends = useSelector(getUsersFriends)

    const handleDelete = (e) => {
        const { uid } = e.currentTarget.dataset;
        dispatch(deleteFromFriends(uid))
    }
    
    return (
      <IconContext.Provider
        value={{
          color: 'white',
          size: '1.4rem',
          className: 'global-class-name',
        }}
      >
        {friends.length > 0 ? (
          <ul className={styles.list}>
            {friends.map(({ name, uid }) => (
              <li className={styles.item} key={uid}>
                {name}
                <button
                  data-uid={uid}
                  onClick={handleDelete}
                  className={styles.delete}
                  type='button'
                >
                  <TiDelete />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Add friends and enjoy watching shows together <FaUserFriends />
          </p>
        )}
      </IconContext.Provider>
    );
};

export default FriendsList;
