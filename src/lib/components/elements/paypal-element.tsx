import * as React from 'react';
import FramePayError from '../../framepay-error';
import BaseElement from './base-element';

export default class PaypalElement extends BaseElement<
    PaypalProps,
    PaypalState
> {
    setupElement() {
        const { Rebilly, onTokenReady } = this.props;

        const makeElement = () => {
            // elementNode already checked in BaseElement.handleSetupElement
            // just ts checks fix
            if (!this.elementNode) {
                throw FramePayError({
                    code: FramePayError.codes.elementMountError,
                    details: `PaypalElement invalid elementNode`
                });
            }

            try {
                return Rebilly.paypal.mount(this.elementNode);
            } catch (e) {
                throw FramePayError({
                    code: FramePayError.codes.elementMountError,
                    details: `PaypalElement error in remote api call`,
                    trace: e
                });
            }
        };

        const element = makeElement();

        try {
            this.addEventHandler('token-ready', (token: string) => {
                if (onTokenReady) {
                    onTokenReady(token);
                }
            });

            this.setState({ element });
        } catch (e) {
            throw FramePayError({
                code: FramePayError.codes.elementMountError,
                details: `PaypalElement events binding error`,
                trace: e
            });
        }
    }
}
