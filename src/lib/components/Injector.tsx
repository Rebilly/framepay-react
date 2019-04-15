// tslint:disable:max-classes-per-file

import * as React from 'react';
import { ContextConsumer } from '../context';
import BankElementComponent from './elements/BankElement';
import CardElementComponent from './elements/CardElement';

import {
    FramePayBankProps,
    FramePayCardProps,
    FramePayComponentProps
} from '../../types/injector';

const makeRebillyProps = (data: FramePayContext): RebillyProps =>
    Object.assign(Object.create(data.api || {}), {
        error: data.error,
        ready: data.ready
    });

function Hoc<P extends object>(
    name: string,
    WrappedComponent: React.ComponentType<P>,
    provider: (data: FramePayContext) => object
) {
    return class extends React.Component<P, {}> {
        static readonly displayName = `withFramePay${name}(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`;

        render() {
            return (
                <ContextConsumer>
                    {data => {
                        const provided = provider(data);
                        return (
                            <WrappedComponent
                                {...{ ...this.props, ...provided }}
                            />
                        );
                    }}
                </ContextConsumer>
            );
        }
    };
}

/**
 * Returns the PaymentMethod elements.
 *
 * @param type {string} PaymentElements
 */
const elementsFabric = (type: PaymentElements): object => {
    if (type === 'bankAccount') {
        /**
         * BankAccount
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-bankaccount-mount
         */

        /**
         * Bank AccountType Element
         */
        const BankAccountTypeElement = Hoc(
            'BankAccountTypeElement',
            BankElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'bankAccountType'
                } as BankProps)
        );

        /**
         * BankRoutingNumber Element
         */
        const BankRoutingNumberElement = Hoc(
            'BankRoutingNumberElement',
            BankElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'bankRoutingNumber'
                } as BankProps)
        );

        /**
         * Bank AccountNumber Element
         */
        const BankAccountNumberElement = Hoc(
            'BankAccountNumberElement',
            BankElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'bankAccountNumber'
                } as BankProps)
        );

        return {
            BankAccountNumberElement,
            BankAccountTypeElement,
            BankRoutingNumberElement
        };
    }

    if (type === 'card') {
        /**
         * Default Card Element
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-card-mount
         */
        const CardElement = Hoc(
            'CardElement',
            CardElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data)
                } as CardProps)
        );

        /**
         * Card CVV Element
         */
        const CardCvvElement = Hoc(
            'CardCvvElement',
            CardElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'cardCvv'
                } as CardProps)
        );

        /**
         * Card Expiry Element
         */
        const CardExpiryElement = Hoc(
            'CardExpiryElement',
            CardElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'cardExpiry'
                } as CardProps)
        );

        /**
         * Card Number Element
         */
        const CardNumberElement = Hoc(
            'CardNumberElement',
            CardElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'cardNumber'
                } as CardProps)
        );

        return {
            CardCvvElement,
            CardElement,
            CardExpiryElement,
            CardNumberElement
        };
    }

    /**
     * Throw the error by default.
     */
    throw new Error(
        `Invalid PaymentMethod type, see PaymentMethodTypes declaration`
    );
};

export function withFramePay<OriginalProps extends object>(
    WrappedComponent: React.ComponentType<
        OriginalProps & FramePayComponentProps
    >
) {
    const elements = {
        ...elementsFabric('card'),
        ...elementsFabric('bankAccount')
    };
    return class extends React.Component<
        OriginalProps & FramePayComponentProps,
        {}
    > {
        static readonly displayName = `withFramePay${name}(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`;

        render() {
            return (
                <ContextConsumer>
                    {(data: FramePayContext) => {
                        return (
                            <WrappedComponent
                                {...{
                                    ...this.props,
                                    ...elements,
                                    Rebilly: makeRebillyProps(data)
                                }}
                            />
                        );
                    }}
                </ContextConsumer>
            );
        }
    };
}

export function withFramePayCardComponent<OriginalProps extends object>(
    WrappedComponent: React.ComponentType<OriginalProps & FramePayCardProps>
) {
    const elements = elementsFabric('card');
    return class extends React.Component<
        OriginalProps & FramePayCardProps,
        {}
    > {
        static readonly displayName = `withFramePayCardComponent${name}(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`;
        render() {
            return (
                <ContextConsumer>
                    {(data: FramePayContext) => {
                        return (
                            <WrappedComponent
                                {...{
                                    ...this.props,
                                    ...elements,
                                    Rebilly: makeRebillyProps(data)
                                }}
                            />
                        );
                    }}
                </ContextConsumer>
            );
        }
    };
}

export function withFramePayBankComponent<OriginalProps extends object>(
    WrappedComponent: React.ComponentType<OriginalProps & FramePayBankProps>
) {
    const elements = elementsFabric('bankAccount');
    return class extends React.Component<
        OriginalProps & FramePayBankProps,
        {}
    > {
        static readonly displayName = `withFramePayBankComponent${name}(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`;

        render() {
            return (
                <ContextConsumer>
                    {(data: FramePayContext) => {
                        return (
                            <WrappedComponent
                                {...{
                                    ...this.props,
                                    ...elements,
                                    Rebilly: makeRebillyProps(data)
                                }}
                            />
                        );
                    }}
                </ContextConsumer>
            );
        }
    };
}
