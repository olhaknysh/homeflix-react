import { useState } from 'react';
import Select from 'react-select';
import styles from './CountryForm.module.scss';

import countries from '../../utils/coutries.json';

import { todaysShowsOperations } from '../../redux/todayShows';
import { useDispatch } from 'react-redux';

const countrisNames = countries.map((country) => country);

const CountryForm = ({ todayDate, selectCountry }) => {
  const [country, setCountry] = useState('UA');
  const dispatch = useDispatch();

  const handleChange = ({ value }) => {
    selectCountry(value);
    setCountry(value);
    dispatch(todaysShowsOperations.fetchTodaysShows(value, todayDate));
  };

  return (
    <form className={styles.container}>
      <Select
        className={styles.select}
        placeholder='Choose the country'
        value={country}
        onChange={handleChange}
        options={countrisNames}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary25: '#d2bdff',
            primary: 'black',
            neutral0: 'black',
          },
        })}
      />
    </form>
  );
};

export default CountryForm;
