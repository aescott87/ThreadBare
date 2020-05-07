import React, { Component, useReducer } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AdminPage from '../AdminPage/AdminPage';
import SearchPage from '../SearchPage/SearchPage';
import SearchResultPage from '../SearchResultPage/SearchResultPage';
import AddRetailerPage from '../AddRetailerPage/AddRetailerPage';
import AllRetailersPage from '../AllRetailersPage/AllRetailersPage';
import EditRequestPage from '../EditRequestPage/EditRequestPage';
import ConfirmationPage from '../ConfirmationPage/ConfirmationPage';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={SearchPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/result"
              component={SearchResultPage}
            />
            <ProtectedRoute
              exact
              path="/allretailers"
              component={AllRetailersPage}
            />
            <ProtectedRoute
              exact
              path="/edit"
              component={EditRequestPage}
            />
            <ProtectedRoute
              exact
              path="/add"
              component={AddRetailerPage}
            />
            <ProtectedRoute
              exact
              path="/confirmation"
              component={ConfirmationPage}
            />
            <ProtectedRoute
              exact
              path="/admin"
              component={AdminPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);
