import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import {
  getUserWatchList,
  favoriteShowsId,
  getUsersFriends,
  getUserUid,
  getUserName,
} from '../../redux/auth/auth-selectors';
import {
  addIdToFavorite,
  deleteIdFromFavorite,
  addFilmToWatchList,
} from '../../redux/auth/auth-operations';

import { MdFavoriteBorder } from 'react-icons/md';
import { BiCameraMovie } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ShowDetailsButtons.module.scss';

const ShowDetailsButtons = ({ id, showName }) => {
  const dispatch = useDispatch();
  const [showFriendsList, setshowFriendsList] = useState(false);

  const favorites = useSelector(favoriteShowsId);
  const watchlist = useSelector(getUserWatchList);
  const friends = useSelector(getUsersFriends);
  const uid = useSelector(getUserUid);
  const userName = useSelector(getUserName);

  const checkWatchListInclude = () => {
    return watchlist.some((item) => Number(item.id) === Number(id));
  };

  const checkFavoritesInclude = () => {
    return favorites.some((item) => Number(item) === Number(id));
  };

  const showFriends = () => {
    if (friends.length === 0) {
      toast.configure();
      toast.info('Please add friends :)');
      return;
    }
    setshowFriendsList(!showFriendsList);
  };

  const handleAddToWatchList = () => {
    const show = {
      id,
      uid,
      name: showName,
    };
    dispatch(addFilmToWatchList(show));
  };

  const handleDeleteFromFavorite = () => {
    dispatch(deleteIdFromFavorite(id, uid));
  };

  const handleAddIdToFavorite = () => {
    dispatch(addIdToFavorite(id, uid));
  };

  const handleSendToFriend = async (e) => {
    const { uid, name } = e.target.dataset;
    try {
      const db = getFirestore();
      const friendsRef = doc(db, 'users', uid);
      await updateDoc(friendsRef, {
        preferences: arrayUnion({
          from: userName,
          showId: id,
          showName: showName,
        }),
      });

      setshowFriendsList(!showFriendsList);
      toast.configure();
      toast.success(`You have recommended ${name} to watch ${showName}!`);
    } catch (error) {
      toast.configure();
      toast.error(error.message);
    }
  };

  return (
    <>
      {!checkWatchListInclude() && (
        <BiCameraMovie
          onClick={handleAddToWatchList}
          className={styles.watchlist}
        />
      )}
      {checkFavoritesInclude() ? (
        <AiFillHeart
          onClick={handleDeleteFromFavorite}
          className={styles.favorite}
        />
      ) : (
        <MdFavoriteBorder
          onClick={handleAddIdToFavorite}
          className={styles.favorite}
        />
      )}

      <FiSend className={styles.send} onClick={showFriends} />
      {showFriendsList && friends.length > 0 && (
        <ul className={styles.friendsList}>
          {friends.map(({ uid, name }) => (
            <li
              onClick={handleSendToFriend}
              data-uid={uid}
              data-name={name}
              className={styles.friend}
              key={uid}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ShowDetailsButtons;
