import React from 'react';
import { injectFramePayCard } from 'framepay-react';

class CardComponent extends React.Component {

  render() {
    return (<div>
      <form method="post" action="/process">
        <div className="field">
          {/* Render passed props */}
          <label>{this.props.cardTitleLabel}</label>

          {/* Render the CardComponent */}
          <this.props.CardComponent
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

export default injectFramePayCard(CardComponent);
