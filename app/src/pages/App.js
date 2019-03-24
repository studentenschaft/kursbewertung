import React, { Component } from 'react';
import './App.css';
import ViewRating from './ViewRating'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="row">
          <div className="col-lg-4">
            <p> Hello World </p>
            </div>
        </div>
        <ViewRating />
      </div>
    );
  }
}

export default App;
