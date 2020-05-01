import { combineReducers } from 'redux';

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