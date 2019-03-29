import React from 'react';
import { Consumer } from './context';
import Card from '../components/Card';

export default (WrappedComponent) => {

  const Wrapper = function (Component, provider) {
    class Hoc extends React.Component {
      render() {
        return (<Consumer>
          {(data) => <Component {...provider.call(this, data)}/>}
        </Consumer>);
      }
    }

    Hoc.displayName = `FramePayHoc(${Component.displayName || Component.name || 'Component'})`;
    return Hoc;
  };

  return Wrapper(WrappedComponent, function (data) {
    return {
      ...this.props,
      framePay: data.api,
      CardComponent: Wrapper(Card, function (data) {
        /**
         * Pick only available props from Card component props
         */
        const { onReady, onChange, onFocus, onBlur } = this.props;
        return {
          onReady,
          onChange,
          onFocus,
          onBlur,
          state: data.state,
          api: data.api,
        };
      }),
    };
  });
};
