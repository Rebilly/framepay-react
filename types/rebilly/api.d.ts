/**
 * The api is something that should be passed
 * to the createToken Rebilly api method
 */
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
    readonly leadSource?: object;
}

type RebillyEventDelegate =  (error: string) => void;

/**
 * The FramePay api interface (external api)
 */
interface RebillyApi {
    readonly initialize: (settings: FramePaySettings) => void;
    readonly card: CardPaymentElement;
    readonly bankAccount: BankPaymentMethod;
    readonly iban: IBANPaymentMethod;
    readonly applePay: ApplePayPaymentMethod;
    readonly googlePay: GooglePayPaymentMethod;
    readonly paypal: PaypalPaymentMethod;
    readonly createToken: (
        form: HTMLElement | HTMLFormElement,
        extraData?: TokenExtraData
    ) => void;

    readonly on: (
        event: initRebillyEvents,
        callback: RebillyEventDelegate
    ) => void;

    readonly off: (
        event: initRebillyEvents,
        callback: RebillyEventDelegate
    ) => void;
}
