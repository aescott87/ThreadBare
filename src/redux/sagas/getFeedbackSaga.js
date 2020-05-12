import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Triggered by 'GET_ALL_FEEDBACK' action
function* getFeedback(action) {
    console.log('In getFeedback Saga');
    try {
        //Response holds feedback sent from server
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