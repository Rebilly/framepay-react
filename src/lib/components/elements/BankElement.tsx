import * as React from 'react';
import FramePayError from '../../FramePayError';
import BaseElement from './BaseElement';

export default class BankElement extends BaseElement<
    BankElementComponentProps,
    BankElementComponentState
> {
    setupElement() {
        const { onReady, onChange, onFocus, onBlur, elementType } = this.props;

        const makeElement = () => {
            // elementNode already checked in BaseElement.handleSetupElement
            // just ts checks fix
            if (!this.elementNode) {
                throw FramePayError({
                    code: FramePayError.codes.elementMountError,
                    details: `BankElement elementType: ${elementType ||
                        'default'}`
                });
            }

            try {
                return this.props.api.bankAccount.mount(
                    this.elementNode,
                    elementType
                );
            } catch (e) {
                throw FramePayError({
                    code: FramePayError.codes.elementMountError,
                    details: `BankElement elementType: ${elementType ||
                        'default'}`,
                    trace: e
                });
            }
        };

        const element = makeElement();

        try {
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
        } catch (e) {
            throw FramePayError({
                code: FramePayError.codes.elementMountError,
                details: `BankElement elementType: ${elementType || 'default'}`,
                trace: e
            });
        }
    }

    render() {
        return <div ref={node => (this.elementNode = node)} />;
    }
}
