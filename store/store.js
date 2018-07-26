import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as AsyncStorageAPI from '../utils/api';

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(logger, thunk.withExtraArgument(AsyncStorageAPI))
  )
)
