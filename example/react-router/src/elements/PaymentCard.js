import React from 'react';
import { withFramePayCardComponent } from '../../../../build';

class PaymentCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '', email: '', phone: '' };
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
                                <this.props.CardElement/>
                            </div>
                        </fieldset>
                        <button>Make Payment</button>
                    </form>
                </div>
            </div>
        </div>);
    }
}

export default withFramePayCardComponent(PaymentCard);
