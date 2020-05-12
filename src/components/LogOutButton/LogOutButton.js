import React from 'react';
import { connect } from 'react-redux';
import Button from 'muicss/lib/react/button';

const LogOutButton = props => (
  <Button
    className="nav-right"
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
  >
    Log Out
  </Button>
);

export default connect()(LogOutButton);
