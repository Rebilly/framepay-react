type PaymentElementEvents = 'ready' | 'change' | 'focus' | 'blur';
type PaymentMethodTypes = 'bankAccount' | 'card';

interface PaymentElementOnChangeEventData {
    readonly valid?: boolean;
    readonly error?: object;
    readonly source: string;
}

interface PaymentElement {
    readonly on: <T extends PaymentElementEvents, TR>(
        eventType: T,
        callback: (
            data: T extends 'change'
                ? PaymentElementOnChangeEventData
                : undefined
        ) => void
    ) => void;
    readonly unmount: () => void;
    readonly destroy: () => void;
}

interface PaymentMethod {
    readonly mount: (node: HTMLElement | HTMLDivElement) => PaymentElement;
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
declare type CardPaymentElementTypes =
    | 'cardNumber'
    | 'cardNumber'
    | 'cardNumber';

interface CardPaymentMethod extends PaymentMethod {
    readonly mount: (
        node: HTMLElement | HTMLDivElement,
        elementType?: CardPaymentElementTypes
    ) => PaymentElement;
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
declare type BankPaymentElementTypes =
    | 'bankAccountType'
    | 'bankAccountNumber'
    | 'bankRoutingNumber';

interface BankPaymentMethod extends PaymentMethod {
    readonly mount: (
        node: HTMLElement | HTMLDivElement,
        elementType?: BankPaymentElementTypes
    ) => PaymentElement;
}

/**
 * The FramePay api interface (external api)
 */
interface FramePayApi {
    readonly initialize: (settings: FramePaySettings) => void;
    readonly card: CardPaymentMethod;
    readonly bankAccount: BankPaymentMethod;
    readonly createToken: (
        form: HTMLElement | HTMLFormElement,
        extraData: object
    ) => void;
}
