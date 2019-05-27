import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FramePayProvider, withFramePayBankComponent } from '../../../build';
import { deepMerge, prettyDebugRender, ReactVersion } from './util';
import './style.css';

const params = {
    publishableKey: 'pk_sandbox_c6cqKLddciVikuBOjhcng-rLccTz70NT4W_qZ_h'
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
                country: 'GB',
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

    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <div className="flex-wrapper">
                    {prettyDebugRender(this.state)}
                    <div className="example-2">
                        <form
                            id="form"
                            ref={node => (this.formNode = node)}
                            method="post"
                            onSubmit={this.handleSubmit}
                        >
                            <fieldset>
                                <div className="field">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        defaultValue={
                                            this.state.billingAddress.firstName
                                        }
                                        onChange={e => {
                                            this.deepUpdateState({
                                                billingAddress: {
                                                    firstName: e.target.value
                                                }
                                            });
                                        }}
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        defaultValue={
                                            this.state.billingAddress.lastName
                                        }
                                        onChange={e => {
                                            this.deepUpdateState({
                                                billingAddress: {
                                                    lastName: e.target.value
                                                }
                                            });
                                        }}
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        defaultValue={
                                            this.state.billingAddress.emails
                                        }
                                        onChange={e => {
                                            this.deepUpdateState({
                                                billingAddress: {
                                                    emails: e.target.value
                                                }
                                            });
                                        }}
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        defaultValue={
                                            this.state.billingAddress
                                                .phoneNumbers
                                        }
                                        onChange={e => {
                                            this.deepUpdateState({
                                                billingAddress: {
                                                    phoneNumbers: e.target.value
                                                }
                                            });
                                        }}
                                    />
                                </div>
                                <div className="field">
                                    <this.props.BankAccountTypeElement
                                        onReady={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankAccountType: {
                                                        onReady: true
                                                    }
                                                }
                                            })
                                        }
                                        onChange={data =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankAccountType: {
                                                        onChange: data
                                                    }
                                                }
                                            })
                                        }
                                        onFocus={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankAccountType: {
                                                        onFocus: true
                                                    }
                                                }
                                            })
                                        }
                                        onBlur={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankAccountType: {
                                                        onBlur: true
                                                    }
                                                }
                                            })
                                        }
                                    />
                                </div>

                                <div className="field">
                                    <this.props.BankAccountNumberElement
                                        onReady={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankAccountNumber: {
                                                        onReady: true
                                                    }
                                                }
                                            })
                                        }
                                        onChange={data =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankAccountNumber: {
                                                        onChange: data
                                                    }
                                                }
                                            })
                                        }
                                        onFocus={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankAccountNumber: {
                                                        onFocus: true
                                                    }
                                                }
                                            })
                                        }
                                        onBlur={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankAccountNumber: {
                                                        onBlur: true
                                                    }
                                                }
                                            })
                                        }
                                    />
                                </div>

                                <div className="field">
                                    <this.props.BankRoutingNumberElement
                                        onReady={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankRoutingNumber: {
                                                        onReady: true
                                                    }
                                                }
                                            })
                                        }
                                        onChange={data =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankRoutingNumber: {
                                                        onChange: data
                                                    }
                                                }
                                            })
                                        }
                                        onFocus={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankRoutingNumber: {
                                                        onFocus: true
                                                    }
                                                }
                                            })
                                        }
                                        onBlur={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    bankRoutingNumber: {
                                                        onBlur: true
                                                    }
                                                }
                                            })
                                        }
                                    />
                                </div>
                            </fieldset>
                            <button id="submit">Make Payment</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const BankElement = withFramePayBankComponent(CardElementComponent);

class App extends Component {
    render() {
        return (
            <FramePayProvider injectStyle {...params}>
                <div>
                    {ReactVersion()};
                    <BankElement />
                </div>
            </FramePayProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
