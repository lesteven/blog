import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './admin.css';
import Register from './Register';
import Login from './Login';
import { delayAC } from '../../reduxModules/delayModule';

class Admin extends Component {
  componentDidMount = () => {
    setTimeout(this.props.delayAC, 50);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth != this.props.auth) {
      console.log('received props', nextProps);
    }
  }
  renderPage = () => {
    const { auth, delay } = this.props;
    return (
      auth.lstatus.user?
        <p> you have loggin in </p>: 
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
  return {
    auth: state.authReducer,
    delay: state.delay,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delayAC: () => dispatch(delayAC()),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin);
