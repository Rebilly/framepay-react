import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FramePayProvider, withFramePay } from '../../../build';
import { deepMerge, prettyDebugRender } from './util';
import './style.css';

const params = {
    publishableKey: 'pk_sandbox_c6cqKLddciVikuBOjhcng-rLccTz70NT4W_qZ_h'
};


const defaultEvents = () => ({
    card: {
        onReady: false,
        onChange: false,
        onFocus: false,
        onBlur: false
    },
    bankAccountType: {
        onReady: false,
        onChange: false,
        onFocus: false,
        onBlur: false
    },
    bankAccountNumber: {
        onReady: false,
        onChange: false,
        onFocus: false,
        onBlur: false
    },
    bankRoutingNumber: {
        onReady: false,
        onChange: false,
        onFocus: false,
        onBlur: false
    }
});

class PaymentFormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentMethod: 'payment-card',
            paymentMethods: [
                'payment-card',
                'ach'
            ],
            events: {
                ...defaultEvents()
            },
            billingAddress: {
                firstName: 'first-name-value',
                lastName: 'last-name-value',
                country: 'GB'
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
        this.props.Rebilly.createToken(
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
        this.setState(prevState => {
            return deepMerge(prevState, data);
        });
    }

    render() {
        return (<div>
            <h2>{this.props.title}</h2>
            <div className="flex-wrapper">
                {prettyDebugRender(this.state)}
                <div className="example-2">
                    <ul>
                        {this.state.paymentMethods.map(method => <li key={`payment-method-${method}`}>
                            <button
                                id={`set-active-method-${method}`}
                                onClick={
                                    () => {
                                        this.setState({
                                            paymentMethod: method,
                                            events: {
                                                ...defaultEvents()
                                            }
                                        });
                                    }}>
                                {method} -
                                isActive:{String(method === this.state.paymentMethod)}
                            </button>
                        </li>)}
                    </ul>
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
                            <hr/>
                            <div className="field" id="field-CardElement">
                                {this.state.paymentMethod === 'payment-card' &&
                                <this.props.CardElement
                                    onReady={() => this.deepUpdateState({ events: { card: { onReady: true } } })}
                                    onChange={(data) => this.deepUpdateState({ events: { card: { onChange: data } } })}
                                    onFocus={() => this.deepUpdateState({ events: { card: { onFocus: true } } })}
                                    onBlur={() => this.deepUpdateState({ events: { card: { onBlur: true } } })}
                                />}
                                {this.state.paymentMethod === 'ach' &&
                                <div>
                                    <div className="field" id="field-BankAccountTypeElement">
                                        <label>Account Type</label>
                                        <this.props.BankAccountTypeElement
                                            onReady={() => this.deepUpdateState({ events: { bankAccountType: { onReady: true } } })}
                                            onChange={(data) => this.deepUpdateState({ events: { bankAccountType: { onChange: data } } })}
                                            onFocus={() => this.deepUpdateState({ events: { bankAccountType: { onFocus: true } } })}
                                            onBlur={() => this.deepUpdateState({ events: { bankAccountType: { onBlur: true } } })}
                                        />
                                    </div>
                                    <div className="field" id="field-BankRoutingNumberElement">
                                        <label>Routing Number</label>
                                        <this.props.BankRoutingNumberElement
                                            onReady={() => this.deepUpdateState({ events: { bankRoutingNumber: { onReady: true } } })}
                                            onChange={(data) => this.deepUpdateState({ events: { bankRoutingNumber: { onChange: data } } })}
                                            onFocus={() => this.deepUpdateState({ events: { bankRoutingNumber: { onFocus: true } } })}
                                            onBlur={() => this.deepUpdateState({ events: { bankRoutingNumber: { onBlur: true } } })}
                                        />
                                    </div>
                                    <div className="field" id="field-BankAccountNumberElement">
                                        <label>Account Number</label>
                                        <this.props.BankAccountNumberElement
                                            onReady={() => this.deepUpdateState({ events: { bankAccountNumber: { onReady: true } } })}
                                            onChange={(data) => this.deepUpdateState({ events: { bankAccountNumber: { onChange: data } } })}
                                            onFocus={() => this.deepUpdateState({ events: { bankAccountNumber: { onFocus: true } } })}
                                            onBlur={() => this.deepUpdateState({ events: { bankAccountNumber: { onBlur: true } } })}
                                        />
                                    </div>
                                </div>}
                            </div>
                        </fieldset>

                        <hr/>
                        <button id="submit">Make Payment</button>
                    </form>
                </div>
            </div>
        </div>);
    }
}

const PaymentForm = withFramePay(PaymentFormComponent);

class App extends Component {

    render() {
        return (<FramePayProvider injectStyle {...params}>
            <div>
                <PaymentForm/>
            </div>
        </FramePayProvider>);
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
