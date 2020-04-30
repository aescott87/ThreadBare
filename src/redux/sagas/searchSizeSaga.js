import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* searchSize( action ) {
    console.log('in searchSize saga', action.payload);
    try { 
        const response = yield axios.get(`/api/retailer`, { params: action.payload });
        console.log('Response coming from server', response.data)
        yield put({type: 'LIST_RESULT', payload: response.data })
    }
    catch(error){
        console.log('error in search size', error);
    }
}

function* searchSizeSaga() {
    yield takeLatest('SEARCH_SIZE', searchSize);
  }

export default searchSizeSaga;