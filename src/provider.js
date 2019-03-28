import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';
import { FRAMEPAY_SCRIPT_LINK, FRAMEPAY_STYLE_LINK } from './config';
import Api from './api';

class FramePayProvider extends React.Component {
  static propTypes = {
    injectScript: PropTypes.bool,
    injectStyle: PropTypes.bool,
    publishableKey: PropTypes.string.isRequired,
    style: PropTypes.object,
    classes: PropTypes.object,
    icon: PropTypes.object,
  };

  static defaultProps = {
    injectScript: false,
    injectStyle: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      // The public context data, will passed into the provider
      // TODO initialized key
      context: new Api({ provider: this }),
    };
  }

  componentDidMount() {
    /**
     * Inject FramePay script
     */
    if (this.props.injectScript) {
      if (document.querySelector(`[src="${FRAMEPAY_SCRIPT_LINK}"]`)) {
        // script already injected
        return;
      }
      const script = document.createElement('script');
      script.src = FRAMEPAY_SCRIPT_LINK;
      script.type = 'text/javascript';
      script.onload = () => this.onFramePayInitReady();
      script.onerror = error => this.onFramePayInitError(error);
      window.document.querySelector('head')
        .appendChild(script);
    }

    /**
     * Inject FramePay style
     */
    if (this.props.injectStyle) {
      if (document.querySelector(`[href="${FRAMEPAY_STYLE_LINK}"]`)) {
        // style already injected
        return;
      }
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = FRAMEPAY_STYLE_LINK;
      window.document.querySelector('head')
        .appendChild(style);
    }
  }

  onFramePayInitError(error) {
    // TODO standartize errors
    throw new Error(error);
  }

  onFramePayInitReady() {
    Rebilly.initialize({
      publishableKey: this.props.publishableKey,
      style: this.props.style,
      classes: this.props.classes,
      icon: this.props.icon,
    });
  }

  render() {
    return <Provider value={this.state.context}>
      {React.Children.only(this.props.children)}
    </Provider>;
  }
}

export default FramePayProvider;
