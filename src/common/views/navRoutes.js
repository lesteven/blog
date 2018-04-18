import Home from './home/Home';
import About from './about/About';
import Blog from './blog/Blog';


const navRoutes = {

  routes: [
    {
      path: '/', 
      component: Home, 
      exact: true, 
      title: 'Home', 
    },

    {
      path: '/about', 
      component: About, 
      exact: true, 
      title: 'About', 
    },

    {
      path: '/blog', 
      component: Blog, 
      exact: true, 
      title: 'Blog', 
    },
    
  ],

};

export default navRoutes;
