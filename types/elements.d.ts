/**
 * framepay-react react element types
 */
interface RebillyProps extends RebillyApi {
    readonly error: FramePayErrorCode | null;
    readonly ready: boolean;
}

interface PaymentComponentProps extends RebillyProps {
    readonly Rebilly: RebillyProps;
    readonly id?: string;
    readonly onReady?: () => void;
    readonly onChange?: (data: PaymentElementOnChangeEventData) => void;
    readonly onFocus?: () => void;
    readonly onBlur?: () => void;
}

interface PaymentComponentState {
    readonly element: null | PaymentElement | PaymentElement;
    readonly mounted: boolean;
    readonly ready: boolean;
}

interface BankProps extends PaymentComponentProps {
    readonly elementType: BankPaymentElementTypes;
}

interface IBANProps extends PaymentComponentProps {
    readonly elementType: IBANPaymentElementTypes;
}

interface CardProps extends PaymentComponentProps {
    readonly elementType?: CardPaymentElementTypes;
}

interface ApplePayProps extends RebillyProps {
    readonly Rebilly: RebillyProps;
    readonly id?: string;
}

interface GooglePayProps extends RebillyProps {
    readonly Rebilly: RebillyProps;
    readonly id?: string;
}

interface PaypalProps extends RebillyProps {
    readonly Rebilly: RebillyProps;
    readonly id?: string;
}

interface BankState extends PaymentComponentState {
    readonly element: PaymentElement | null;
}

interface CardState extends PaymentComponentState {
    readonly element: PaymentElement | null;
}

interface IBANState extends PaymentComponentState {
    readonly element: PaymentElement | null;
}

interface ApplePayState extends PaymentComponentState {
    readonly element: PaymentElement | null;
}

interface GooglePayState extends PaymentComponentState {
    readonly element: PaymentElement | null;
}

interface PaypalState extends PaymentComponentState {
    readonly element: PaymentElement | null;
}
