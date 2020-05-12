import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import searchResult from './searchResultReducer';
import getRetailers from './getRetailersReducer';
import getFeedback from './getFeedbackReducer';

// rootReducer is the primary reducer for the entire project
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  searchResult, //will have all searched retailers
  getRetailers, //will have all retailers
  getFeedback, //will have all feedback
});

export default rootReducer;
