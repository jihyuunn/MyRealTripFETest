import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import {HotelMain, HotelList} from './pages'

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={HotelMain} />
      <Route path="/hotels" component={HotelList} />
    </div>
  );
}

export default App;
