import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteRetailer(action) {
    console.log('in deleteRetailer')
    try{
      yield axios.delete(`/api/admin`);
      yield put({type: 'GET_ALL_RETAILERS'})
    }
    catch(error) {
      console.log('Error deleting retailer', error);
    }
}

function* deleteRetailerSaga() {
    yield takeLatest('DELETE_RETAILER', deleteRetailer);
}

export default deleteRetailerSaga;