import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter as Router, matchPath } from 'react-router';
import App from '../../common/App';
import routeOptions from '../../common/routes';
import navRoutes from '../../common/views/navRoutes';
import configureStore from '../../common/configureStore';


// create html and inject redux data into it
function renderFullPage(html, preloadedState) {
  return `
        <!DOCTYPE html>
        <html lang = "en">
            <head>
                <meta name="viewport" 
                    content="width=device-width, initial-scale=1">
                <meta charset = "UTF-8">
                <link rel="icon" href="data:;base64,iVBORwOKGO=" />
                <link rel='stylesheet' href="/styles.css"/>
            </head>
            <body>
                <div id="root">${html}</div>
                <script>
                window.__PRELOADED_STATE__ = 
                    ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                </script>
                <script src="/client.bundle.js" ></script>
            </body>
        </html>
    `;
}


async function getData(req, res) { 
    // create store
    const store = configureStore();

    // react router setup
    let foundPath = null;


    // grab path that matches with req.url along with component
    let { path, component } = routeOptions.routes.find(({ path, exact }) => {
      foundPath = matchPath(req.url, { 
                                        path, 
                                        exact:true, 
                                        strict: false 
                                      });
      return foundPath;
    }) || {};

    let foundPath2 = null;
    let test = null;
    if (!foundPath) {
      test  = navRoutes.routes.find(({ path, exact }) => {
         foundPath2 = matchPath(req.url, { 
                                            path, 
                                            exact:true, 
                                            strict: false 
                                          });
        console.log('inside', foundPath2);
        return foundPath2;
      }) || {};
      console.log('inside test', test);
    }
  
    console.log(req.url);
    console.log('fp2', foundPath2)
    console.log('test', test);
    console.log('path2', foundPath2.component);
    console.log('comp2', foundPath2.path);

    // check for react component and fetch data
    if (!component) {
      component = {};
    }
    if (!component.fetchData) {
      console.log('no fetches*****');
      component.fetchData = () => new Promise(resolve => resolve());
    }
   

    console.log('path ->', path);
    console.log('component ->', component);
    console.log('foundpath ->', foundPath)

  

 
    const fullUrl = req.protocol + '://' + req.get('host');

    await component.fetchData({ store, params: (foundPath? foundPath.params :
      {}) }, fullUrl)

    let preloadedState = store.getState();
    let context = {};


    // render component to string
    const html = renderToString(
    <Provider store={store}>
      <Router context={context} location={req.url}>
        <App />
      </Router>
    </Provider>);


    // send to client
    res.send(renderFullPage(html, preloadedState));
}

function handleRender(req, res) {
  try {
    getData(req, res);
  }
  catch(e) {
    res.send('there was an error');
  }
}    

export { handleRender, renderFullPage };
