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
    readonly onTokenReady?: (data: string) => void;
}

interface DigitalWalletProps extends PaymentComponentProps {
    readonly onTokenReady?: (data: string) => void;
    readonly form: HTMLElement | React.Component;
    readonly extraData: Object;
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

interface DigitalWalletState extends PaymentComponentState {
    readonly element: PaymentElement | null;
}
