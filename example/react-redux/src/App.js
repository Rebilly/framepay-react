import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';

import { FramePayProvider, withFramePayCardComponent } from './../../../build/package';
import { deepMerge, prettyDebugRender } from './util';
import './../../../test/e2e/fixtures/style.css';

import DevTools from './DevTools';
import * as actions from './actions';

import configureStore from './configureStore';

const store = configureStore();

const params = {
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
};

class CardElementComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: {
                onReady: null,
                onChange: null,
                onFocus: null,
                onBlur: null
            },
            billingAddress: {
                firstName: 'first-name-value',
                lastName: 'last-name-value',
                address: 'address-value',
                country: 'country-value',
                region: 'region-value'
            },
            token: {
                error: null,
                data: null
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log('CardElementComponent.constructor');
    }

    handleSubmit(e) {
        e.preventDefault();
        /**
         *
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-createtoken
         *
         */
        this.props.framePay.createToken(
            this.formNode,
            { billingAddress: this.state.billingAddress }
        )
            .then(data => {
                this.deepUpdateState({ token: { error: false, data } });
            })
            .catch(err => {
                this.deepUpdateState({ token: { error: true, data: err } });
            });
    }

    deepUpdateState(data) {
        this.setState({ ...deepMerge(this.state, data) });
    }

    componentWillMount() {
        console.log('componentWillMount hook');
    }

    componentDidMount() {
        console.log('componentDidMount hook');
    }

    render() {
        return (<div>
            <h2>React with Redux example</h2>
            <div className="flex-wrapper">
                <div>
                    <div>
                        <h2>Redux state:</h2>
                        <button onClick={() => this.props.increment1()}>increment1</button>
                        {prettyDebugRender(this.props.redux)}
                    </div>
                    <hr/>
                    <div>
                        <h2>Component state:</h2>
                        {prettyDebugRender(this.state)}
                    </div>
                </div>
                <div className="example-2">
                    <form id="form" ref={node => this.formNode = node} method="post" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="field">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    defaultValue={this.state.billingAddress.firstName}
                                    onChange={e => {
                                        this.deepUpdateState({ billingAddress: { firstName: e.target.value } });
                                    }}/>
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    defaultValue={this.state.billingAddress.lastName}
                                    onChange={e => {
                                        this.deepUpdateState({ billingAddress: { lastName: e.target.value } });
                                    }}/>
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={this.state.billingAddress.email}
                                    onChange={e => {
                                        this.deepUpdateState({ billingAddress: { email: e.target.value } });
                                    }}/>
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    defaultValue={this.state.billingAddress.phone}
                                    onChange={e => {
                                        this.deepUpdateState({ billingAddress: { phone: e.target.value } });
                                    }}/>
                            </div>
                            <div>
                                <h2>Increment value: {this.props.redux.increments.increment_1}</h2>
                            </div>
                            <div className="field">
                                <this.props.CardElement
                                    onReady={() => this.deepUpdateState({ events: { onReady: true } })}
                                    onChange={(data) => this.deepUpdateState({ events: { onChange: data } })}
                                    onFocus={() => this.deepUpdateState({ events: { onReady: true } })}
                                    onBlur={() => this.deepUpdateState({ events: { onReady: true } })}
                                />
                            </div>
                        </fieldset>
                        <button id="submit">Make Payment</button>
                    </form>
                </div>
            </div>
        </div>);
    }
}

const CardElement = connect(
    (state) => {
        return { redux: { ...state } };
    },
    (dispatch) => ({
        increment1: () => dispatch(actions.increment1())
    })
)(withFramePayCardComponent(CardElementComponent));

export default class App extends Component {

    render() {
        return (<Provider store={store}>
            <FramePayProvider {...params}>
                <div>
                    <CardElement/>
                    <DevTools/>
                </div>
            </FramePayProvider>
        </Provider>);
    }
}
