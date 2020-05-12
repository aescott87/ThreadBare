import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Triggered by 'EDIT_RETAILER' action
function* editRetailer(event) {
    console.log('in edit retailer', event);
    try {
    //Sends edited retailer info to server
    yield axios.put(`/api/admin`, event.payload);
    yield put ({type: 'GET_ALL_RETAILERS'});
    }
    catch (error) {
        console.log('Error editing retailer', error);
    }
}

function* editRetailerSaga() {
    yield takeLatest('EDIT_RETAILER', editRetailer);
}

export default editRetailerSaga;