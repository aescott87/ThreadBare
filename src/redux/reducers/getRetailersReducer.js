import { combineReducers } from 'redux';

//Stores a list of retailers in an array
const getRetailers = (state = [], action) => {
    if (action.type === 'GET_RETAILER'){
        console.log('in getRetailers reducer', action.payload);
        return action.payload;
    }
    return state
}

export default combineReducers({
    getRetailers,
});