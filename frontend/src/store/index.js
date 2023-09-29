import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import sessionReducer from './session';
import trailReducer from './trail';
import reviewsReducer from './review';
import searchReducer from './search';

const rootReducer = combineReducers({
    users: userReducer,
    session:sessionReducer,
    trails: trailReducer,
    reviews: reviewsReducer,
    search: searchReducer

});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;