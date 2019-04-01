import { ProviderState } from '../../lib/components/Provider';

interface PaymentMethodComponentState {
  readonly element: null | PaymentElement | PaymentElement
  readonly mounted: boolean
  readonly ready: boolean
}

interface PaymentElementComponentProps extends ProviderState {
  readonly onReady?: () => void,
  readonly onChange?: (data: PaymentElementOnChangeEventData) => void,
  readonly onFocus?: () => void,
  readonly onBlur?: () => void
}

interface BankElementComponentProps extends PaymentElementComponentProps {
  readonly elementType?: BankPaymentElementTypes
}

interface CardElementComponentProps extends PaymentElementComponentProps {
  readonly elementType?: CardPaymentElementTypes
}

interface BankElementComponentState extends PaymentMethodComponentState {
  readonly element: PaymentElement | null
}

interface CardElementComponentState extends PaymentMethodComponentState {
  readonly element: PaymentElement | null
}

