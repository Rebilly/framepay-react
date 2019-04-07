import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FramePayProvider, withFramePayCardComponent } from '../../../build/package';
import { deepMerge, prettyDebugRender } from './util';
import './style.css';

const params = {
    injectScript: true,
    injectStyle: true,
    settings: {
        publishableKey: 'pk_sandbox_1234567890',
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

class CardElementComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: {
                number: {
                    onReady: null,
                    onChange: null,
                    onFocus: null,
                    onBlur: null
                },
                cvv: {
                    onReady: null,
                    onChange: null,
                    onFocus: null,
                    onBlur: null
                },
                expiry: {
                    onReady: null,
                    onChange: null,
                    onFocus: null,
                    onBlur: null
                }
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
        this.setState(deepMerge(this.state, data));
    }

    render() {
        return (<div>
            <h2>{this.props.title}</h2>
            <div className="flex-wrapper">
                {prettyDebugRender(this.state)}
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
                            <div className="field">
                                <this.props.CardNumberElement
                                    onReady={() => this.deepUpdateState({ events: { number: { onReady: true } } })}
                                    onChange={(data) => this.deepUpdateState({ events: { number: { onChange: data } } })}
                                    onFocus={() => this.deepUpdateState({ events: { number: { onFocus: true } } })}
                                    onBlur={() => this.deepUpdateState({ events: { number: { onBlur: true } } })}
                                />
                            </div>

                            <div className="field">
                                <this.props.CardCvvElement
                                    onReady={() => this.deepUpdateState({ events: { cvv: { onReady: true } } })}
                                    onChange={(data) => this.deepUpdateState({ events: { cvv: { onChange: data } } })}
                                    onFocus={() => this.deepUpdateState({ events: { cvv: { onFocus: true } } })}
                                    onBlur={() => this.deepUpdateState({ events: { cvv: { onBlur: true } } })}
                                />
                            </div>

                            <div className="field">
                                <this.props.CardExpiryElement
                                    onReady={() => this.deepUpdateState({ events: { expiry: { onReady: true } } })}
                                    onChange={(data) => this.deepUpdateState({ events: { expiry: { onChange: data } } })}
                                    onFocus={() => this.deepUpdateState({ events: { expiry: { onFocus: true } } })}
                                    onBlur={() => this.deepUpdateState({ events: { expiry: { onBlur: true } } })}
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

const CardElement = withFramePayCardComponent(CardElementComponent);

class App extends Component {

    render() {
        return (<FramePayProvider {...params}>
            <div>
                <CardElement/>
            </div>
        </FramePayProvider>);
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
