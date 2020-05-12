import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AdminPage from '../AdminPage/AdminPage';

// Responsible for watching redux state, and returning an appropriate component
const ProtectedRoute = (props) => {
  // This takes ComponentToProtect from component
  // prop and grabs all other props to pass them along to Route
  const {
    component: ComponentToProtect,
    user,
    loginMode,
    ...otherProps
  } = props;

  let ComponentToShow;

  if (user.id) {
    // if the user is logged in, show the component that is protected
    ComponentToShow = ComponentToProtect;
    // if the user has Admin access, show Admin page
    if(user.id && user.admin) {
      ComponentToShow = AdminPage;
    }
  } else if (loginMode === 'login') {
    // if they are not logged in, check the loginMode on Redux State
    // if the mode is 'login', show the LoginPage
    ComponentToShow = LoginPage;
  } else {
    // the the user is not logged in and the mode is not 'login'
    // show the RegisterPage
    ComponentToShow = RegisterPage;
  }



  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...otherProps}
      component={ComponentToShow}
    />
  )
}

// Instead of taking everything from state, we just want the user and loginMode
// to determine which page we should show the user
const mapStateToProps = (state) => {
  return {
    user: state.user,
    loginMode: state.loginMode,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)


