import React, { Component } from 'react';
import { BrowserRouter as Router, IndexLink, NavLink, Route } from 'react-router-dom';

import { FramePayProvider } from '../../../build';

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

const routeComponents = routes.map((route) => <Route
    key={`route-${route.name}`}
    path={`/${route.path}`}
    render={(props) => <route.Component {...props} title={route.title} exact={true}/>}
/>);

class App extends Component {
    render() {
        return (
            // Don't forget to add the FramePayProvider
            <FramePayProvider injectStyle publishableKey="pk_sandbox_1234567890">
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
