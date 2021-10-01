import styles from './SearchPage.module.scss';
import { useState } from 'react';
import _ from 'lodash';
import { RiMovie2Line } from 'react-icons/ri';
import MovieList from '../../components/MovieList';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../redux/movieSearch/movieSearch-operations';
import searchSelectors from '../../redux/movieSearch/movieSearch-selectors.js';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import Loader from '../../components/Loader'

const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchMovie, setSearchMovie] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(search(searchMovie));
  };
    const shows = useSelector(searchSelectors.movies);
    const loading  = useSelector(searchSelectors.loading)
  const handleInputChange = (e) => setSearchMovie(e.target.value);
  return (
      <div className={styles.container}>
          {loading && <Loader/>}
      <form onSubmit={handleSubmit} className={styles.form} autoComplete='off'>
        <input
          value={searchMovie}
          onChange={handleInputChange}
          className={styles.input}
          type='text'
        ></input>
        <button type='submit' className={styles.button}>
          Search <RiMovie2Line />
        </button>
      </form>
      {shows.length > 0 ? (
        <MovieList shows={shows} />
      ) : (
        <p className={styles.query}>
          Please enter your search query <HiOutlineEmojiHappy />
        </p>
      )}
    </div>
  );
};

export default SearchPage;
