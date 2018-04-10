import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './admin.css';
import Register from './Register';
import Login from './Login';
import { delayAC } from '../../reduxModules/delayModule';
import Logout from './Logout';

class Admin extends Component {
  componentDidMount = () => {
    // delay used to prevent multiple renders
    setTimeout(this.props.delayAC, 10);
  }
  adminForm = () => {
    const { auth, delay } = this.props;
    // if user logged in -> show logout, else show login/register
    return (
      auth.lstatus.user?
          <Logout /> :
          <Fragment>
            <Login />
            <Register /> 
          </Fragment>
    )
  }
  render (){
    const { auth, delay } = this.props;
    // delay always false initially, bc admin page accessed only thru url
    // delay = false -> timeout set delay = true -> render based on user status
    return (
      <Fragment>
          { delay.render? this.adminForm():<div></div> }             
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { delay, auth } = state;
  return {
    auth,
    delay,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delayAC: () => dispatch(delayAC()),
    
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin);
