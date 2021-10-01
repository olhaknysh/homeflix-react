import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/auth-operations';
import {
  getUserEmail,
  getUserName,
    getUserPhoto,
  isLoading
} from '../../redux/auth/auth-selectors';
import NoPhoto from '../../utils/images/no-user-image.jpeg';
import styles from './AccoutPage.module.scss';
import { BiExit } from 'react-icons/bi';
import Friends from '../../components/Friends';
import Preferences from '../../components/Preferences'
import WatchList from '../../components/WatchList'
import Loader from '../../components/Loader'

const AccountPage = () => {
  const dispatch = useDispatch();

  const email = useSelector(getUserEmail);
  const name = useSelector(getUserName);
    const photo = useSelector(getUserPhoto);
    const loading = useSelector(isLoading)

  const handleLogout = () => dispatch(logout());
  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.userInfo}>
        {photo ? (
          <img className={styles.image} src={photo} alt='user photo' />
        ) : (
          <img className={styles.image} src={NoPhoto} alt='no user photo' />
        )}
        <div>
          {name && <h2 className={styles.name}>{name}</h2>}
          <p className={styles.email}>{email}</p>
          <button
            className={styles.button}
            onClick={handleLogout}
            type='button'
          >
            <BiExit /> Sign Out
          </button>
        </div>
      </div>
      <Friends />
      <Preferences />
      <WatchList />
    </div>
  );
};

export default AccountPage;
