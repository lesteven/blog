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
import DashSideNav from './DashSideNav';
import { scrollAC } from '../../reduxModules/scrollModule';

/*
  contains:
    Dash side nav bar
    Dash top nav bar
    Switch routes

  dash-wrapper
    gives all switch routes same css attributes

  scrolling
    only works on immediate parent of element
*/

class Dashboard extends Component {
  onScroll = (e) => {
    const { scrollAC } = this.props;
    let sHeight = e.target.scrollHeight;
    let sTop = e.target.scrollTop;
    let client = e.target.clientHeight;
    let diff = sHeight - sTop
    scrollAC(diff, client); 
  }

  render() {
    const { path } = this.props.match;
    const reactRoutes = dash.routes.map (e =>
        <Route exact = { e.exact } path = { `${path}${e.path}` } 
            component = { e.component } key = { e.path} />
    )
    return (
      <div className = 'dashboard'>
        <DashSideNav path = { path }/>

        <div className = 'dash-view' onScroll= { this.onScroll}>
          <DashNav />
          <div className = 'dash-wrapper'>
            <Switch>
                { reactRoutes }
            </Switch>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    scroll: state.scroll,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    scrollAC: (diff, client) => dispatch(scrollAC(diff,client)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
