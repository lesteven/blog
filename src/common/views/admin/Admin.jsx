import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './admin.css';
import Register from './Register';
import Login from './Login';
import { delayAC } from '../../reduxModules/delayModule';
import Logout from './Logout';

class Admin extends Component {
  delayRender = () => {
    const { delayAC } = this.props;
    delayAC('renderAdmin');
  }
  componentDidMount = () => {
    // delay used to prevent multiple renders
    setTimeout(this.delayRender, 10);
  }
  componentWillReceiveProps = (nextProps) => {
    const { auth } = nextProps;
    if(auth.lstatus.redirect !== this.props.auth.lstatus.redirect) {
        auth.lstatus.redirect == true? this.goToDash() : null;
    }
  }
  goToDash = () => {
    // console.log(this.props.history)
    this.props.history.push('/dashboard');
  }
  adminForm = () => {
    const { auth, delay } = this.props;
    // if user logged in -> show logout, else show login/register
    return (
      auth.lstatus.user?
          <Logout goToDash = { this.goToDash }/> :
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
      <div className='max-width view'>
          { delay.renderAdmin? this.adminForm():<div></div> }             
      </div>
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
    delayAC: (value) => dispatch(delayAC(value)),
    
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Admin);
