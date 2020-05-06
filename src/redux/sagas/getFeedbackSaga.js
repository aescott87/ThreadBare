import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getFeedback(action) {
    console.log('In getFeedback Saga');
    try {
        const response = yield axios.get('/api/edit');
        yield put({ type: 'GET_FEEDBACK', payload: response.data });
    } catch (error) {
        console.log('error with get feedback request', error);
    }
}

function* getFeedbackSaga() {
    yield takeLatest('GET_ALL_FEEDBACK', getFeedback);
}


export default getFeedbackSaga;