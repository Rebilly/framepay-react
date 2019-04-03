type PaymentElementEvents = 'ready' | 'change' | 'focus' | 'blur';

type PaymentElements = 'card' | 'bankAccount';

/**
 * @see https://rebilly.github.io/RebillyAPI/#operation/paymentTokenCreation
 */
type PaymentMethods =
    | 'payment-card'
    | 'ach'
    | 'bank-account'
    | 'cash'
    | 'paypal'
    | 'Alipay'
    | 'AstroPay Card'
    | 'bank-transfer'
    | 'bitcoin'
    | 'Boleto'
    | 'cash-deposit'
    | 'CASHlib'
    | 'CashToCode'
    | 'China UnionPay'
    | 'domestic-cards'
    | 'echeck'
    | 'ecoPayz'
    | 'ecoVoucher'
    | 'EPS'
    | 'ePay.bg'
    | 'Flexepin'
    | 'Giropay'
    | 'Gpaysafe'
    | 'iDebit'
    | 'iDEAL'
    | 'InstaDebit'
    | 'instant-bank-transfer'
    | 'Interac-online'
    | 'Interac-eTransfer'
    | 'invoice'
    | 'Jeton'
    | 'Klarna'
    | 'miscellaneous'
    | 'Neteller'
    | 'Nordea-Solo'
    | 'OchaPay'
    | 'online-bank-transfer'
    | 'Onlineueberweisen'
    | 'Paysafecard'
    | 'Pay4Fun'
    | 'phone'
    | 'POLi'
    | 'Przelewy24'
    | 'QQPay'
    | 'Resurs'
    | 'SEPA'
    | 'Skrill'
    | 'Skrill Rapid Transfer'
    | 'SMSVoucher'
    | 'SparkPay'
    | 'Trustly'
    | 'UPayCard'
    | 'voucher'
    | 'WeChat Pay';

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

interface TokenExtraData {
    readonly method?: PaymentMethods;
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
