import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider as FramePayProvider, withFramePayCardComponent } from '../../../build';

const params = {
    injectScript: true,
    injectStyle: true,
    settings: {
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
    }
};

class CardElementComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            country: '',
            region: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log('CardElement.constructor');
    }

    componentDidMount() {
        console.log('CardElement.componentDidMount');
    }

    handleSubmit(e) {
        e.preventDefault();
        /**
         *
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-createtoken
         *
         */
        this.props.framePay.createToken(this.formNode, { billingAddress: { ...this.state } })
            .then(data => {
                console.log('createToken.data', data);
                alert(JSON.stringify(data, null, 2));
            })
            .catch(err => {
                console.log('createToken.err', err);
                alert(JSON.stringify(err, null, 2));
            });
    }

    render() {
        return (<div>
            <h2>{this.props.title}</h2>
            <div className="flex-wrapper">
                <div className="example-2">
                    <form ref={node => this.formNode = node} method="post" onSubmit={this.handleSubmit}>
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
                            <div className="field">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={this.state.email}
                                    onChange={e => {
                                        this.setState({ email: e.target.value });
                                    }}/>
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    defaultValue={this.state.phone}
                                    onChange={e => {
                                        this.setState({ phone: e.target.value });
                                    }}/>
                            </div>
                            <div className="field">
                                {/* Render the CardComponent */}
                                <this.props.CardElement
                                    onReady={() => console.log('CardElement ready callback')}
                                    onChange={(data) => console.log('CardElement change callback', data)}
                                    onFocus={(data) => console.log('CardElement focus callback', data)}
                                    onBlur={(data) => console.log('CardElement blur callback', data)}
                                />
                            </div>
                        </fieldset>
                        <button>Make Payment</button>
                    </form>
                </div>
                <div>
                    <pre>{JSON.stringify(this.state, null, 2)}</pre>
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
