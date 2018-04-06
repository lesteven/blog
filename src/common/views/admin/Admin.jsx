import React, { Component, Fragment } from 'react';
import styles from './admin.css';
import Register from './Register';
import Login from './Login';


class Admin extends Component {

  render (){
    return (
      <Fragment>
          <Login />
          <Register />              
      </Fragment>
    )
  }
}


export default Admin;
