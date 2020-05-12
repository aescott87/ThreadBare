import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import postSaga from './postSaga';
import searchRetailerSaga from './searchRetailerSaga';
import searchSizeSaga from './searchSizeSaga';
import getRetailerSaga from './getRetailersSaga';
import editRetailerSaga from './editSaga';
import deleteRetailerSaga from './deleteRetailerSaga';
import addFeedbackSaga from './addFeedbackSaga';
import getFeedbackSaga from './getFeedbackSaga';
import deleteFeedbackSaga from './deleteFeedbackSaga';

// rootSaga is the primary saga.

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    postSaga(),
    searchRetailerSaga(),
    searchSizeSaga(),
    getRetailerSaga(),
    editRetailerSaga(),
    deleteRetailerSaga(),
    addFeedbackSaga(),
    getFeedbackSaga(),
    deleteFeedbackSaga(),
  ]);
}
