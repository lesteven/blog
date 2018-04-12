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


class DashSideNav extends Component {

  render() {
    const { path, view } = this.props;
    const { showDashSideNav } = view;

    const links = dash.routes.map (e => 
      <Link to = { `${path}${e.path}` }  
      key = { e.path }> { e.title } </Link>
    )
    return (
      <div className = 'side-nav' style = {{ display: showDashSideNav }}>
        <span className='user'> 
          hello
        </span>
        { links }
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
        toggleLinks: () => dispatch(toggleLinks())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashSideNav);
