/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import ObjectDetection from './views/Portal/ObjectDetection'

function App() {
  return (
    <Container fluid style={{ 'background-color': '#eeeeee' }}>
      <Switch>
        <Route exact path="/detect" component={ObjectDetection} />
      </Switch>
    </Container>
  );
}

export default App;
