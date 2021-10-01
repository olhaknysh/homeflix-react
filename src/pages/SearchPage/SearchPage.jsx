import { useState, useRef,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../redux/movieSearch/movieSearch-operations';
import searchSelectors from '../../redux/movieSearch/movieSearch-selectors.js';

import MovieList from '../../components/MovieList';
import Loader from '../../components/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { HiOutlineEmojiHappy } from 'react-icons/hi';

import styles from './SearchPage.module.scss';


const SearchPage = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [searchMovie, setSearchMovie] = useState('');
    
  useEffect(() => {
    inputRef.current.focus();
    }, []);
    
  const shows = useSelector(searchSelectors.movies);
  const loading = useSelector(searchSelectors.loading);
    
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(search(searchMovie));
  };

  const handleInputChange = (e) => setSearchMovie(e.target.value);
    
  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <form onSubmit={handleSubmit} className={styles.form} autoComplete='off'>
        <input
          value={searchMovie}
          onChange={handleInputChange}
          className={styles.input}
          type='text'
          ref={inputRef}
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
