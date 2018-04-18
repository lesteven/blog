import ClientTemplate from './views/clientTemplate/ClientTemplate';
import Admin from './views/admin/Admin';
import Dashboard from './adminViews/dashboard/Dashboard';
import { Route, Link, Switch, withRouter } from 'react-router-dom';


const prefix = '';

const routes = {

  routes: [
    {
      prefix,
      path: '/dashboard',
      component: Dashboard,
      exact: false,
      title: 'Dashboard',
    },
    {
      prefix,
      path: '/admin',
      component: Admin,
      exact: true,
      title: 'Admin',
    },
    {
      prefix,
      path: '/', 
      component: ClientTemplate, 
      exact: false, 
      title: '/', 
    },
  ],


};

export default routes;
