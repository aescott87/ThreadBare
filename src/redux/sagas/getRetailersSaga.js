import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Triggered by 'GET_RETAILER' action
function* getRetailers(action) {
    console.log('In getRetailers Saga');
    try {
        //response holds all retailers sent from the server
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