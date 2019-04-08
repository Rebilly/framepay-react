import React from 'react';
import { withFramePayCardComponent } from '../../../../build';

class CardElementSeparated extends React.Component {

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
        return (<div className="example-2">
            <h2>{this.props.title}</h2>
            <form ref={node => this.formNode = node} method="post" onSubmit={this.handleSubmit}>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
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
                            name="field1"
                            placeholder="Last Name"
                            defaultValue={this.state.lastName}
                            onChange={e => {
                                this.setState({ lastName: e.target.value });
                            }}/>
                    </div>
                    <div className="field">
                        <input
                            type="text"
                            name="field2"
                            placeholder="Email"
                            defaultValue={this.state.email}
                            onChange={e => {
                                this.setState({ email: e.target.value });
                            }}/>
                    </div>
                    <div className="field">
                        <input
                            type="text"
                            name="field3"
                            placeholder="Phone"
                            defaultValue={this.state.country}
                            onChange={e => {
                                this.setState({ country: e.target.value });
                            }}/>
                    </div>
                    <div className="field">
                        {/* Render the CardComponent */}
                        <this.props.CardNumberElement
                            onReady={() => console.log('CardNumberElement ready callback')}
                            onChange={(data) => console.log('CardNumberElement change callback', data)}
                            onFocus={(data) => console.log('CardNumberElement focus callback', data)}
                            onBlur={(data) => console.log('CardNumberElement blur callback', data)}
                        />
                        <hr/>
                        <this.props.CardCvvElement
                            onReady={() => console.log('CardCvvElement ready callback')}
                            onChange={(data) => console.log('CardCvvElement change callback', data)}
                            onFocus={(data) => console.log('CardCvvElement focus callback', data)}
                            onBlur={(data) => console.log('CardCvvElement blur callback', data)}
                        />
                        <hr/>
                        <this.props.CardExpiryElement
                            onReady={() => console.log('CardExpiryElement ready callback')}
                            onChange={(data) => console.log('CardExpiryElement change callback', data)}
                            onFocus={(data) => console.log('CardExpiryElement focus callback', data)}
                            onBlur={(data) => console.log('CardExpiryElement blur callback', data)}
                        />
                    </div>
                </fieldset>
                <button>Make Payment</button>
            </form>
        </div>);
    }
}

export default withFramePayCardComponent(CardElementSeparated);
