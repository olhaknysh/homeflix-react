import { createAction } from '@reduxjs/toolkit';

const todayUpdatedRequest = createAction('showUpdates/todayUpdatedRequest');
const todayUpdatedSuccess = createAction('showUpdates/todayUpdatedSuccess');
const todayUpdatedError = createAction('showUpdates/todayUpdatedError');

const weekUpdatedRequest = createAction('showUpdates/weekUpdatedRequest');
const weekUpdatedSuccess = createAction('showUpdates/weekUpdatedSuccess');
const weekUpdatedError = createAction('showUpdates/weekUpdatedError');

const monthUpdatedRequest = createAction('showUpdates/monthUpdatedRequest');
const monthUpdatedSuccess = createAction('showUpdates/monthUpdatedSuccess');
const monthUpdatedError = createAction('showUpdates/monthUpdatedError');

export default {
  todayUpdatedRequest,
  todayUpdatedSuccess,
  todayUpdatedError,
  weekUpdatedRequest,
  weekUpdatedSuccess,
  weekUpdatedError,
  monthUpdatedRequest,
  monthUpdatedSuccess,
  monthUpdatedError,
};
