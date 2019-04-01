interface RemoteFramePayApi {
  readonly initialize: (settings: FramePaySettings) => void
  readonly card: CardPaymentMethod
  readonly bankAccount: BankPaymentMethod
  readonly createToken: (form: HTMLElement | HTMLFormElement, extraData: object) => void
}
