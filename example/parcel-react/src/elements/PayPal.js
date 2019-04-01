import React from 'react';
import { withFramePayCardComponent } from 'framepay-react';

class PayPal extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit', this.props);
  }

  render() {
    return (<div>
      <form method="post" onSubmit={this.handleSubmit}>
        <div className="field">
          {/* Render passed props */}
          <h2>{this.props.title}</h2>

          {/* Render the CardComponent */}
          <this.props.CardElement
            onReady={() => console.log('checkout-combined ready callback')}
            onChange={(data) => console.log('checkout-combined change callback', data)}
            onFocus={(data) => console.log('checkout-combined focus callback', data)}
            onBlur={(data) => console.log('checkout-combined blur callback', data)}
          />

          <input type="hidden" data-rebilly="token" name="rebilly-token"/>
        </div>
        <button>Checkout</button>
      </form>
    </div>);
  }
}

export default withFramePayCardComponent(PayPal);
