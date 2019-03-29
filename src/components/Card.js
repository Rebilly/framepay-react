import React from 'react';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  static propTypes = {
    /**
     * FramePay Context value
     * @type {object}
     */
    state: PropTypes.shape({
      ready: PropTypes.bool.required,
    }),
    /**
     * FramePay Api object
     * @type {object}
     */
    api: PropTypes.object,

    /**
     * Client method
     * @function
     */
    onReady: PropTypes.func,

    /**
     * Client method
     * @function
     */
    onChange: PropTypes.func,

    /**
     * Client method
     * @function
     */
    onFocus: PropTypes.func,

    /**
     * Client method
     * @function
     */
    onBlur: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      ready: false,
    };
  }

  componentDidMount() {
    /**
     * Try mount the card component
     */
    setTimeout(() => {
      this.handleMount();
    });
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;

    /**
     * Try mount the card component
     */
    setTimeout(() => {
      this.handleMount();
    });
  }

  handleMount() {
    /**
     * The Card component already mounted
     */
    if (this.state.mounted) {
      return;
    }
    /**
     * The FramePay script doens't ready
     */
    if (!this.props.state.ready) {
      return;
    }

    const card = this.props.api.card.mount(this.cardNode);
    this.setState({
      mounted: true,
      card,
    });
    card.on('ready', () => {
      this.setState({ ready: true }, () => {
        if (this.props.onReady) {
          this.props.onReady();
        }
      });
    });
    card.on('change', (data) => {
      if (this.props.onChange) {
        this.props.onChange(data);
      }
    });
    card.on('focus', (data) => {
      if (this.props.onFocus) {
        this.props.onFocus(data);
      }
    });
    card.on('blur', (data) => {
      if (this.props.onBlur) {
        this.props.onBlur(data);
      }
    });
    return undefined;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="card" ref={node => this.cardNode = node}>Card...</div>;
  }
}
