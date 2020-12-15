/**
 * DigitalWallet Payment element
 */

/**
 * DigitalWallet Payment Method
 */
declare type DigitalWalletPaymentElementTypes = {
    readonly type: 'googlePay';
    readonly form: HTMLElement | React.Component;
    readonly extraData?: Object;
};

interface DigitalWalletPaymentMethod extends PaymentElementWrapper {
    readonly mount: (
        node: HTMLElement | HTMLDivElement,
        options?: DigitalWalletPaymentElementTypes
    ) => PaymentElement;
}
