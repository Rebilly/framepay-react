/**
 * Bank Payment element
 */

/**
 * Bank Payment Method
 */
declare type BankPaymentElementTypes =
    | 'bankAccountType'
    | 'bankAccountNumber'
    | 'bankRoutingNumber';

interface BankPaymentMethod extends PaymentElementWrapper {
    readonly mount: (
        node: HTMLElement | HTMLDivElement,
        elementType?: BankPaymentElementTypes
    ) => PaymentElement;
}
