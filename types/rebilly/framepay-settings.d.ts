interface FramePaySettingsStyles {
    readonly base: object;
    readonly invalid: object;
}

interface FramePaySettingsClasses {
    readonly base: string;
    readonly focus: string;
    readonly valid: string;
    readonly invalid: string;
    readonly buttons: string;
    readonly webkitAutofill: string;
}

interface FramePaySettingsIcon {
    readonly foobar: any;
    readonly display: boolean;
    readonly color: string;
}

interface FramePaySettingsCardPlaceholders {
    readonly number: string;
    readonly expiry: string;
    readonly cvv: string;
}

interface FramePaySettingsBankPlaceholders {
    readonly routingNumber: string;
    readonly accountNumber: string;
}

interface FramePaySettingsIBANPlaceholders {
    readonly accountNumber: string;
}

interface FramePaySettingsPlaceholders {
    readonly card: FramePaySettingsCardPlaceholders;
    readonly bankAccount: FramePaySettingsBankPlaceholders;
    readonly iban: FramePaySettingsIBANPlaceholders;
}

interface FramePayCardBrands {
    readonly allowed: ReadonlyArray<SupportedCardBrands>
}

interface FramePayCardSettings {
    readonly brands: FramePayCardBrands
}

interface FramePaySettings {
    readonly publishableKey: string;
    readonly style?: FramePaySettingsStyles;
    readonly classes?: FramePaySettingsClasses;
    readonly icon?: FramePaySettingsIcon;
    readonly placeholders?: FramePaySettingsPlaceholders;
    readonly card?: FramePayCardSettings
}
