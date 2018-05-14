import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../navBar/NavBar.jsx';
import nav from '../navRoutes.js';

class ClientTemplate extends Component {
  reactRoutes = () => {
    return nav.routes.map (e =>
      <Route exact = { e.exact } path = { e.path } 
          component = { e.component } key = { e.path} />
  )
  } 
  render() {
    return (
      <Fragment>
        <NavBar />
        <div className='max-width view'>
          <Switch>
              { this.reactRoutes() }
          </Switch>
        </div>
      </Fragment>
    )
  }
}

export default ClientTemplate;
