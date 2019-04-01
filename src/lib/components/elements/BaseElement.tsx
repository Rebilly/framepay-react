import * as React from 'react';
import { PaymentElementComponentProps, PaymentMethodComponentState } from '../../../types/internal/payment-method';

export default class BaseElement<T extends PaymentElementComponentProps, S extends PaymentMethodComponentState> extends React.Component<T, S> {

  // TODO
  // @ts-ignore
  readonly state: PaymentMethodComponentState = {
    element: null,
    mounted: false,
    ready: false
  };

  protected elementNode: HTMLDivElement | null = null;

  componentWillUnmount() {
    if (this.state.element) {
      this.state.element.unmount();
      this.state.element.destroy();
    }
  }

  componentDidMount() {
    this.handleSetupElement();
  }

  componentWillReceiveProps(nextProps: any) {
    // @ts-ignore
    this.props = nextProps;
    this.handleSetupElement();
  }

  setupElement() {
    throw new Error(`Please implement method setupElement`);
  }

  handleSetupElement() {
    if (!this.props.ready) {
      /**
       * The remote api isn't ready
       */
      return;
    }
    if (this.state.mounted) {
      /**
       * The field already mounted
       */
      return;
    }
    if (!this.elementNode || this.elementNode === null) {
      /**
       * Component dom element not mounted
       */
      return;
    }
    /**
     * Setup field
     */
    this.setState({ mounted: true }, this.setupElement);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div ref={(node) => this.elementNode = node}/>;
  }
}
