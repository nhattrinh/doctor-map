import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import firebase from 'firebase';

// redux
import reducers from './redux/reducers';

// config files
import { MAPS_API_KEY, FIREBASE_CONFIG } from './config';

import './App.css';

class App extends Component {
  componentDidMount() {
    firebase.intializeApp(FIREBASE_CONFIG);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>

      </Provider>
    );
  }
}

export default App;
