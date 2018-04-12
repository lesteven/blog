import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Switch } from 'react-router-dom';
import { fetchData } from '../../reduxModules/fetchThunk';
import { loginAction } from '../../reduxModules/authModule';


class DashNav extends Component {
  logout = () => {
    this.props.fetchData('/api/auth/logout',this.props.loginAction)
  }

  render() {
    return (
      <nav className = 'dash-topnav'>
        <Link to = '/'> Home </Link>
        <Link to = '/admin' onClick = { this.logout }> Log Out </Link>
      </nav> 
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
export default connect(mapStateToProps, mapDispatchToProps)(DashNav);
