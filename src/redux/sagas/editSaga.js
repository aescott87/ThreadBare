import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editRetailer(event) {
    console.log('in edit retailer', event);
    try {
    yield axios.put(`/api/admin`, event.payload);
    yield put ({type: 'GET_ALL_RETAILERS'});
    }
    catch (error) {
        console.log('Error editing retailer', error);
    }
}

function* editRetailerSaga() {
    yield takeLatest('EDIT_RETAILER', editRetailer);
}

export default editRetailerSaga;