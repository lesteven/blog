import DashHome from './dashhome/DashHome';
import Blog from './blog/Blog';

const prefix = '/dashboard';

const dashRoutes = {

  routes: [
    {
      prefix,
      path: '/', 
      component: DashHome, 
      exact: true, 
      title: 'Dash Home', 
    },

    {
      prefix,
      path: '/blog', 
      component: Blog, 
      exact: true, 
      title: 'Blog', 
    },
  ],

};

export default dashRoutes;
