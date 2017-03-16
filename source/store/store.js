import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
    const createLogger = require(`redux-logger`);
    const logger = createLogger();
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
