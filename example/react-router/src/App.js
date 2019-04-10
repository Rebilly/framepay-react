import React, { Component } from 'react';
import { BrowserRouter as Router, IndexLink, NavLink, Route } from 'react-router-dom';
import { FramePayProvider } from '../../../build';

import './App.css';
import './examples.css';

import * as elements from './elements';

const pkg = require('../../../package');

const routes = [
    {
        title: 'Bank Account',
        path: 'bank-account',
        Component: elements.BankAccount,
        props: {
            link: `${pkg.repository}/master/example/react-router/src/elements/BankAccount.js`
        }
    },
    {
        title: 'Payment Card',
        path: 'payment-card',
        Component: elements.PaymentCard,
        props: {
            link: `${pkg.repository}blob/master/example/react-router/src/elements/PaymentCard.js`
        }
    },
    {
        title: 'Payment Card Separated',
        path: 'payment-card-separated',
        Component: elements.PaymentCardSeparated,
        props: {
            link: `${pkg.repository}/blob/master/example/react-router/src/elements/PaymentCardSeparated.js`
        }
    },
    {
        title: 'Multiple Payment Methods',
        path: 'multiple-payment-methods',
        Component: elements.MultiplePaymentMethods,
        props: {
            link: `${pkg.repository}/blob/master/example/react-router/src/elements/MultiplePaymentMethods.js`
        }
    },
    {
        title: 'Other Payment Methods',
        path: 'other-payment-methods',
        Component: elements.OtherPaymentMethods,
        props: {
            link: `${pkg.repository}/blob/master/example/react-router/src/elements/OtherPaymentMethods.js`
        }
    },
    {
        title: 'Methods and Events',
        path: 'methods-and-events',
        Component: elements.MethodsAndEvents,
        props: {
            link: `${pkg.repository}/blob/master/example/react-router/src/elements/MethodsAndEvents.js`
        }
    }
];

const MainRoute = routes.find(r => r.path === 'payment-card');

class App extends Component {
    render() {
        return (
            // Don't forget to add the FramePayProvider
            <FramePayProvider injectStyle publishableKey="pk_sandbox_c6cqKLddciVikuBOjhcng-rLccTz70NT4W_qZ_h">
                <Router>
                    <header className="navbar">
                        <div className="sidebar-button">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512"
                                 className="icon">

                            </svg>
                        </div>
                        <a target="_blank" href="https://github.com/Rebilly/framepay-react"
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
                                            <li key={`link-${route.path}`}>
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
                            <Route path="/" exact component={MainRoute.Component}/>
                            {routes.map((route) => <Route
                                key={`route-${route.path}`}
                                path={`/${route.path}`}
                                render={(props) => <route.Component {...props}
                                                                    {...route.props}
                                                                    title={route.title}
                                                                    exact={true}/>}/>)
                            }
                        </div>
                    </div>
                </Router>
            </FramePayProvider>
        );
    }
}

export default App;
