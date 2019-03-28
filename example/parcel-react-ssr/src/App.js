import React, { Component } from 'react';
// import './App.css';
import { FramePayProvider } from 'framepay-react';
import Card from './Card';
import settings from './settings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FramePayProvider
          publishableKey="pk_live_PB0BfcVUrp1-0WVzuCKCf-6TnnJ64H0ngd-1AVq" {...settings}>
          <header className="App-header">
            <h1>Framepay ReactJS example</h1>
            <hr/>
            <Card/>
          </header>
        </FramePayProvider>
      </div>
    );
  }
}

export default App;
