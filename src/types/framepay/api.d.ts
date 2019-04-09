type PaymentElementEvents = 'ready' | 'change' | 'focus' | 'blur';

type PaymentElements = 'card' | 'bankAccount';

interface PaymentElementOnChangeEventData {
    readonly valid?: boolean;
    readonly error?: object;
    readonly source: string;
}

interface PaymentElement {
    readonly on: <T extends PaymentElementEvents>(
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

/**
 * Card Payment method
 */
declare type CardPaymentElementTypes = 'cardNumber' | 'cardCvv' | 'cardExpiry';

interface CardPaymentMethod extends PaymentMethod {
    readonly mount: (
        node: HTMLElement | HTMLDivElement,
        elementType?: CardPaymentElementTypes
    ) => PaymentElement;
}

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

interface BankPaymentMethod extends PaymentMethod {
    readonly mount: (
        node: HTMLElement | HTMLDivElement,
        elementType?: BankPaymentElementTypes
    ) => PaymentElement;
}

interface BillingAddress {
    readonly firstName: string;
    readonly lastName: string;
    readonly organization?: string;
    readonly address?: string;
    readonly address2?: string;
    readonly city?: string;
    readonly region?: string;
    readonly country?: string;
    readonly postalCode?: string;
    readonly phoneNumbers?: ReadonlyArray<{
        readonly label: string;
        readonly value: string;
    }>;
    readonly emails?: ReadonlyArray<{
        readonly label: string;
        readonly value: string;
    }>;
}

interface TokenExtraData {
    readonly method?: PaymentMethods; // @see https://rebilly.github.io/RebillyAPI/#operation/paymentTokenCreation
    readonly billingAddress?: BillingAddress;
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
        extraData?: TokenExtraData
    ) => void;
}
