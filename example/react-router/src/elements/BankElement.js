import React from 'react';
import { withFramePayBankComponent } from 'framepay-react';

class BankElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('BankElement.constructor');
  }

  componentDidMount() {
    console.log('BankElement.componentDidMount');
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
      {/* Render passed props */}
      <h2>{this.props.title}</h2>
      <div className="flex-wrapper">
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
                {/* Render the BankElement */}
                <this.props.BankElement
                  onReady={() => console.log('checkout-combined ready callback')}
                  onChange={(data) => console.log('checkout-combined change callback', data)}
                  onFocus={(data) => console.log('checkout-combined focus callback', data)}
                  onBlur={(data) => console.log('checkout-combined blur callback', data)}
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

export default withFramePayBankComponent(BankElement);
