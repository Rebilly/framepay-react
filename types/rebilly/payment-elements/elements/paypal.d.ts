/**
 * Paypal Payment element
 */

/**
 * Paypal Payment Method
 */
declare type PaypalPaymentElementTypes = {
    readonly form: HTMLElement | React.Component;
    readonly extraData?: Object;
};

interface PaypalPaymentMethod extends PaymentElementWrapper {
    readonly mount: (
        node: HTMLElement | HTMLDivElement,
        options?: PaypalPaymentElementTypes
    ) => PaymentElement;
}
