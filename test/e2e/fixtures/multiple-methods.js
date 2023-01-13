import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FramePayProvider, withFramePay } from '../../../build';
import { deepMerge, prettyDebugRender, ReactVersion } from './util';
import './style.css';

const params = {
    publishableKey: 'pk_sandbox_S95ATjj4hXZs-T9QpZq1ENl2tDSrUkCGv98utc9',
    organizationId: '5977150c-1c97-4dd4-9860-6bb2bab070b4',
    websiteId: 'demo.com',
    transactionData: {
        amount: 10,
        currency: 'USD',
        label: 'Purchase label 1',
    },
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
                iban: 'ach',
                googlepay: 'googlepay'
            },
            paymentElement: 'card',
            billingAddress: {
                firstName: 'first-name-value',
                lastName: 'last-name-value',
                country: 'GB'
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
                this.props.onEvent({
                    token: {
                        error: false,
                        data: { ...data, method: data.method }
                    }
                });
            })
            .catch(err => {
                this.props.onEvent({ token: { error: true, data: err } });
            });
    }

    render() {
        const elements = Object.keys(this.state.paymentElements);

        const changeElement = (element) => {
            this.setState({
                paymentElement: element,
            });
            // Clear events
            this.props.onEvent({
                events: {
                    ...defaultEvents(),
                },
            })
        }

        return (
            <div className="example-2">
                <ul>
                    {elements.map(element => (
                        <li key={`payment-method-${element}`}>
                            <button
                                id={`set-active-element-${element}`}
                                onClick={() => changeElement(element)}
                            >
                                {element} - isActive:
                                {String(element === this.state.paymentElement)}
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
                                    this.props.onEvent({
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
                                    this.props.onEvent({
                                        billingAddress: {
                                            lastName: e.target.value
                                        }
                                    });
                                }}
                            />
                        </div>
                        <hr />
                        <div className="field" id="field-CardElement">
                            {this.state.paymentElement === 'card' && (
                                <this.props.CardElement
                                    onReady={() =>
                                        this.props.onEvent({
                                            events: {
                                                card: { onReady: true }
                                            }
                                        })
                                    }
                                    onChange={data =>
                                        this.props.onEvent({
                                            events: {
                                                card: {
                                                    onChange: {
                                                        ...data,
                                                        error: data.error || ''
                                                    }
                                                }
                                            }
                                        })
                                    }
                                    onFocus={() =>
                                        this.props.onEvent({
                                            events: {
                                                card: { onFocus: true }
                                            }
                                        })
                                    }
                                    onBlur={() =>
                                        this.props.onEvent({
                                            events: {
                                                card: { onBlur: true }
                                            }
                                        })
                                    }
                                />
                            )}
                            {this.state.paymentElement === 'googlepay' && (
                                <this.props.GooglePayElement />
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
                                                this.props.onEvent({
                                                    events: {
                                                        bankAccountType: {
                                                            onReady: true
                                                        }
                                                    }
                                                })
                                            }
                                            onChange={data =>
                                                this.props.onEvent({
                                                    events: {
                                                        bankAccountType: {
                                                            onChange: {
                                                                ...data,
                                                                error:
                                                                    data.error ||
                                                                    ''
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                            onFocus={() =>
                                                this.props.onEvent({
                                                    events: {
                                                        bankAccountType: {
                                                            onFocus: true
                                                        }
                                                    }
                                                })
                                            }
                                            onBlur={() =>
                                                this.props.onEvent({
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
                                                this.props.onEvent({
                                                    events: {
                                                        bankRoutingNumber: {
                                                            onReady: true
                                                        }
                                                    }
                                                })
                                            }
                                            onChange={data =>
                                                this.props.onEvent({
                                                    events: {
                                                        bankRoutingNumber: {
                                                            onChange: {
                                                                ...data,
                                                                error:
                                                                    data.error ||
                                                                    ''
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                            onFocus={() =>
                                                this.props.onEvent({
                                                    events: {
                                                        bankRoutingNumber: {
                                                            onFocus: true
                                                        }
                                                    }
                                                })
                                            }
                                            onBlur={() =>
                                                this.props.onEvent({
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
                                                this.props.onEvent({
                                                    events: {
                                                        bankAccountNumber: {
                                                            onReady: true
                                                        }
                                                    }
                                                })
                                            }
                                            onChange={data =>
                                                this.props.onEvent({
                                                    events: {
                                                        bankAccountNumber: {
                                                            onChange: {
                                                                ...data,
                                                                error:
                                                                    data.error ||
                                                                    ''
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                            onFocus={() =>
                                                this.props.onEvent({
                                                    events: {
                                                        bankAccountNumber: {
                                                            onFocus: true
                                                        }
                                                    }
                                                })
                                            }
                                            onBlur={() =>
                                                this.props.onEvent({
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
                                                this.props.onEvent({
                                                    events: {
                                                        iban: {
                                                            onReady: true
                                                        }
                                                    }
                                                })
                                            }
                                            onChange={data =>
                                                this.props.onEvent({
                                                    events: {
                                                        iban: {
                                                            onChange: {
                                                                ...data,
                                                                error:
                                                                    data.error ||
                                                                    ''
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                            onFocus={() =>
                                                this.props.onEvent({
                                                    events: {
                                                        iban: {
                                                            onFocus: true
                                                        }
                                                    }
                                                })
                                            }
                                            onBlur={() =>
                                                this.props.onEvent({
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

                    <hr />
                    <button id="submit">Make Payment</button>
                </form>
            </div>
        );
    }
}

const PaymentForm = withFramePay(PaymentFormComponent);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: {
                ...defaultEvents()
            },
            token: {
                error: null,
                data: null
            }
        };
    }

    deepUpdateState(data) {
        this.setState(prevState => {
            return deepMerge(prevState, data);
        });
    }

    render() {
        return (
            <FramePayProvider injectStyle {...params} onTokenReady={(token) => this.deepUpdateState({ error: false, data: token })}>
                <div>
                    {ReactVersion()}
                    <div>
                        <div className="flex-wrapper">
                            {prettyDebugRender(this.state)}
                            <PaymentForm
                                onEvent={data => this.deepUpdateState(data)}
                            />
                        </div>
                    </div>
                </div>
            </FramePayProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
