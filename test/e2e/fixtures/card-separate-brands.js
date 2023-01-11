import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FramePayProvider, SUPPORTED_CARD_BRANDS, withFramePayCardComponent } from '../../../build';
import { deepMerge, prettyDebugRender, ReactVersion } from './util';
import './style.css';

console.log('SUPPORTED_CARD_BRANDS', SUPPORTED_CARD_BRANDS);

const params = {
    publishableKey: 'pk_sandbox_c6cqKLddciVikuBOjhcng-rLccTz70NT4W_qZ_h',
    icon: {
        display: true,
        color: 'blue'
    },
    card: {
        brands: {
            allowed: [
                SUPPORTED_CARD_BRANDS.MasterCard,
                SUPPORTED_CARD_BRANDS.Amex
            ]
        }
    }
};

console.log('params', params);

class CardElementComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            button: null,
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
                country: 'GB',
                region: 'region-value'
            },
            token: {
                error: null,
                data: null
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdateSettings = this.handleUpdateSettings.bind(this);
        this.handleRestoreSettings = this.handleRestoreSettings.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        /**
         *
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-createtoken
         *
         */
        const billingAddress = {
            ...this.state.billingAddress
        };
        if (billingAddress.emails) {
            billingAddress.emails = [
                {
                    label: 'Email',
                    value: billingAddress.emails
                }
            ];
        }
        if (billingAddress.phoneNumbers) {
            billingAddress.phoneNumbers = [
                {
                    label: 'Phone Number',
                    value: billingAddress.phoneNumbers
                }
            ];
        }

        this.props.Rebilly.createToken(this.formNode, { billingAddress })
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

    handleUpdateSettings() {
        this.setState({ button: 'update' });
        this.props.Rebilly.update({
            ...params,
            card: { brands: { allowed: null } }
        });
    }

    handleRestoreSettings() {
        this.setState({ button: 'restore' });
        this.props.Rebilly.update({
            ...params
        });
    }

    render() {
        return (<div>
            <h2>{this.props.title}</h2>
            <h3>FramePay version: {this.props.Rebilly.version}</h3>
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
                                    defaultValue={this.state.billingAddress.emails}
                                    onChange={e => {
                                        this.deepUpdateState({ billingAddress: { emails: e.target.value } });
                                    }}/>
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    defaultValue={this.state.billingAddress.phoneNumbers}
                                    onChange={e => {
                                        this.deepUpdateState({ billingAddress: { phoneNumbers: e.target.value } });
                                    }}/>
                            </div>
                            <div className="field">
                                <label htmlFor="card">Card Number</label>
                                <this.props.CardNumberElement
                                    id="card"
                                    onReady={() => this.deepUpdateState({ events: { number: { onReady: true } } })}
                                    onChange={(data) => this.deepUpdateState({
                                        events: {
                                            number: {
                                                onChange: {
                                                    ...data,
                                                    error: data.error || ''
                                                }
                                            }
                                        }
                                    })}
                                    onFocus={() => this.deepUpdateState({ events: { number: { onFocus: true } } })}
                                    onBlur={() => this.deepUpdateState({ events: { number: { onBlur: true } } })}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="cvv">Card CVV</label>
                                <this.props.CardCvvElement
                                    id="cvv"
                                    onReady={() => this.deepUpdateState({ events: { cvv: { onReady: true } } })}
                                    onChange={(data) => this.deepUpdateState({
                                        events: {
                                            cvv: {
                                                onChange: {
                                                    ...data,
                                                    error: data.error || ''
                                                }
                                            }
                                        }
                                    })}
                                    onFocus={() => this.deepUpdateState({ events: { cvv: { onFocus: true } } })}
                                    onBlur={() => this.deepUpdateState({ events: { cvv: { onBlur: true } } })}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="expiry">Card expiry</label>
                                <this.props.CardExpiryElement
                                    id="expiry"
                                    onReady={() => this.deepUpdateState({ events: { expiry: { onReady: true } } })}
                                    onChange={(data) => this.deepUpdateState({
                                        events: {
                                            expiry: {
                                                onChange: {
                                                    ...data,
                                                    error: data.error || ''
                                                }
                                            }
                                        }
                                    })}
                                    onFocus={() => this.deepUpdateState({ events: { expiry: { onFocus: true } } })}
                                    onBlur={() => this.deepUpdateState({ events: { expiry: { onBlur: true } } })}
                                />
                            </div>
                        </fieldset>
                        <button id="submit">Make Payment</button>
                    </form>

                    <button id="btn-update" onClick={this.handleUpdateSettings}>Update</button>
                    <button id="btn-restore" onClick={this.handleRestoreSettings}>Restore</button>
                </div>
            </div>
        </div>);
    }
}

const CardElement = withFramePayCardComponent(CardElementComponent);

class App extends Component {

    render() {
        return (<FramePayProvider injectStyle {...params}>
            <div>
                {ReactVersion()}
                <CardElement/>
            </div>
        </FramePayProvider>);
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
