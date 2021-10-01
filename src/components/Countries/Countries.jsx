import { useState, useEffect } from 'react';
import {
  todaysShowsOperations,
  todaysShowsSelectors,
} from '../../redux/todayShows';
import { useDispatch, useSelector } from 'react-redux';

import CountryForm from './CountryForm';
import CountriesList from './CountriesList';
import Loader from '../Loader';
import styles from './Countries.module.scss';

import countries from '../../utils/coutries.json';

const countriesNames = countries.map((country) => country);

const Countries = () => {
    const dispatch = useDispatch();
    
  const [id, setId] = useState(19);
  const [country, setCountry] = useState("UA");
    const [selectedCountry, setSelectedCountry] = useState(false);
    
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
       }, 30000);

       return () => clearInterval(timerId);
     }, [id, country, selectedCountry]);
 
    const isLoading = useSelector(todaysShowsSelectors.todayShowsLoading);

    const getTodayDate = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      return `${yyyy}-${mm}-${dd}`;
    };
    const todayDate = getTodayDate();

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

  return (
    <div className={styles.container}>
      <h2>{id === 0 ? countries[21].label : countries[id - 1].label}</h2>
      <CountryForm todayDate={getTodayDate()} selectCountry={selectCountry} />
      {isLoading ? <Loader /> : <CountriesList />}
    </div>
  );
};

export default Countries;
