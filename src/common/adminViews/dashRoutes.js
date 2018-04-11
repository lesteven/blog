import DashHome from './dashhome/DashHome';
import Blog from './blog/Blog';


const dashRoutes = {

  routes: [
    {
      path: '/', 
      component: DashHome, 
      exact: true, 
      title: 'Dash Home', 
    },

    {
      path: '/blog', 
      component: Blog, 
      exact: true, 
      title: 'Blog', 
    },
  ],

};

export default dashRoutes;
