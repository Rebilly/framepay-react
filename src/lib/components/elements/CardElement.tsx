import * as React from 'react';
import {CardElementComponentProps, CardElementComponentState} from '../../../types/internal/payment-method';
import BaseElement from './BaseElement';

export default class CardElement extends BaseElement<CardElementComponentProps, CardElementComponentState> {

    setupElement() {
        const {onReady, onChange, onFocus, onBlur, elementType} = this.props;

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

        this.setState({element});
    }

    render() {
        return <div ref={(node) => this.elementNode = node}/>;
    }
}
