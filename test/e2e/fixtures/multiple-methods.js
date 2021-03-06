import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FramePayProvider, withFramePay } from '../../../build';
import { deepMerge, prettyDebugRender, ReactVersion } from './util';
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
    },
    iban: {
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
            paymentElements: {
                // {element: method}
                card: 'payment-card',
                bank: 'ach',
                iban: 'ach'
            },
            paymentElement: 'card',
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
        const billingAddress = {
            ...this.state.billingAddress
        };

        this.props.Rebilly.createToken(this.formNode, {
            // method: this.state.paymentElements[this.state.paymentElement],
            billingAddress
        })
            .then(data => {
                this.deepUpdateState({ token: { error: false, data: { ...data, method: data.method } } });
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
        const elements = Object.keys(this.state.paymentElements);

        return (
            <div>
                <h2>{this.props.title}</h2>
                <h3>FramePay version: {this.props.Rebilly.version}</h3>
                <div className="flex-wrapper">
                    {prettyDebugRender(this.state)}
                    <div className="example-2">
                        <ul>
                            {elements.map(element => (
                                <li key={`payment-method-${element}`}>
                                    <button
                                        id={`set-active-element-${element}`}
                                        onClick={() => {
                                            this.setState({
                                                paymentElement: element,
                                                events: {
                                                    ...defaultEvents()
                                                }
                                            });
                                        }}
                                    >
                                        {element} - isActive:
                                        {String(
                                            element === this.state.paymentElement
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
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
                                <hr/>
                                <div className="field" id="field-CardElement">
                                    {this.state.paymentElement === 'card' && (
                                        <this.props.CardElement
                                            onReady={() =>
                                                this.deepUpdateState({
                                                    events: {
                                                        card: { onReady: true }
                                                    }
                                                })
                                            }
                                            onChange={data =>
                                                this.deepUpdateState({
                                                    events: {
                                                        card: { onChange: { ...data, error: data.error || '' } }
                                                    }
                                                })
                                            }
                                            onFocus={() =>
                                                this.deepUpdateState({
                                                    events: {
                                                        card: { onFocus: true }
                                                    }
                                                })
                                            }
                                            onBlur={() =>
                                                this.deepUpdateState({
                                                    events: {
                                                        card: { onBlur: true }
                                                    }
                                                })
                                            }
                                        />
                                    )}
                                    {this.state.paymentElement === 'bank' && (
                                        <div>
                                            <div
                                                className="field"
                                                id="field-BankAccountTypeElement"
                                            >
                                                <label>Account Type</label>
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
                                                                    onChange: { ...data, error: data.error || '' }
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
                                            <div
                                                className="field"
                                                id="field-BankRoutingNumberElement"
                                            >
                                                <label>Routing Number</label>
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
                                                                    onChange: { ...data, error: data.error || '' }
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
                                            <div
                                                className="field"
                                                id="field-BankAccountNumberElement"
                                            >
                                                <label>Account Number</label>
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
                                                                    onChange: { ...data, error: data.error || '' }
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
                                        </div>
                                    )}
                                    {this.state.paymentElement === 'iban' && (
                                        <div>
                                            <div
                                                className="field"
                                                id="field-IBANElement"
                                            >
                                                <label>IBAN NUmber</label>
                                                <this.props.IBANElement
                                                    onReady={() =>
                                                        this.deepUpdateState({
                                                            events: {
                                                                iban: {
                                                                    onReady: true
                                                                }
                                                            }
                                                        })
                                                    }
                                                    onChange={data =>
                                                        this.deepUpdateState({
                                                            events: {
                                                                iban: {
                                                                    onChange: { ...data, error: data.error || '' }
                                                                }
                                                            }
                                                        })
                                                    }
                                                    onFocus={() =>
                                                        this.deepUpdateState({
                                                            events: {
                                                                iban: {
                                                                    onFocus: true
                                                                }
                                                            }
                                                        })
                                                    }
                                                    onBlur={() =>
                                                        this.deepUpdateState({
                                                            events: {
                                                                iban: {
                                                                    onBlur: true
                                                                }
                                                            }
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </fieldset>

                            <hr/>
                            <button id="submit">Make Payment</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const PaymentForm = withFramePay(PaymentFormComponent);

class App extends Component {
    render() {
        return (
            <FramePayProvider injectStyle {...params}>
                <div>
                    {ReactVersion()}
                    <PaymentForm/>
                </div>
            </FramePayProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
