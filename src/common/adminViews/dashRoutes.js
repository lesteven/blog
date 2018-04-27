import DashHome from './dashhome/DashHome';
import Blog from './blog/Blog';
import Upload from './upload/Upload';


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
    
    {
      prefix,
      path: '/upload', 
      component: Upload, 
      exact: true, 
      title: 'Upload', 
    }
  ],

};

export default dashRoutes;
