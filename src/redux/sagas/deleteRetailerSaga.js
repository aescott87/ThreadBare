import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Triggered by 'DELETE_RETAILER' action
function* deleteRetailer(event) {
    console.log('in deleteRetailer', event.payload)
    try{
      //Sends delete request and retailer name to server
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