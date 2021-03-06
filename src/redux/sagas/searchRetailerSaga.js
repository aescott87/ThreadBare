import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//Triggered by 'SEARCH_RETAILER' action
function* searchRetailer( action ) {
    console.log('in searchRetailer saga', action.payload);
    try { 
        //response holds the search results we got from the server
        const response = yield axios.get(`/api/retailer`, { params: { retailerName: action.payload } });
        console.log('Response coming from server', response.data)
        yield put({type: 'LIST_RESULT', payload: response.data })
    }
    catch(error){
        console.log('error in search retailer', error);
    }
}

function* searchRetailerSaga() {
    yield takeLatest('SEARCH_RETAILER', searchRetailer);
  }

export default searchRetailerSaga;