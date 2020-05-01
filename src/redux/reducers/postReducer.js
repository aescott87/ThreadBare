import { combineReducers } from 'redux';

const addMessage = (state = '', action) => {
  switch (action.type) {
    case 'ADD_RETAILER':
      return 'Thank you for adding! Your insight helps shoppers just like you.';
    default:
      return state;
  }
};

export default combineReducers({
  addMessage,
});