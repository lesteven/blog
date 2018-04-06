import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../reduxModules/fetchThunk';
import { loginAction } from '../../reduxModules/authModule';



class Logout extends Component {
  logout = () => {
      this.props.fetchData('/api/auth/logout',this.props.loginAction)
  }
  render() {
    let { auth } = this.props;
    return(
      <Fragment>
        <button onClick={this.logout}> Logout </button>
        <div className='white-space'></div>
        <button  onClick={this.goHome}> Go To Dashboard</button>
      </Fragment>
    )
  }

}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url, cb) => dispatch(fetchData(url, cb)),
        loginAction: (lstatus) => dispatch(loginAction(lstatus)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
