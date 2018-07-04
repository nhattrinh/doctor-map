import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

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
      <Provider store={createStore(reducers)}>

      </Provider>
    );
  }
}

export default App;
