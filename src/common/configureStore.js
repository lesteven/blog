import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { view } from './reduxModules/viewModule';
import { authReducer as auth } from './reduxModules/authModule';
import { delayReducer as delay } from './reduxModules/delayModule';
import { postBlog } from './reduxModules/postBlogModule';
import { editor } from './reduxModules/editorModule';
import { upload } from './reduxModules/uploadModule';


export const reducers = combineReducers({
  view,
  auth,
  delay,
  postBlog,
  editor,
  upload,

});


export default function configureStore(preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      typeof window !== 'undefined' &&
                window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
}
