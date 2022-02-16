// tslint:disable:max-classes-per-file

import * as React from 'react';
import { ContextConsumer } from '../context';
import ApplePayElementComponent from './elements/applepay-element';
import BankElementComponent from './elements/bank-element';
import CardElementComponent from './elements/card-element';
import DigitalWalletElementComponent from './elements/digitalwallet-element';
import GooglePayElementComponent from './elements/googlepay-element';
import IBANElementComponent from './elements/iban-element';

import {
    FramePayApplePayProps,
    FramePayBankProps,
    FramePayCardProps,
    FramePayComponentProps,
    FramePayGooglePayProps,
    FramePayIBANProps
} from '../../../types/injector';

const makeRebillyProps = (data: FramePayContext): RebillyProps =>
    Object.assign(Object.create(data.api || {}), {
        error: data.error,
        ready: data.ready
    }) as RebillyProps;

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
                    {(data: FramePayContext) => {
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
 * Returns the PaymentElementWrapper elements.
 *
 * @param type {string} PaymentElements
 */
const elementsFabric = (type: PaymentElements): object => {
    if (type === 'iban') {
        /**
         * IBAN
         */

        /**
         * IBAN number element
         */
        const IBANElement = Hoc(
            'IBANElement',
            IBANElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data),
                    elementType: 'iban'
                } as IBANProps)
        );

        return {
            IBANElement
        };
    }

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

    if (type === 'applePay') {
        /**
         * Apple Pay
         */

        const ApplePayElement = Hoc(
            'ApplePayElement',
            ApplePayElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data)
                } as ApplePayProps)
        );

        return {
            ApplePayElement
        };
    }

    if (type === 'googlePay') {
        /**
         * Google Pay
         */

        const GooglePayElement = Hoc(
            'GooglePayElement',
            GooglePayElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data)
                } as GooglePayProps)
        );

        return {
            GooglePayElement
        };
    }

    if (type === 'digitalWallet') {
        /**
         * Digital Wallet
         */

        const DigitalWalletElement = Hoc(
            'DigitalWalletElement',
            DigitalWalletElementComponent,
            (data: FramePayContext) =>
                ({
                    Rebilly: makeRebillyProps(data)
                } as DigitalWalletProps)
        );

        return {
            DigitalWalletElement
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
        ...elementsFabric('bankAccount'),
        ...elementsFabric('iban'),
        ...elementsFabric('applePay'),
        ...elementsFabric('digitalWallet')
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

export function withFramePayIBANComponent<OriginalProps extends object>(
    WrappedComponent: React.ComponentType<OriginalProps & FramePayIBANProps>
) {
    const elements = elementsFabric('iban');
    return class extends React.Component<
        OriginalProps & FramePayIBANProps,
        {}
    > {
        static readonly displayName = `withFramePayIBANComponent${name}(${WrappedComponent.displayName ||
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

export function withFramePayApplePayComponent<OriginalProps extends object>(
    WrappedComponent: React.ComponentType<OriginalProps & FramePayApplePayProps>
) {
    const elements = elementsFabric('applePay');
    return class extends React.Component<
        OriginalProps & FramePayApplePayProps,
        {}
    > {
        static readonly displayName = `withFramePayApplePayComponent${name}(${WrappedComponent.displayName ||
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

export function withFramePayGooglePayComponent<OriginalProps extends object>(
    WrappedComponent: React.ComponentType<
        OriginalProps & FramePayGooglePayProps
    >
) {
    const elements = elementsFabric('googlePay');
    return class extends React.Component<
        OriginalProps & FramePayGooglePayProps,
        {}
    > {
        static readonly displayName = `withFramePayGooglePayComponent${name}(${WrappedComponent.displayName ||
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
