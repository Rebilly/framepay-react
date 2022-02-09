/**
 * Settings
 *
 * The settings is something that
 * you could pass to the Rebilly.initialize(settings) method
 * or Rebilly.update(settings) method
 */
interface FramePaySettingsStyles {
    readonly base?: object;
    readonly focus?: object;
    readonly valid?: object;
    readonly invalid?: object;
    readonly buttons?: object;
}

interface FramePaySettingsClasses {
    readonly base?: string;
    readonly focus?: string;
    readonly valid?: string;
    readonly invalid?: string;
    readonly secondary?: string;
    readonly dropdown?: string;
    readonly group?: string;
    readonly buttons?: string;
    readonly webkitAutofill?: string;
}

interface FramePaySettingsIcon {
    readonly display?: boolean;
    readonly color?: string;
}

interface FramePaySettingsCardPlaceholders {
    readonly number?: string;
    readonly expiry?: string;
    readonly cvv?: string;
    readonly expirySeparator?: string;
    readonly expiryMoth?: string;
    readonly expiryYear?: string;
}

interface FramePaySettingsBankTypePlaceholders {
    readonly savings?: string;
    readonly checking?: string;
    readonly other?: string;
}

interface FramePaySettingsBankPlaceholders {
    readonly routingNumber?: string;
    readonly accountNumber?: string;
    readonly type?: FramePaySettingsBankTypePlaceholders;
}

interface FramePaySettingsIBANPlaceholders {
    readonly accountNumber?: string;
}

interface FramePaySettingsPlaceholders {
    readonly card?: FramePaySettingsCardPlaceholders;
    readonly bankAccount?: FramePaySettingsBankPlaceholders;
    readonly iban?: FramePaySettingsIBANPlaceholders;
}

interface FramePayCardBrands {
    readonly allowed?: ReadonlyArray<SupportedCardBrands>;
}

type supportedCardExpiryTypes = 'text' | 'dropdown';

interface FramePayCardExpiry {
    readonly type: supportedCardExpiryTypes;
}

type supportedCardCvvTypes = 'text' | 'password';

interface FramePayCardCVV {
    readonly type: supportedCardCvvTypes;
}

interface FramePayCardSettings {
    readonly expiry?: FramePayCardExpiry;
    readonly cvv?: FramePayCardCVV;
    readonly brands?: FramePayCardBrands;
}

interface ApplePayDisplayOptions {
    readonly buttonType: string;
    readonly buttonColor: string;
    readonly buttonLanguage: string;
}

interface FramePaySettings {
    readonly publishableKey: string;
    readonly organizationId: string;
    readonly websiteId: string;
    readonly locale?: supportedLocales;
    readonly icon?: FramePaySettingsIcon;
    readonly placeholders?: FramePaySettingsPlaceholders;
    readonly style?: FramePaySettingsStyles;
    readonly classes?: FramePaySettingsClasses;
    readonly card?: FramePayCardSettings;
    readonly applePay?: ApplePayDisplayOptions;
}
