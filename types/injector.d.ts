export interface FramePayComponentProps {
    // Rebilly Api
    readonly Rebilly: RebillyProps;

    // Card Components
    readonly CardCvvElement: React.Component;
    readonly CardElement: React.Component;
    readonly CardExpiryElement: React.Component;
    readonly CardNumberElement: React.Component;

    // Bank Components
    readonly BankAccountNumberElement: React.Component;
    readonly BankAccountTypeElement: React.Component;
    readonly BankRoutingNumberElement: React.Component;

    // IBAN components
    readonly IBANElement: React.Component;

    // Google Pay (digital wallet) and Apple Pay components
    readonly ApplePayElement: React.Component;
    readonly DigitalWalletElement: React.Component;
}

export interface FramePayCardProps {
    readonly Rebilly: RebillyProps;
    readonly CardCvvElement: React.Component;
    readonly CardElement: React.Component;
    readonly CardExpiryElement: React.Component;
    readonly CardNumberElement: React.Component;
}

export interface FramePayBankProps {
    readonly Rebilly: RebillyProps;
    readonly BankAccountNumberElement: React.Component;
    readonly BankAccountTypeElement: React.Component;
    readonly BankRoutingNumberElement: React.Component;
}

export interface FramePayIBANProps {
    readonly Rebilly: RebillyProps;
    readonly IBANElement: React.Component;
}

export interface FramePayApplePayProps {
    readonly Rebilly: RebillyProps;
    readonly ApplePayElement: React.Component;
}

export interface FramePayDigitalWalletProps {
    readonly Rebilly: RebillyProps;
    readonly DigitalWalletElement: React.Component;
}
