import {CardElementComponentProps, CardElementComponentState} from '../../../types/internal/payment-method';
import BaseElement from './BaseElement';
import * as React from 'react';

export default class CardElement extends BaseElement<CardElementComponentProps, CardElementComponentState> {

    setupElement() {
        const {onReady, onChange, onFocus, onBlur, elementType} = this.props;

        console.log('setupElement', elementType);

        // @ts-ignore
        const element = this.props.api.card.mount(this.elementNode, elementType);
        element.on('ready', () => {
            this.setState({ready: true}, () => {
                if (onReady) {
                    onReady();
                }
            });
        });

        // TODO fix callback data types
        // @ts-ignore
        element.on('change', (data: CardPaymentElementChangeData) => {
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
