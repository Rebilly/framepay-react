import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { FramePayProvider } from 'framepay-react';
import ConnectedParent from './ConnectedParentLevel-1';
import DevTools from './DevTools';

import configureStore from './configureStore';
import settings from './settings';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <FramePayProvider
            publishableKey="pk_live_PB0BfcVUrp1-0WVzuCKCf-6TnnJ64H0ngd-1AVq" {...settings}>
            <header className="App-header">
              <h1>Framepay ReactJS example</h1>
              <h3>Click <code>Ctrl+h</code> to open the devtools popup</h3>
              <hr/>
              <ConnectedParent/>
            </header>
          </FramePayProvider>
          <DevTools/>
        </div>
      </Provider>
    );
  }
}

export default App;
