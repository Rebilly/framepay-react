import * as React from 'react';
import FramePayError from '../../framepay-error';
import BaseElement from './base-element';

export default class DigitalWalletElement extends BaseElement<
    DigitalWalletProps,
    DigitalWalletState
> {
    setupElement() {
        const {
            Rebilly,
            onReady,
            onChange,
            onFocus,
            onBlur,
            onTokenReady,
            extraData,
            form
        } = this.props;

        const makeElement = () => {
            // elementNode already checked in BaseElement.handleSetupElement
            // just ts checks fix
            if (!this.elementNode) {
                throw FramePayError({
                    code: FramePayError.codes.elementMountError,
                    details: `DigitalWalletElement invalid elementNode`
                });
            }

            try {
                return Rebilly.digitalWallet.mount(this.elementNode, {
                    extraData,
                    form,
                    type: 'googlePay'
                });
            } catch (e) {
                throw FramePayError({
                    code: FramePayError.codes.elementMountError,
                    details: `DigitalWalletElement error in remote api call`,
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

            Rebilly.on('token-ready', (token: string) => {
                if (onTokenReady) {
                    onTokenReady(token);
                }
            });

            this.setState({ element });
        } catch (e) {
            throw FramePayError({
                code: FramePayError.codes.elementMountError,
                details: `DigitalWalletElement events binding error`,
                trace: e
            });
        }
    }
}
