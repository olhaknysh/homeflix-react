import axios from 'axios';
import updatesActions from './showUpdates-actions.js';

export const updateToday = (page) => async (dispatch) => {
  dispatch(updatesActions.todayUpdatedRequest());

  try {
    const { data } = await axios.get(
      'https://api.tvmaze.com/updates/shows?since=day'
    );
    const { final, totalPages } = await returnData(data, page);
    dispatch(updatesActions.todayUpdatedSuccess({ final, totalPages }));
  } catch (error) {
    dispatch(updatesActions.todayUpdatedError(error.message));
  }
};

export const updateWeek = (page) => async (dispatch) => {
  dispatch(updatesActions.weekUpdatedRequest());

  try {
    const { data } = await axios.get(
      'https://api.tvmaze.com/updates/shows?since=week'
    );
    const final = await returnData(data, page);
    dispatch(updatesActions.weekUpdatedSuccess(final));
  } catch (error) {
    dispatch(updatesActions.weekUpdatedError(error.message));
  }
};

export const updateMonth = (page) => async (dispatch) => {
  dispatch(updatesActions.monthUpdatedRequest());

  try {
    const { data } = await axios.get(
      'https://api.tvmaze.com/updates/shows?since=month'
    );
    const final = await returnData(data, page);
    dispatch(updatesActions.monthUpdatedSuccess(final));
  } catch (error) {
    dispatch(updatesActions.monthUpdatedError(error.message));
  }
};

async function returnData(data, page) {
  let dataObj = Object.entries(data);
  dataObj.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    } else if (a[1] < b[1]) {
      return 1;
    }
  });
  let count = 0;
  let index = 0;
  let result = [];
  let pages = 1;
  const totalPages = [];
  for (let i = 0; i < dataObj.length; i += 1) {
    result[i] = [];
    if (count < 9) {
      result[index].push(dataObj[i]);
      count += 1;
    } else {
      result[index].push(dataObj[i]);
      count = 0;
      index += 1;
      totalPages.push(pages);
      pages += 1;
    }
  }
  const pagedResult = result[page - 1];
  const final = await Promise.all(
    pagedResult.map(async (item) => {
      const { data } = await axios.get(
        `https://api.tvmaze.com/shows/${item[0]}`
      );
      return data;
    })
  );
  return { final, totalPages };
}
