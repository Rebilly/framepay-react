/**
 * IBAN Payment element
 */

/**
 * IBAN Payment Method
 */
declare type IBANPaymentElementTypes = 'iban';

interface IBANPaymentMethod extends PaymentElementWrapper {
    readonly mount: (
        node: HTMLElement | HTMLDivElement,
        elementType?: IBANPaymentElementTypes
    ) => PaymentElement;
}
