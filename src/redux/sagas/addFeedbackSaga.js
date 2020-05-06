import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addFeedback(action) {
    console.log('In addFeedback', action.payload);
    try {
        axios.post('/api/edit', action.payload);
        yield put({type: 'GET_FEEDBACK'});
    } catch(error) {
        console.log('error with add feedback request', error);
    }
}

function* addFeedbackSaga() {
    yield takeLatest('ADD_FEEDBACK', addFeedback);
}

export default addFeedbackSaga;