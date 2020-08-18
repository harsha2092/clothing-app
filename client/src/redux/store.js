import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const middlewares = [logger, thunk];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store)

export {
    store,
    persistor
};