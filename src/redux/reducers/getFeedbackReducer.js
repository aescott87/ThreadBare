import { combineReducers } from 'redux';

const getFeedback = (state = [], action) => {
    if (action.type === 'GET_FEEDBACK'){
        console.log('in getFeedback reducer', action.payload);
        return action.payload;
    }
    return state
}

export default combineReducers({
    getFeedback,
});