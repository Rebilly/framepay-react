import React from 'react';
import './OtherPaymentMethods.css';

import { withFramePay } from '../../../../build';

class OtherPaymentMethods extends React.Component {

    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '', method: 'paypal' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeMethod = this.handleChangeMethod.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        /**
         *
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-createtoken
         *
         */
        const { method, ...billingAddress } = this.state;
        this.props.Rebilly.createToken(this.formNode, { method, billingAddress })
            .then(data => {
                console.log('createToken.data', data);
                alert(JSON.stringify(data, null, 2));
            })
            .catch(err => {
                console.log('createToken.err', err);
                alert(JSON.stringify(err, null, 2));
            });
    }

    handleChangeMethod(e) {
        this.setState({ method: e.target.value });
    }

    render() {
        return (<div>
                <div>
                    <div className="example-title">
                        <h2>{this.props.title}</h2>
                        <a href={this.props.link} target="_blank">View source on GitHub</a>
                    </div>
                    <div>
                        <div className="example-2">
                            <form
                                ref={node => this.formNode = node}
                                onSubmit={this.handleSubmit}>
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
                                <hr/>
                                <fieldset>
                                    <p>
                                        <input
                                            checked={this.state.method === 'paypal'}
                                            id="checkbox-paypal"
                                            type="radio"
                                            name="radio-group"
                                            defaultValue="paypal"
                                            onChange={this.handleChangeMethod}/>
                                        <label htmlFor="checkbox-paypal">PayPal</label>
                                    </p>
                                    <p>
                                        <input
                                            checked={this.state.method === 'bitcoin'}
                                            id="checkbox-bitcoin"
                                            type="radio"
                                            name="radio-group"
                                            defaultValue="bitcoin"
                                            onChange={this.handleChangeMethod}/>
                                        <label htmlFor="checkbox-bitcoin">Bitcoin</label>
                                    </p>
                                </fieldset>

                                <button>Make Payment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withFramePay(OtherPaymentMethods);
