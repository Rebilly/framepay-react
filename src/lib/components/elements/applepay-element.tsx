import * as React from 'react';
import FramePayError from '../../framepay-error';
import BaseElement from './base-element';

export default class ApplePayElement extends BaseElement<
    ApplePayProps,
    ApplePayState
> {
    setupElement() {
        const { Rebilly, onTokenReady } = this.props;

        const makeElement = () => {
            // elementNode already checked in BaseElement.handleSetupElement
            // just ts checks fix
            if (!this.elementNode) {
                throw FramePayError({
                    code: FramePayError.codes.elementMountError,
                    details: `ApplePayElement invalid elementNode`
                });
            }

            try {
                return Rebilly.applePay.mount(this.elementNode);
            } catch (e) {
                throw FramePayError({
                    code: FramePayError.codes.elementMountError,
                    details: `ApplePayElement error in remote api call`,
                    trace: e
                });
            }
        };

        const element = makeElement();

        try {
            Rebilly.on('token-ready', (token: string) => {
                if (onTokenReady) {
                    onTokenReady(token);
                }
            });

            this.setState({ element });
        } catch (e) {
            throw FramePayError({
                code: FramePayError.codes.elementMountError,
                details: `ApplePayElement events binding error`,
                trace: e
            });
        }
    }
}
