import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserUid } from '../../redux/auth/auth-selectors';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getFavoriteShows } from '../../redux/auth/auth-operations';
import {
  favoriteShows,
  favoriteShowsId,
} from '../../redux/auth/auth-selectors';
import MovieList from '../../components/MovieList';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import styles from './FavoritesPage.module.scss';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  //   const [idShows, setIdShows] = useState([]);
  //   const userUid = useSelector(getUserUid);
  //   useEffect(async () => {
  //     const db = getFirestore();
  //     const usersSnapshot = await getDocs(collection(db, 'users'));

  //     usersSnapshot.forEach((doc) => {
  //       if (userUid === doc.data().uid) {
  //         setIdShows(doc.data().favorites);
  //       }
  //     });
  //   }, [userUid]);

  const ids = useSelector(favoriteShowsId);

  useEffect(() => {
    dispatch(getFavoriteShows(ids));
  }, [ids]);

  const favorites = useSelector(favoriteShows);
  console.log('favorites', favorites);

  return (
    <div className={styles.container}>
      {favorites.length > 0 ? (
        <MovieList shows={favorites} />
      ) : (
        <p className={styles.text}>
          Please add some shows to your favorites <HiOutlineEmojiHappy />
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;
