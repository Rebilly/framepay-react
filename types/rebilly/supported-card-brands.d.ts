declare const enum SupportedCardBrands {
    Amex = 'American Express',
    AstroPayCard = 'AstroPay Card',
    Cup = 'ChinaUnionPay',
    DinersClub = 'Diners Club',
    Discover = 'Discover',
    JCB = 'JCB',
    Maestro = 'Maestro',
    MasterCard = 'MasterCard',
    Visa = 'Visa'
}

type SupportedCardBrandsObject = {
    readonly [key in keyof typeof SupportedCardBrands]: SupportedCardBrands;
};
