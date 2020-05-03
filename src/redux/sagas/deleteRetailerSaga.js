import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* deleteRetailer(event) {
    console.log('in deleteRetailer', event.payload)
    try{
      yield axios.delete(`/api/admin/${event.payload.name}`);
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