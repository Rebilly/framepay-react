import React from 'react';
import { withFramePayBankComponent } from '../../../../build';

class BankAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '', email: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        /**
         *
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-createtoken
         *
         */
        this.props.Rebilly.createToken(this.formNode, { billingAddress: { ...this.state } })
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
            <div className="example-title">
                <h2>{this.props.title}</h2>
                <a href={this.props.link} target="_blank">View source on GitHub</a>
            </div>
            <div >
                <div className="example-5">
                    <form ref={node => this.formNode = node} method="post" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <div className="field">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="John"
                                    defaultValue={this.state.firstName}
                                    onChange={e => {
                                        this.setState({ firstName: e.target.value });
                                    }}/>
                            </div>
                            <div className="field">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Doe"
                                    defaultValue={this.state.lastName}
                                    onChange={e => {
                                        this.setState({ lastName: e.target.value });
                                    }}/>
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="johnd@example.com"
                                    defaultValue={this.state.email}
                                    onChange={e => {
                                        this.setState({ email: e.target.value });
                                    }}/>
                            </div>
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
                        </fieldset>
                        <button>Make Payment</button>
                    </form>
                </div>
            </div>
        </div>);
    }
}

export default withFramePayBankComponent(BankAccount);
