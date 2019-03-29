import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { FramePayProvider } from 'framepay-react';

import './App.css';

import Guide from './Guide';
import CheckoutBank from './checkout-bank/Page';
import CheckoutCombined from './checkout-combined/Page';
import CheckoutMultiple from './checkout-multiple/Page';
import CheckoutSeparate from './checkout-separate/Page';


const params = {
  injectScript: true,
  injectStyle: true,
  config: {
    publishableKey: 'pk_live_PB0BfcVUrp1-0WVzuCKCf-6TnnJ64H0ngd-1AVq\n',
    style: {
      base: {
        color: 'green',
        fontSize: '12px',
        webkitFontSmoothing: 'auto',
        fontFeatureSettings: 'test',
        fontStyle: 'italic',
        fontVariant: 'normal',
        fontStretch: 'none',
        fontSomething: 'not-included',
        fontOtherThing: 'not-included',
        lineHeight: '20px',
      },
      invalid: {
        fontWeight: 'bold',
      },
    },
    classes: {
      base: 'rebilly-framepay',
      focus: 'rebilly-framepay-focus',
      valid: 'rebilly-framepay-valid',
      invalid: 'rebilly-framepay-invalid',
      buttons: 'rebilly-framepay-buttons',
      webkitAutofill: 'rebilly-framepay-webkit-autofill',
    },
    icon: {
      foobar: 123,
      display: true,
      color: 'blue',
    },
  },
};

class App extends Component {
  render() {
    return (
      // Don't forget to add the FramePayProvider
      <FramePayProvider {...params}>
        <div className="App">
          <Router>
            <Route path="/" exact component={Guide}/>
            <Route path="/guide/" exact component={Guide}/>
            <Route path="/checkout-bank/" component={CheckoutBank}/>
            <Route path="/checkout-combined/" component={CheckoutCombined}/>
            <Route path="/checkout-multiple/" component={CheckoutMultiple}/>
            <Route path="/checkout-separate/" component={CheckoutSeparate}/>
          </Router>
        </div>
      </FramePayProvider>
    );
  }
}

export default App;
