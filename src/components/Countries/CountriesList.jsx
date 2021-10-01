import { todaysShowsSelectors } from '../../redux/todayShows';
import {  useSelector } from 'react-redux';
import CountriesListItem from './CountriesListItem.jsx';
import styles from './CountriesList.module.scss';
import { RiVipCrownLine } from 'react-icons/ri';


const CountriesList = () => {
  const shows = useSelector(todaysShowsSelectors.todayShows);

  return (
    <>
      {shows.length > 0 ? (
        <div className={styles.container}>
          <table
            className={styles.table}
            cellPadding='0'
            cellSpacing='0'
            border='0'
          >
            <thead className={styles.header}>
              <tr>
                <th>Show</th>
                <th>Number</th>
                <th>Airdate</th>
                <th>Runtime</th>
              </tr>
            </thead>
            <tbody className={styles.content}>
              {shows &&
                shows.map(({ id, airtime, number, runtime, season, show }) => (
                  <CountriesListItem
                    key={id}
                    airtime={airtime}
                    id={show.id}
                    name={show.name}
                    number={number}
                    runtime={runtime}
                    season={season}
                  />
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.absent}>
          <RiVipCrownLine /> <br />
          <span className={styles.uppercase}>Carry on </span>
          <span className={styles.smalltext}>nothing</span>
          <br />
          <span className={styles.uppercase}>to see here</span>
        </p>
      )}
    </>
  );
};

export default CountriesList;
