import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ContextProvider } from './context';
import Api from './api';
import { FRAMEPAY_REMOTE_TIMEOUT_VALUE, FRAMEPAY_SCRIPT_LINK, FRAMEPAY_STYLE_LINK } from '../config';
import FramePayError, { ERROR_CODES } from './errors';

export default class Provider extends React.Component {
  static propTypes = {
    /**
     * Inject the framepay script
     * @see {@link config.FRAMEPAY_SCRIPT_LINK}
     */
    injectScript: PropTypes.bool,

    /**
     * Inject the framepay default css scheme
     * @see {@link config.FRAMEPAY_STYLE_LINK}
     */
    injectStyle: PropTypes.bool,

    /**
     * Child component
     */
    children: PropTypes.element,

    /**
     * FramePay configuration object
     * @see {@link https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-initialize}
     */
    config: PropTypes.shape({
      publishableKey: PropTypes.string.isRequired,
      style: PropTypes.object,
      classes: PropTypes.object,
      icon: PropTypes.object,
    }),
  };

  static defaultProps = {
    injectScript: false,
    injectStyle: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      /**
       * The framepay provider state
       */
      state: {
        ready: false,
      },
      /**
       * Public components api
       */
      api: new Api({ provider: this }),
    };
  }

  componentDidMount() {
    /**
     * Inject FramePay script
     */
    if (this.props.injectScript) {
      const injectScript = () => {
        let script = document.querySelector(`script[src="${FRAMEPAY_SCRIPT_LINK}"]`);
        if (script) {
          /**
           * Script already injected in DOM
           * wait while FramePay api will be Ready
           */

          /**
           * Cached timeout
           * @type {number|null}
           */
          let timer = null;
          let time = 50;
          let counter = FRAMEPAY_REMOTE_TIMEOUT_VALUE / time;
          const wait = () => {
            if (Api.remoteApiReady()) {
              return this.onFramePayInitReady();
            }
            if (counter <= 0) {
              return this.onFramePayInitError();
            }
            counter -= 1;
            timer = setTimeout(wait, time);
          };
          wait();
          return;
        }
        script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = FRAMEPAY_SCRIPT_LINK;
        script.type = 'text/javascript';
        script.onload = () => this.onFramePayInitReady();
        script.onerror = () => this.onFramePayInitError();
        window.document.querySelector('head')
          .appendChild(script);
      };
      injectScript();
    }

    /**
     * Inject FramePay style
     */
    if (this.props.injectStyle) {
      const injectStyle = () => {
        if (document.querySelector(`link[href="${FRAMEPAY_STYLE_LINK}"]`)) {
          // style already injected
          return;
        }
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = FRAMEPAY_STYLE_LINK;
        window.document.querySelector('head')
          .appendChild(style);
      };
      injectStyle();
    }
  }

  onFramePayInitError() {
    throw FramePayError({ code: ERROR_CODES.remoteScriptError });
  }

  onFramePayInitReady() {
    setTimeout(() => {
      if (!this.props.config) {
        throw FramePayError({ code: ERROR_CODES.undefinedConfiguration });
      }
      Api.initialize(this.props.config);
      this.setState({ state: { ready: true } });
    });
  }

  render() {
    return <ContextProvider value={this.state}>
      {React.Children.only(this.props.children)}
    </ContextProvider>;
  }
}
