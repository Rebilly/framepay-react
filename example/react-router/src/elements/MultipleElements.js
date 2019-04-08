import React from 'react';
import { withFramePay, withFramePayBankComponent, withFramePayCardComponent } from '../../../../build';
import './MultipleElements.css';

class CardComponent extends React.Component {

    render() {
        return (<div>
            <div className="field">
                <h4>{this.props.title}</h4>
                <this.props.CardElement/>
            </div>
        </div>);
    }
}

class BankComponent extends React.Component {

    render() {
        const { elementType } = this.props;
        const ElementComponent = this.props[elementType];
        return (<div>
            <div className="field">
                <h4>{this.props.title}</h4>
                <ElementComponent/>
            </div>
        </div>);
    }
}

const CardElement = withFramePayCardComponent(CardComponent);
const BankElement = withFramePayBankComponent(BankComponent);

class MultipleElements extends React.Component {
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
        this.props.framePay.createToken(
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

    renderCardComponent(method, index) {
        let props = {};
        let ComponentElement = null;

        const isActive = method === this.state.activeMethod;

        switch (method) {
            case 'payment-card':
                ComponentElement = CardElement;
                break;
            case 'ach':
                props = { elementType: 'BankElement' };
                ComponentElement = BankElement;
                break;
            default:
                ComponentElement = null;
                break;
        }

        const linkClasses = isActive ? 'tab-link is-active' : 'tab-link';
        const contentClasses = isActive ? 'tab-content-item is-active' : 'tab-content-item';

        return <li className="tab-item" key={`${method}-${index}`}>
            <a
                className={linkClasses}
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    this.setState({ activeMethod: method });
                }}
            >{method}</a>
            {ComponentElement && <div className={contentClasses} id="content-1">
                <div className="field">
                    <label>{method}</label>
                    <ComponentElement {...props}/>
                </div>
            </div>}
        </li>;
    }

    render() {
        return (
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
                        <label>Select your payment method</label>
                        <ul className="tab">
                            {this.state.methods
                                .map((method, index) => this.renderCardComponent(method, index))}
                        </ul>
                    </fieldset>

                    <button>Make Payment</button>
                </form>
            </div>);
    }
}

export default withFramePay(MultipleElements);
