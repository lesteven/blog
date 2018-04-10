import ClientTemplate from './views/clientTemplate/ClientTemplate';
import Admin from './views/admin/Admin';
import Dashboard from './adminViews/dashboard/Dashboard';
import { Route, Link, Switch, withRouter } from 'react-router-dom';


const routes = {

  routes: [
    {
      path: '/dashboard',
      component: Dashboard,
      exact: true,
      title: 'Dashboard',
      show: false
    },
    {
      path: '/admin',
      component: Admin,
      exact: true,
      title: 'Admin',
      show: false,
    },
    {
      path: '/', 
      component: ClientTemplate, 
      exact: false, 
      title: '/', 
      show: false,
    },
  ],


};

export default routes;
