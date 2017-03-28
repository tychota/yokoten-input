import Expo from 'expo';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

// import the store
import store from './src/store.js';
import App from './src/App.js';

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* and make it available in the whole tree context so connected component can access it */}
        <App />
      </Provider>
    );
  }
}

// register the main component to expo
Expo.registerRootComponent(Main);
