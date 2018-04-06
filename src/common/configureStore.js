import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { view } from './reduxModules/viewModule';
import { authReducer as auth } from './reduxModules/authModule';
import { delayReducer as delay } from './reduxModules/delayModule';


export const reducers = combineReducers({
  view,
  auth,
  delay,
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
