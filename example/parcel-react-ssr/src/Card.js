import React from 'react';
// import './Card.css';
import { injectFramePayCard } from 'framepay-react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.framePay.createToken(
      this.formNode,
      {
        billingAddress: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
    )
      .then((result) => {
        console.log('result', result);
      });
  }

  render() {
    return (<div className="example-2" onSubmit={this.handleSubmit}>
      <form ref={node => this.formNode = node}>
        <fieldset>
          <div className="field">
            <input type="text" name="field1" placeholder="First Name"/>
          </div>
          <div className="field">
            <input type="text" name="field1" placeholder="Last Name"/>
          </div>
          <div className="field">
            <input type="text" name="field2" placeholder="Email"/>
          </div>
          <div className="field">
            <input type="text" name="field3" placeholder="Phone"/>
          </div>
          <div className="field">
            {this.props.CardComponent}
          </div>
        </fieldset>
        <button>Make Payment</button>
      </form>
    </div>);
  }
}

export default injectFramePayCard(Card);
