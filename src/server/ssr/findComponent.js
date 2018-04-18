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

const iterateRoutes = (req, level) => {
    let foundPath = null;
    let foundComponent = level.routes.find(({ prefix, path }) => {
      let compURL = prefix + path;
//      console.log('compURL', compURL);
      foundPath = getPath(req, compURL);       

      return foundPath;
    }) || {};
    foundComponent.foundPath = foundPath;
    return foundComponent;
}

const getComponent = (req) => {
    const urlArr = getArr(req);
    console.log('** req',req.url, urlArr, urlArr.length);


    // react router setup
    let wrapper = {};

    // grab path that matches with req.url along with component
    // check top level router

    let { path, component, foundPath } = iterateRoutes(req,topLevel);

    console.log('~ path: ', path);
    console.log('~ component: ', component);
    console.log('~ foundPath: ', foundPath);

    // if path not found in upper level, look at lower levels

    let comp2 = null;

    if (!foundPath) {
      let url = urlArr[0];
      switch (url) {
        case 'dashboard':
          comp2 = iterateRoutes(req,dashLevel);
          console.log('**from dashbaord');
          break;
        default:
          comp2 = iterateRoutes(req,clientLevel);
          console.log('** from home');
      }
    }
    if (comp2) {
      console.log('comp2!');
      console.log(comp2);
      component = comp2.component;
      path = comp2.path;
      foundPath = comp2.path;
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
