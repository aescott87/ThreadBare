import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addRetailerSaga(action) {
    console.log('In addRetailerSaga', action.payload);
    try {
        axios.post('/api/retailer', action.payload);
        yield put({type: 'ADD_RETAILER'}); //use put in saga and this.props.dispatch in reducers
    } catch(error) {
        console.log('error with post retailer request', error);
    }
}

function* postSaga() {
    yield takeLatest('NEW_RETAILER', addRetailerSaga);
}

export default postSaga;