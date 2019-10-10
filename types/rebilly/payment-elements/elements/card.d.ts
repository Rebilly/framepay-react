/**
 * Card Payment element
 */

/**
 * Card Payment method
 */
declare type CardPaymentElementTypes = 'cardNumber' | 'cardCvv' | 'cardExpiry';

interface CardPaymentElement extends PaymentElementWrapper {
    readonly mount: (
        node: HTMLElement | HTMLDivElement,
        elementType?: CardPaymentElementTypes
    ) => PaymentElement;
}
