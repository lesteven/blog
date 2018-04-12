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


/*
  contains:
    Dash side nav bar
    Dash top nav bar
    Switch routes
*/

class Dashboard extends Component {

  render() {
    const { path } = this.props.match;
    const reactRoutes = dash.routes.map (e =>
        <Route exact = { e.exact } path = { `${path}${e.path}` } 
            component = { e.component } key = { e.path} />
    )
    return (
      <div className = 'dashboard'>
        <DashSideNav path = { path }/>

        <div className = 'dash-view'>
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

export default Dashboard;
