import React from 'react';
import { withFramePayCardComponent } from '../../../../build/package';
import './OtherMethods.css';

class OtherMethods extends React.Component {

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
    this.props.framePay.createToken(this.formNode, { method, billingAddress })
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
        <div>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    </div>);
  }
}

export default withFramePayCardComponent(OtherMethods);
