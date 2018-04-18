import { StaticRouter as Router, matchPath } from 'react-router';
import topLevel from '../../common/routes';
import dashLevel from '../../common/adminViews/dashRoutes';
import clientLevel from '../../common/views/navRoutes';


const getPath = (req, path) => {
  return matchPath(req.url, { path, exact:true, strict: false });
}

const getArr = (req) => {
    let urlArr = req.url.split('/');
    return urlArr.filter( word => word.length > 1);
}

const getComponent = (req) => {
    const urlArr = getArr(req);
    console.log('** req',req.url, urlArr, urlArr.length);


    // react router setup
    let wrapper = {};
    let foundPath = null;

    // grab path that matches with req.url along with component
    // check top level router

    let { path, component } = topLevel.routes.find(({ prefix, path }) => {
      let compURL = prefix + path;
      console.log('compURL', compURL);
      foundPath = getPath(req, compURL);       

      return foundPath;
    }) || {};

    console.log('foundPath', foundPath);

    // if path not found in upper level, look at lower levels

    if (!foundPath) {
      let url = urlArr[0];
      switch (url) {
        case 'dashboard':
          console.log('**from dashbaord');
          break;
        default:
          console.log('** from home');
      }
    }


    // check for react component and fetch data
    if (!component) {
      component = {};
    }
    if (!component.fetchData) {
      component.fetchData = () => new Promise(resolve => resolve());
    }

    wrapper.foundPath = foundPath;
    wrapper.component = component;

    return wrapper;
}

export default getComponent;
