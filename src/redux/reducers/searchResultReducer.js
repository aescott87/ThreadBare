import { combineReducers } from 'redux';

const searchListReducer = (state = [], action) => {
    if (action.type === 'LIST_RESULT'){
        console.log('in searchList reducer', action.payload);
        return action.payload;
    }
    return state
}

export default combineReducers({
    searchListReducer,
  });