import React from 'react';
import { connect } from 'react-redux';

import { increment1 } from './actions';

class ConnectedCardChildComponent extends React.Component {
  render() {
    return (<div style={{
      border: '1px solid #ddd',
      padding: '15px',
    }}>

      <b>Connected card child component</b>
      <pre>{JSON.stringify(this.props.increments, null, 2)}</pre>
      <button onClick={(e) => {
        e.preventDefault();
        this.props.increment1();
      }}>Increment
      </button>
    </div>);
  }
}

const ConnectedCardChild = connect(
  (state) => {
    const increments = JSON.parse(JSON.stringify(state.increments));
    return {
      increments,
    };
  },
  (dispatch) => ({
    increment1: () => dispatch(increment1()),
  }),
)(ConnectedCardChildComponent);

export default ConnectedCardChild;
