import * as React from 'react';
import FramePayError from '../../framepay-error';
import BaseElement from './base-element';

export default class GooglePayElement extends BaseElement<
    GooglePayProps,
    GooglePayState
> {
    setupElement() {
        const { Rebilly } = this.props;

        const makeElement = () => {
            // elementNode already checked in BaseElement.handleSetupElement
            // just ts checks fix
            if (!this.elementNode) {
                throw FramePayError({
                    code: FramePayError.codes.elementMountError,
                    details: `GooglePayElement invalid elementNode`
                });
            }

            try {
                return Rebilly.googlePay.mount(this.elementNode);
            } catch (e) {
                throw FramePayError({
                    code: FramePayError.codes.elementMountError,
                    details: `GooglePayElement error in remote api call`,
                    trace: e
                });
            }
        };

        const element = makeElement();
        this.setState({ element });
    }
}
