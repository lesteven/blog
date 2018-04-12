import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import dash from '../dashRoutes';
import style from './dashboard.css';
import DashNav from './DashNav';
import { toggleDashSideNav } from '../../reduxModules/viewModule';

/*
  DashSideNav, view changes:  desktop vs mobile view.

  In desktop -> sidenav appears, no menu svg, side-wrap empty

  In mobile -> sidenav gone
            -> toggle for appearance,  width is 100%, 
            -> svg appears, side-wrap has color
*/

class DashSideNav extends Component {

  render() {
    const { path, view, toggle } = this.props;
    const { showDashSideNav } = view;

    const links = dash.routes.map (e => 
      <Link to = { `${path}${e.path}` } onClick = { toggle }
      key = { e.path }> { e.title } </Link>
    )
    return (
      <div className = 'side-nav-wrapper' 
        style = {{ display: showDashSideNav }}>
        <div className = 'side-nav' >
          <a className='dtn-sidemenu'> 
            <img src='/menu.svg' onClick = { toggle } /> 
          </a>
          <span className='user'> 
            hello
          </span>
          { links }
        </div>
        <div className = 'side-wrap' onClick = { toggle } 
          style = {{ display: showDashSideNav }}>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        view: state.view
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLinks: () => dispatch(toggleLinks()),
        toggle: () => dispatch(toggleDashSideNav()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashSideNav);
