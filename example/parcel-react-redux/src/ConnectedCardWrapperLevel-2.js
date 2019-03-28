import React from 'react';
import connect from 'react-redux/es/connect/connect';

class ConnectedCardWrapperComponent extends React.Component {
  render() {
    return (<div>
      <h2>ConnectedCardWrapperComponent</h2>
      {this.props.children}
    </div>);
  }
}

const ConnectedCardWrapperLevel2 = connect(
  () => ({}),
  () => ({}),
)(ConnectedCardWrapperComponent);

export default ConnectedCardWrapperLevel2;
