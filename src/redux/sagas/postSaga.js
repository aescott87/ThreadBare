import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Triggered by 'NEW_RETAILER' action
function* addRetailerSaga(action) {
    console.log('In addRetailerSaga', action.payload);
    try {
        //Sends added retailer to the server
        axios.post('/api/retailer', action.payload);
        yield put({type: 'GET_RETAILER'});
    } catch(error) {
        console.log('error with post retailer request', error);
    }
}

function* postSaga() {
    yield takeLatest('NEW_RETAILER', addRetailerSaga);
}

export default postSaga;