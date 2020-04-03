import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import thunk from "redux-thunk";
import reducer from "./reducers";
import NewsListSaga from './sagas/NewsListSaga';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = preloadedState =>{
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(NewsListSaga);
  return store;
}
  
export default configureStore;
