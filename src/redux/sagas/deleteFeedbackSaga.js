import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Triggered by 'DELETE_FEEDBACK' action
function* deleteFeedback(event) {
    console.log('in deleteFeedback', event.payload)
    try{
      //Sends delete request and feedback ID to the server
      yield axios.delete(`/api/edit/${event.payload.id}`);
      yield put({type: 'GET_ALL_FEEDBACK'})
    }
    catch(error) {
      console.log('Error deleting feedback', error);
    }
}

function* deleteFeedbackSaga() {
    yield takeLatest('DELETE_FEEDBACK', deleteFeedback);
}

export default deleteFeedbackSaga;