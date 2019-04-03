import * as React from 'react';
import {
    CardElementComponentProps,
    CardElementComponentState
} from '../../../types/payment-method-elements';
import BaseElement from './BaseElement';

export default class CardElement extends BaseElement<
    CardElementComponentProps,
    CardElementComponentState
> {
    setupElement() {
        const { onReady, onChange, onFocus, onBlur, elementType } = this.props;

        // elementNode already checked in BaseElement.handleSetupElement
        // just ts checks fix
        if (this.elementNode === null) {
            return;
        }
        const element = this.props.api.card.mount(
            this.elementNode,
            elementType
        );

        element.on('ready', () => {
            this.setState({ ready: true }, () => {
                if (onReady) {
                    onReady();
                }
            });
        });

        element.on('change', (data: PaymentElementOnChangeEventData) => {
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

        this.setState({ element });
    }

    render() {
        return <div ref={node => (this.elementNode = node)} />;
    }
}
