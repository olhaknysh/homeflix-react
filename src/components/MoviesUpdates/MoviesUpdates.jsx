import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateToday,
  updateWeek,
  updateMonth,
} from '../../redux/showUpdates/showUpdates-operations';
import updatedShows from '../../redux/showUpdates/showUpdates-selectors';

import { IoArrowRedoCircleOutline } from 'react-icons/io5';
import Button from '../Button';
import MovieList from '../MovieList';
import Loader from '../Loader';
import Pagination from '../Pagination';

const MoviesUpdates = () => {
    const dispatch = useDispatch();
    
  const [page, setPage] = useState(1);
    const [updateSelect, setUpdateSelect] = useState('today');

  const shows = useSelector(updatedShows.updatedShows);
    const pagesCount = useSelector(updatedShows.pagesCount);
    const loading = useSelector(updatedShows.updatedLoading);

  useEffect(() => {
    dispatch(updateToday(1));
  }, []);

  const handleTodayUpdate = () => {
    setPage(1);
    setUpdateSelect('today');
    dispatch(updateToday(1));
  };

  const handleWeekUpdate = () => {
    setPage(1);
    setUpdateSelect('week');
    dispatch(updateWeek(1));
  };

  const handleMonthUpdate = () => {
    setPage(1);
    setUpdateSelect('month');
    dispatch(updateMonth(1));
  };

  const changePage = (currentPage) => {
    setPage(currentPage);
    switch (updateSelect) {
      case 'today': {
        dispatch(updateToday(currentPage));
        break;
      }
      case 'week': {
        dispatch(updateWeek(currentPage));
        break;
      }
      case 'month': {
        dispatch(updateMonth(currentPage));
        break;
      }
      default: {
        return;
      }
    }
  };
    
  return (
    <div >
      <h2>
        New releases <IoArrowRedoCircleOutline />
      </h2>
      <div >
        <Button handleEvent={handleTodayUpdate} text='today' />
        <Button handleEvent={handleWeekUpdate} text='last week' />
        <Button handleEvent={handleMonthUpdate} text='last month' />
      </div>
      {shows && <MovieList shows={shows} />}
      <Pagination
        currentPage={page}
        pagesCount={pagesCount}
        handlePageChange={changePage}
      />
      {loading && <Loader />}
    </div>
  );
};

export default MoviesUpdates;
