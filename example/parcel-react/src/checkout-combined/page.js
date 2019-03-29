import React from 'react';
import Card from './Card';

export default class CheckoutCombined extends React.Component {

  render() {
    return (<div>
      <h2>Checkout Combined</h2>
      <div>
        <Card cardTitleLabel="Payment Card"/>
      </div>
    </div>);
  }
}
