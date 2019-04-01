type PaymentElementEvents = 'ready' | 'change' | 'focus' | 'blur'

interface PaymentElementOnChangeEventData {
    readonly valid?: boolean
    readonly error?: object
    readonly source: string
}

interface PaymentElement {
    // todo declare callback data object
    readonly on: (eventType: PaymentElementEvents, callback: (data: PaymentElementOnChangeEventData | undefined) => void) => void
    readonly unmount: () => void
    readonly destroy: () => void
}


interface PaymentMethod {
    readonly mount: (node: HTMLElement | HTMLDivElement) => PaymentElement
}

/**
 * Card Payment element
 */

// interface CardPaymentElementChangeData {
//   readonly error?: boolean
// }

/**
 * Card Payment method
 */
declare type CardPaymentElementTypes = 'cardNumber' | 'cardNumber' | 'cardNumber'

interface CardPaymentMethod extends PaymentMethod {
    readonly mount: (node: HTMLElement | HTMLDivElement, elementType?: CardPaymentElementTypes) => PaymentElement
}

/**
 * Bank Payment element
 */

// interface BankPaymentElementChangeData {
//   readonly error?: boolean
// }

/**
 * Bank Payment Method
 */
declare type BankPaymentElementTypes = 'bankAccountType' | 'bankAccountNumber' | 'bankRoutingNumber'

interface BankPaymentMethod extends PaymentMethod {
    readonly mount: (node: HTMLElement | HTMLDivElement, elementType?: BankPaymentElementTypes) => PaymentElement
}
