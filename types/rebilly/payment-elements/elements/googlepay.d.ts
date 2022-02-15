/**
 * GooglePay Payment element
 */

/**
 * GooglePay Payment Method
 */
declare type GooglePayPaymentElementTypes = {
    readonly form: HTMLElement | React.Component;
    readonly extraData?: Object;
};

interface GooglePayPaymentMethod extends PaymentElementWrapper {
    readonly mount: (
        node: HTMLElement | HTMLDivElement,
        options?: GooglePayPaymentElementTypes
    ) => PaymentElement;
}
