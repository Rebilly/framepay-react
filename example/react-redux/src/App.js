import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';

import { FramePayProvider, withFramePayCardComponent } from './../../../build';

import DevTools from './DevTools';
import * as actions from './actions';

import configureStore from './configureStore';

const store = configureStore();

class CardElementComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onReady: null,
            onChange: null,
            onFocus: null,
            onBlur: null,
            firstName: 'first-name-value',
            lastName: 'last-name-value',
            country: 'GB'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        /**
         *
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-createtoken
         *
         */
        const {
            firstName,
            lastName,
            country
        } = this.state;

        this.props.Rebilly.createToken(
            this.formNode,
            {
                billingAddress: {
                    firstName,
                    lastName,
                    country
                }
            }
        )
            .then(data => {
                alert(JSON.stringify(data, null, 2));
            })
            .catch(err => {
                alert(JSON.stringify(err, null, 2));
            });
    }

    render() {
        console.log('this.props', this.props);
        console.log('this.state', this.state);
        return (<div>
            <h2>React with Redux example</h2>
            <div>
                <div className="example-2">
                    <form id="form" ref={node => this.formNode = node} method="post" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="field">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    defaultValue={this.state.firstName}
                                    onChange={e => {
                                        this.setState({ firstName: e.target.value });
                                    }}/>
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    defaultValue={this.state.lastName}
                                    onChange={e => {
                                        this.setState({ lastName: e.target.value });
                                    }}/>
                            </div>
                            <div>
                                <h2>Incremented value: {this.props.increments.increment}</h2>
                            </div>
                            <div className="field">
                                <this.props.CardElement
                                    onReady={() => this.setState({ onReady: true })}
                                    onChange={(data) => this.setState({ onChange: data })}
                                    onFocus={() => this.setState({ onReady: true })}
                                    onBlur={() => this.setState({ onReady: true })}
                                />
                            </div>
                        </fieldset>
                        <button onClick={(e) => {
                            e.preventDefault();
                            this.props.increment();
                        }}>increment action
                        </button>
                        <button id="submit">Make Payment</button>
                    </form>
                </div>
            </div>
        </div>);
    }
}

const CardElement = connect(
    (state) => ({ ...state }),
    (dispatch) => ({
        increment: () => dispatch(actions.increment())
    })
)(withFramePayCardComponent(CardElementComponent));

export default class App extends Component {

    render() {
        return (<Provider store={store}>
            <FramePayProvider injectStyle publishableKey="pk_sandbox_c6cqKLddciVikuBOjhcng-rLccTz70NT4W_qZ_h">
                <div>
                    <CardElement/>
                    <DevTools/>
                </div>
            </FramePayProvider>
        </Provider>);
    }
}
