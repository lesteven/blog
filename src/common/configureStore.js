import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { view } from './reduxModules/viewModule';
import { authReducer } from './reduxModules/authModule';


const reducers = combineReducers({
  view,
  authReducer,
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
