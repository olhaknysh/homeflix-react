import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteShows } from '../../redux/auth/auth-operations';
import {
  favoriteShows,
  favoriteShowsId,
  isLoading,
} from '../../redux/auth/auth-selectors';

import MovieList from '../../components/MovieList';
import Loader from '../../components/Loader';
import { HiOutlineEmojiHappy } from 'react-icons/hi';

import styles from './FavoritesPage.module.scss';


const FavoritesPage = () => {
    const dispatch = useDispatch();

    const favorites = useSelector(favoriteShows);
    const ids = useSelector(favoriteShowsId);
    const loading = useSelector(isLoading);
    
  useEffect(() => {
    dispatch(getFavoriteShows(ids));
  }, [ids, dispatch]);

  return (
    <div className={styles.container}>
      {favorites.length > 0 ? (
        <MovieList shows={favorites} />
      ) : (
        <p className={styles.text}>
          Please add some shows to your favorites <HiOutlineEmojiHappy />
        </p>
              )}
          {loading && <Loader />}
    </div>
  );
};

export default FavoritesPage;
