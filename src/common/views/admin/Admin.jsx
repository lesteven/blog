import React, { Component, Fragment } from 'react';
import styles from './admin.css';
import Register from './Register';
import Login from './Login';


class Admin extends Component {

  render (){
    return (
      <Fragment>
        <section>                
          <Login />
        </section>                
        <section>  
          <Register />              
        </section>                
      </Fragment>
    )
  }
}


export default Admin;
