import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
//import MUI CSS components
import Button from 'muicss/lib/react/button';

const Nav = (props) => (
  <div className="nav">
    <div className="header">
      <h2 className="nav-title">ThreadBare</h2>
    </div>
    <div className="nav-right">
      <Button>
        <Link to="/home">
          {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
          {props.user.id ? 'Search' : 'Login / Register'}
        </Link>
      </Button>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Button>
            <Link to="/add">
              Add a Retailer
          </Link>
          </Button>
          <LogOutButton className="nav-right" />
          <Button>
            <Link to="/admin">
              Admin
          </Link>
          </Button>
        </>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
