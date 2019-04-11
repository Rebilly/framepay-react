import React from 'react';
import { withFramePay } from '../../../../build';
import './MultiplePaymentMethods.css';

class MultiplePaymentMethods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            activeMethod: 'payment-card',
            methods: [
                'payment-card',
                'ach',
                'paypal',
                'bitcoin',
                'China-UnionPay'
            ]
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
        const { firstName, lastName, activeMethod } = this.state;
        this.props.Rebilly.createToken(
            this.formNode, {
                method: activeMethod,
                billingAddress: { firstName, lastName }
            }
        )
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
        const { activeMethod, methods } = this.state;

        return (
            <div>
                <div className="example-title">
                    <h2>{this.props.title}</h2>
                    <a href={this.props.link} target="_blank">View source on GitHub</a>
                </div>
                <div className="example-8">
                    <form onSubmit={this.handleSubmit} ref={node => this.formNode = node}>
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
                        </fieldset>

                        <fieldset>
                            {methods
                                .map((method) => (
                                    <div key={`method-tab-${method}`}>
                                        <input
                                            type="radio"
                                            name="active-method"
                                            id={`payment-method-${method}`}
                                            checked={method === activeMethod}
                                            onChange={e => {
                                                this.setState({ activeMethod: method });
                                            }}/>
                                        <label htmlFor={`payment-method-${method}`}>{method}</label>
                                    </div>)
                                )
                            }
                        </fieldset>
                        <hr/>
                        <fieldset>
                            {activeMethod === 'payment-card' && <this.props.CardElement/>}
                            {activeMethod === 'ach' && <div>
                                <div className="field">
                                    <label>Account Type</label>
                                    <this.props.BankAccountTypeElement/>
                                </div>
                                <div className="field">
                                    <label>Routing Number</label>
                                    <this.props.BankRoutingNumberElement/>
                                </div>
                                <div className="field">
                                    <label>Account Number</label>
                                    <this.props.BankAccountNumberElement/>
                                </div>
                            </div>}
                        </fieldset>
                        <button>Make Payment</button>
                    </form>
                </div>
            </div>);
    }
}

export default withFramePay(MultiplePaymentMethods);
