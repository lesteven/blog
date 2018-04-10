import ClientTemplate from './views/clientTemplate/ClientTemplate';
import Admin from './views/admin/Admin';
import Dashboard from './adminViews/dashboard/Dashboard';
import { Route, Link, Switch, withRouter } from 'react-router-dom';


const routes = {

  routes: [
    {
      path: '/dashboard',
      component: Dashboard,
      exact: false,
      title: 'Dashboard',
    },
    {
      path: '/admin',
      component: Admin,
      exact: true,
      title: 'Admin',
    },
    {
      path: '/', 
      component: ClientTemplate, 
      exact: false, 
      title: '/', 
    },
  ],


};

export default routes;
