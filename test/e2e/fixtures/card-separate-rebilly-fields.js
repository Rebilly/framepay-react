import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FramePayProvider, withFramePayCardComponent } from '../../../build';
import { deepMerge, prettyDebugRender, ReactVersion } from './util';
import './style.css';

const params = {
    publishableKey: 'pk_sandbox_c6cqKLddciVikuBOjhcng-rLccTz70NT4W_qZ_h',
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
        this.props.Rebilly.createToken(this.formNode, {
            billingAddress:{
                emails: [
                    {
                        label: 'email-extradata',
                        value: 'email-extradata@email.local'
                    }
                ]
            }
        })
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
                <h3>FramePay version: {this.props.Rebilly.version}</h3>
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
                                        placeholder="First Name"
                                        data-rebilly="firstName"
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="lastName"
                                        data-rebilly="lastName"
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        data-rebilly="emails"
                                    />
                                </div>
                                <div className="field">
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        data-rebilly="phones"
                                    />
                                </div>
                                <div className="field">
                                    <this.props.CardNumberElement
                                        onReady={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    number: { onReady: true }
                                                }
                                            })
                                        }
                                        onChange={data =>
                                            this.deepUpdateState({
                                                events: {
                                                    number: { onChange: data }
                                                }
                                            })
                                        }
                                        onFocus={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    number: { onFocus: true }
                                                }
                                            })
                                        }
                                        onBlur={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    number: { onBlur: true }
                                                }
                                            })
                                        }
                                    />
                                </div>

                                <div className="field">
                                    <this.props.CardCvvElement
                                        onReady={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    cvv: { onReady: true }
                                                }
                                            })
                                        }
                                        onChange={data =>
                                            this.deepUpdateState({
                                                events: {
                                                    cvv: { onChange: data }
                                                }
                                            })
                                        }
                                        onFocus={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    cvv: { onFocus: true }
                                                }
                                            })
                                        }
                                        onBlur={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    cvv: { onBlur: true }
                                                }
                                            })
                                        }
                                    />
                                </div>

                                <div className="field">
                                    <this.props.CardExpiryElement
                                        onReady={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    expiry: { onReady: true }
                                                }
                                            })
                                        }
                                        onChange={data =>
                                            this.deepUpdateState({
                                                events: {
                                                    expiry: { onChange: data }
                                                }
                                            })
                                        }
                                        onFocus={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    expiry: { onFocus: true }
                                                }
                                            })
                                        }
                                        onBlur={() =>
                                            this.deepUpdateState({
                                                events: {
                                                    expiry: { onBlur: true }
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

const CardElement = withFramePayCardComponent(CardElementComponent);

class App extends Component {
    render() {
        return (
            <FramePayProvider
                injectStyle
                {...params}
                onReady={() => {
                    //console.log('FramePayProvider.onReady');
                }}
                onError={err => {
                    //console.log('FramePayProvider.onError', err);
                }}
            >
                <div>
                    {ReactVersion()}
                    <CardElement />
                </div>
            </FramePayProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
