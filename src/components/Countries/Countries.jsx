import CountryForm from './CountryForm';
import { useState, useEffect } from 'react';
import CountriesList from './CountriesList';

import {
  todaysShowsOperations,
  todaysShowsSelectors,
} from '../../redux/todayShows';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Countries.module.scss';

import countries from '../../utils/coutries.json';
import Loader from '../Loader';

const countriesNames = countries.map((country) => country);

const Countries = () => {
  const [id, setId] = useState(19);
  const [country, setCountry] = useState(countries[id].value);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(todaysShowsSelectors.todayShowsLoading);
  const error = useSelector(todaysShowsSelectors.todayShowsError);

  const selectCountry = (country) => {
    setCountry(country);
    setSelectedCountry(true);
    const id = countries.reduce((acc, item, index) => {
      if (item.value === country) {
        acc = index;
      }
      return acc;
    }, 0);
    setId(id + 1);
  };

  const getTodayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };
  const todayDate = getTodayDate();

  useEffect(() => {
    dispatch(
      todaysShowsOperations.fetchTodaysShows(
        countriesNames[id].value,
        todayDate
      )
    );
    setId((prevId) => prevId + 1);
  }, []);

  useEffect(() => {
    let timerId;
    if (selectedCountry) {
      return () => clearInterval(timerId);
    }
    timerId = setInterval(() => {
      if (country === 'GB') {
        setId(0);
      } else {
        setId((prevId) => prevId + 1);
      }

      dispatch(
        todaysShowsOperations.fetchTodaysShows(
          countriesNames[id].value,
          todayDate
        )
      );
      if (id === 0) {
        setCountry(countriesNames[21].value);
      } else {
        setCountry(countriesNames[id].value);
      }
    }, 60000);

    return () => clearInterval(timerId);
  }, [id, country, selectedCountry]);
    
  return (
    <div className={styles.container}>
      <h2>{id === 0 ? countries[21].label : countries[id - 1].label}</h2>
      <CountryForm todayDate={getTodayDate()} selectCountry={selectCountry} />
      {isLoading ? <Loader /> : <CountriesList />}
    </div>
  );
};

export default Countries;
