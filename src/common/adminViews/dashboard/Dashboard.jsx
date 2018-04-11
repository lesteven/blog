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


class Dashboard extends Component {

  render() {
    const { path } = this.props.match;
    const links = dash.routes.map (e => 
      <Link to = { `${path}${e.path}` }  
      key = { e.path }> { e.title } </Link>
    )
    const reactRoutes = dash.routes.map (e =>
        <Route exact = { e.exact } path = { `${path}${e.path}` } 
            component = { e.component } key = { e.path} />
    )
    return (
      <div className = 'dashboard'>
        <div className = 'side-nav'>
          <span className='user'> 
            hello
          </span>
          { links }
        </div>

        <div className = 'dash-view'>
          <DashNav />
          <Switch>
              { reactRoutes }
          </Switch>
        </div>

      </div>
    )
  }
}

export default Dashboard;
