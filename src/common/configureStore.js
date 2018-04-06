import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { view } from './reduxModules/viewModule';
import { authReducer } from './reduxModules/authModule';
import { delayReducer as delay } from './reduxModules/delayModule';


export const reducers = combineReducers({
  view,
  authReducer,
  delay
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
