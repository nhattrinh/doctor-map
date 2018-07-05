import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Col, Row } from 'react-bootstrap';

import firebase from 'firebase';

// redux
import reducers from './redux/reducers';
import { SearchBar } from './components/SearchView';
import { MapContainer } from './components/MapView';

// config files
import { MAPS_API_KEY, FIREBASE_CONFIG } from './config';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Row>
          <Col s={12} m={4}><SearchBar /></Col>
          <Col s={12} m={8}><MapContainer /></Col>
        </Row>
      </Provider>
    );
  }
}

export default App;
