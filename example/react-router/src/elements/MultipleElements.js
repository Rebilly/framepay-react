import React from 'react';
import { withFramePayBankComponent, withFramePayCardComponent } from 'framepay-react';

class CardComponent extends React.Component {

  render() {
    return (<div>
      <form method="post">
        <div className="field">
          {/* Render passed props */}
          <h4>{this.props.title}</h4>

          {/* Render the CardComponent */}
          <this.props.CardElement
            onReady={() => console.log('checkout-combined ready callback')}
            onChange={(data) => console.log('checkout-combined change callback', data)}
            onFocus={(data) => console.log('checkout-combined focus callback', data)}
            onBlur={(data) => console.log('checkout-combined blur callback', data)}
          />

          <input type="hidden" data-rebilly="token" name="rebilly-token"/>
        </div>
      </form>
    </div>);
  }
}

class BankComponent extends React.Component {

  render() {
    return (<div>
      <form method="post">
        <div className="field">
          {/* Render passed props */}
          <h4>{this.props.title}</h4>

          {/* Render the BankElement */}
          <this.props.BankElement
            onReady={() => console.log('checkout-combined ready callback')}
            onChange={(data) => console.log('checkout-combined change callback', data)}
            onFocus={(data) => console.log('checkout-combined focus callback', data)}
            onBlur={(data) => console.log('checkout-combined blur callback', data)}
          />

          <input type="hidden" data-rebilly="token" name="rebilly-token"/>
        </div>
      </form>
    </div>);
  }
}

const Card1 = withFramePayCardComponent(CardComponent);
const Card2 = withFramePayCardComponent(CardComponent);
const Bank1 = withFramePayBankComponent(BankComponent);
const Bank2 = withFramePayBankComponent(BankComponent);
const Bank3 = withFramePayBankComponent(BankComponent);
const Bank4 = withFramePayBankComponent(BankComponent);
const Bank5 = withFramePayBankComponent(BankComponent);
const Bank6 = withFramePayBankComponent(BankComponent);

export default class MultipleElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      method: '',
      methods: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const forms = [
      this.c1Node,
      this.c2Node,
      this.b1Node,
      this.b2Node,
      this.b3Node,
      this.b4Node,
      this.b5Node,
      this.b6Node
    ];
  }

  render() {
    return (<div>
      <h2>{this.props.title}</h2>
      <hr/>
      <Card1 ref={c1Node => this.c1Node = c1Node} title="Card 1 sub title"/>
      <Card2 ref={c2Node => this.c2Node = c2Node} title="Card 2 sub title"/>
      <Bank1 ref={b1Node => this.b1Node = b1Node} title="Bank 1 sub title"/>
      <Bank2 ref={b2Node => this.b2Node = b2Node} title="Bank 2 sub title"/>
      <Bank3 ref={b3Node => this.b3Node = b3Node} title="Bank 3 sub title"/>
      <Bank4 ref={b4Node => this.b4Node = b4Node} title="Bank 4 sub title"/>
      <Bank5 ref={b5Node => this.b5Node = b5Node} title="Bank 5 sub title"/>
      <Bank6 ref={b6Node => this.b6Node = b6Node} title="Bank 6 sub title"/>
      <hr/>
      <button onClick={this.handleSubmit}>Submit Multiple forms</button>
    </div>);
  }
}
