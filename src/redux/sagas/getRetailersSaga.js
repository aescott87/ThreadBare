import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getRetailers(action) {
    console.log('In getRetailers Saga');
    try {
        const response = yield axios.get('/api/admin');
        yield put({ type: 'GET_RETAILER', payload: response.data });
    } catch (error) {
        console.log('error with get retailer request', error);
    }
}

function* getRetailerSaga() {
    yield takeLatest('GET_ALL_RETAILERS', getRetailers);
}


export default getRetailerSaga;