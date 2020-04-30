import { combineReducers } from 'redux';

const searchList = (state = [], action) => {
    if (action.type === 'LIST_RESULT'){
        console.log('in searchList reducer', action.payload);
        console.log('state is', state);
        return action.payload;
    }
    return state
}

export default combineReducers({
    searchList,
  });