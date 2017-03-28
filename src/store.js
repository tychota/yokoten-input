// import the store creator, and utils function from redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import the reducer that redux-form gives
import { reducer as formReducer } from 'redux-form';
// import a logger to display the action send through redux in dev mode
import { createLogger } from 'redux-logger';

// create a log that log only if dev mode, and debugger is open
const logger = createLogger({
  predicate: () => !!(__DEV__ && Boolean(window.navigator.userAgent)),
});

// create the reducer structure
const reducers = {
  form: formReducer,
};

// combine the reducer so store->form part of the store is handlex by redux form and contains value and metadata about the form
const reducer = combineReducers(reducers);
// create the store
const store = createStore(reducer, applyMiddleware(logger));

// export it
export default store;
