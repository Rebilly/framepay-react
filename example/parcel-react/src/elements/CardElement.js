import React from 'react';
import { withFramePayCardComponent } from 'framepay-react';

class CardElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      country: '',
      region: '',
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

export default withFramePayCardComponent(CardElement);
