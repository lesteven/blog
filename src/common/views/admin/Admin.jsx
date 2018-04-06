import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './admin.css';
import Register from './Register';
import Login from './Login';
import { delayAC } from '../../reduxModules/delayModule';
import Logout from './Logout';

class Admin extends Component {
  componentDidMount = () => {
    setTimeout(this.props.delayAC, 10);
  }
  renderPage = () => {
    const { auth, delay } = this.props;
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
    return (
      <Fragment>
          { delay.render?
           this.renderPage():<div></div>
          }             
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
