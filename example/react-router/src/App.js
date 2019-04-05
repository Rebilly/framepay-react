import React, { Component } from 'react';
import { BrowserRouter as Router, IndexLink, NavLink, Route } from 'react-router-dom';

import { FramePayProvider } from '../../../build/package';

import './App.css';
import './examples.css';

import * as elements from './elements';


const unCamelCase = (word) => {
  return word
  // insert a space between lower & upper
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // space before last upper in a sequence followed by lower
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    // uppercase the first character
    .replace(/^./, str => str.toUpperCase());
};

const routes = Object.keys(elements)
  .map((name) => {
    const title = unCamelCase(name);
    const path = title.split(' ')
      .map(s => s.toLowerCase())
      .join('-');
    return {
      Component: elements[name],
      name,
      title,
      path
    };
  });

console.log('routes', routes);

const routeComponents = routes.map((route) => <Route
  key={`route-${route.name}`}
  path={`/${route.path}`}
  render={(props) => <route.Component {...props} title={route.title} exact={true}/>}
/>);

const params = {
  injectScript: true,
  injectStyle: true,
  settings: {
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
        lineHeight: '20px'
      },
      invalid: {
        fontWeight: 'bold'
      }
    },
    classes: {
      base: 'rebilly-framepay',
      focus: 'rebilly-framepay-focus',
      valid: 'rebilly-framepay-valid',
      invalid: 'rebilly-framepay-invalid',
      buttons: 'rebilly-framepay-buttons',
      webkitAutofill: 'rebilly-framepay-webkit-autofill'
    },
    icon: {
      foobar: 123,
      display: true,
      color: 'blue'
    }
  }
};

class App extends Component {
  render() {
    return (
      // Don't forget to add the FramePayProvider
      <FramePayProvider {...params}>
        <Router>
          <header className="navbar">
            <div className="sidebar-button">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512"
                   className="icon">

              </svg>
            </div>
            <a target="_blank" href="https://rebilly.github.io/framepay-docs"
               className="home-link router-link-active">
              <span className="site-name">Rebilly FramePay</span>
            </a>
          </header>
          <div className="sidebar-mask"/>
          <div className="sidebar">
            <ul className="sidebar-links">
              <li>
                <div className="sidebar-group first">
                  <p className="sidebar-heading open">
                    ReactJS Examples
                  </p>
                  <ul className="sidebar-group-items">
                    {routes.map((route) =>
                      <li key={`link-${route.name}`}>
                        <NavLink
                          exact
                          className="sidebar-link"
                          activeClassName="active"
                          to={route.path}>{route.title}</NavLink>
                      </li>)}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="page">
            <div className="content">
              <Route path="/" exact component={routes.find(r => r.name === 'CardElement').Component}/>
              {routeComponents}
            </div>
          </div>
        </Router>
      </FramePayProvider>
    );
  }
}

export default App;
