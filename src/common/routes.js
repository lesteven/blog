import Home from './views/home/Home';
import About from './views/about/About';
import Admin from './views/admin/Admin';

const routes = {

  routes: [
    {
      path: '/', component: Home, exact: true, title: 'Home', show: true,
    },
    {
      path: '/about', component: About, exact: true, title: 'About', show: true,
    },
    {
      path: '/admin',
      component: Admin,
      exact: true,
      title: 'Admin',
      show: false,
    },
  ],


};

export default routes;
