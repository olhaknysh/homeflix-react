import { RiArrowLeftSLine } from 'react-icons/ri';
import { RiArrowRightSLine } from 'react-icons/ri';
import styles from './Pagination.module.scss';
import { useState, useEffect } from 'react';

const Pagination = ({ currentPage, pagesCount, handlePageChange }) => {
  const [page, setPage] = useState(currentPage);
  const [totalPages, setTotalPages] = useState([]);
    const [filteredPaged, setFilteredPages] = useState([]);

    

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    let result = totalPages.reduce((acc, pageCount, index) => {
      if (page < 4) {
        if (totalPages.length < 5) {
          acc.push(pageCount);
          return acc;
        }
        if (index < 4) {
          acc.push(pageCount);
        }
        if (index === pagesCount.length - 2) {
          acc.push('....');
        }
        if (index === pagesCount.length - 1) {
          acc.push(pageCount);
        }
        return acc;
      }
      if (
        Number(page) === pagesCount.length - 3 ||
        Number(page) === pagesCount.length - 2 ||
        Number(page) === pagesCount.length - 1 ||
        Number(page) === pagesCount.length
      ) {
        if (index === 0) {
          acc.push(pageCount);
        }
        if (index === 1) {
          acc.push('...');
        }
        if (
          index === pagesCount.length - 5 ||
          index === pagesCount.length - 4 ||
          index === pagesCount.length - 3 ||
          index === pagesCount.length - 2 ||
          index === pagesCount.length - 1
        ) {
          acc.push(pageCount);
        }
        return acc;
      }
      if (index === 0) {
        acc.push(pageCount);
      }
      if (index === 1) {
        acc.push('....');
      }
      if (
        index === page - 2 ||
        index === page - 1 ||
        index === Number(page) ||
        index === Number(page) + 1
      ) {
        acc.push(pageCount);
      }
      if (index === pagesCount.length - 2) {
        acc.push('....');
      }
      if (index === pagesCount.length - 1) {
        acc.push(pageCount);
      }
      return acc;
    }, []);
    setFilteredPages(result);
  }, [totalPages]);

  useEffect(() => {
    setTotalPages(pagesCount);
  }, [pagesCount]);

  const changeCurrentPage = ({ target }) => {
    handlePageChange(target.dataset.name);
    setPage(target.dataset.name);
  };

  const handlePreviousPage = () => {
    if (page <= 1) {
      return;
    }
    const newPage = page - 1;
    setPage(newPage);
    handlePageChange(newPage);
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    if (newPage > pagesCount.length + 1) {
      return;
    }
    setPage(newPage);
    handlePageChange(newPage);
  };

  return (
    <ul className={styles.pages}>
      <RiArrowLeftSLine onClick={handlePreviousPage} className={styles.arrow} />
      {filteredPaged.length > 0 &&
        filteredPaged.map((page, index) => {
          if (page === '....') {
            return <li key={`${page}${index}`}>{page}</li>;
          } else
            return (
              <li
                onClick={changeCurrentPage}
                key={page}
                data-name={page}
                className={styles.page}
              >
                {page}
              </li>
            );
        })}
      <RiArrowRightSLine onClick={handleNextPage} className={styles.arrow} />
    </ul>
  );
};

export default Pagination;
