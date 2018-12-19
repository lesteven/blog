import Home from './home/Home';
import About from './about/About';
import Blog from './blog/Blog';


const prefix = '';

const navRoutes = {

  routes: [
    {
      prefix,
      path: '/', 
      component: Blog, 
      exact: true, 
      title: 'Blog', 
    },
    {
      prefix,
      path: '/about', 
      component: About, 
      exact: true, 
      title: 'About', 
    },
    
  ],

};

export default navRoutes;
