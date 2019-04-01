import * as React from 'react';
import {BankElementComponentProps, BankElementComponentState} from '../../../types/internal/payment-method';
import BaseElement from './BaseElement';

export default class BankElement extends BaseElement<BankElementComponentProps, BankElementComponentState> {

  setupElement() {
    const {onReady, onChange, onFocus, onBlur, elementType} = this.props;

    // @ts-ignore
    const element = this.props.api.bankAccount.mount(this.elementNode, elementType);
    element.on('ready', () => {
      this.setState({ready: true}, () => {
        if (onReady) {
          onReady();
        }
      });
    });

    // TODO fix callback data types
    // @ts-ignore
    element.on('change', (data: BankPaymentElementChangeData) => {
      if (onChange) {
        onChange(data);
      }
    });
    element.on('focus', () => {
      if (onFocus) {
        onFocus();
      }
    });
    element.on('blur', () => {
      if (onBlur) {
        onBlur();
      }
    });
  }


  render() {
    return <div ref={(node) => this.elementNode = node}/>;
  }
}
