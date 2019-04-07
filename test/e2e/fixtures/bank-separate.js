import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FramePayProvider, withFramePayBankComponent } from '../../../build/package';
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
                bankAccountType: {
                    onReady: null,
                    onChange: null,
                    onFocus: null,
                    onBlur: null
                },
                bankAccountNumber: {
                    onReady: null,
                    onChange: null,
                    onFocus: null,
                    onBlur: null
                },
                bankRoutingNumber: {
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
                                <this.props.BankAccountTypeElement
                                    onReady={() => this.deepUpdateState({ events: { bankAccountType: { onReady: true } } })}
                                    onChange={(data) => this.deepUpdateState({ events: { bankAccountType: { onChange: data } } })}
                                    onFocus={() => this.deepUpdateState({ events: { bankAccountType: { onFocus: true } } })}
                                    onBlur={() => this.deepUpdateState({ events: { bankAccountType: { onBlur: true } } })}
                                />
                            </div>

                            <div className="field">
                                <this.props.BankAccountNumberElement
                                    onReady={() => this.deepUpdateState({ events: { bankAccountNumber: { onReady: true } } })}
                                    onChange={(data) => this.deepUpdateState({ events: { bankAccountNumber: { onChange: data } } })}
                                    onFocus={() => this.deepUpdateState({ events: { bankAccountNumber: { onFocus: true } } })}
                                    onBlur={() => this.deepUpdateState({ events: { bankAccountNumber: { onBlur: true } } })}
                                />
                            </div>

                            <div className="field">
                                <this.props.BankRoutingNumberElement
                                    onReady={() => this.deepUpdateState({ events: { bankRoutingNumber: { onReady: true } } })}
                                    onChange={(data) => this.deepUpdateState({ events: { bankRoutingNumber: { onChange: data } } })}
                                    onFocus={() => this.deepUpdateState({ events: { bankRoutingNumber: { onFocus: true } } })}
                                    onBlur={() => this.deepUpdateState({ events: { bankRoutingNumber: { onBlur: true } } })}
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

const BankElement = withFramePayBankComponent(CardElementComponent);

class App extends Component {

    render() {
        return (<FramePayProvider {...params}>
            <div>
                <BankElement/>
            </div>
        </FramePayProvider>);
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));