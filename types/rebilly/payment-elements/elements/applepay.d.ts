/**
 * ApplePay Payment element
 */

/**
 * ApplePay Payment Method
 */
declare type ApplePayPaymentElementTypes = {
    readonly form: HTMLElement | React.Component;
    readonly extraData?: Object;
};

interface ApplePayPaymentMethod extends PaymentElementWrapper {
    readonly mount: (
        node: HTMLElement | HTMLDivElement,
        options?: ApplePayPaymentElementTypes
    ) => PaymentElement;
}
