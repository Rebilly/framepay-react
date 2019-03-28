import React from 'react';
import { connect } from 'react-redux';

import ConnectedCardWrapper from './ConnectedCardWrapperLevel-2';
import Card from './Card';

class ConnectedParentComponent extends React.Component {
  render() {
    return (<div>
      <h2>ConnectedParentComponent</h2>
      <ConnectedCardWrapper>
        <Card/>
      </ConnectedCardWrapper>
    </div>);
  }
}

const ConnectedParent = connect(
  () => ({}),
  () => ({}),
)(ConnectedParentComponent);

export default ConnectedParent;
