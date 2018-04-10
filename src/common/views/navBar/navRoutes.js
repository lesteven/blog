import Home from '../home/Home';
import About from '../about/About';


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
  ],

};

export default navRoutes;
