import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './admin.css';
import Register from './Register';
import Login from './Login';


class Admin extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth != this.props.auth) {
      console.log('received props', nextProps);
    }
  }
  render (){
    const { auth } = this.props;
    return (
      <Fragment>
          { auth.lstatus.user?
           'you have logged in':
          <Fragment>
          <Login />
          <Register /> 
          </Fragment>
          }             
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
  }
}



export default connect(mapStateToProps)(Admin);
