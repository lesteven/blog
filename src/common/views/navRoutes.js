import Home from './home/Home';
import About from './about/About';
import Blog from './blog/Blog';


const prefix = '';

const navRoutes = {

  routes: [
    {
      prefix,
      path: '/', 
      component: Home, 
      exact: true, 
      title: 'Home', 
    },

    {
      prefix,
      path: '/about', 
      component: About, 
      exact: true, 
      title: 'About', 
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

export default navRoutes;
