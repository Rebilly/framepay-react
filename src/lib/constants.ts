import * as React from 'react';

/**
 *
 * Constants file.
 * Links to the remote library FramePay and other settings.
 *
 */

/**
 * The ReactJS version 14+
 * used in context.ts
 */
export const REACT_VERSION = React.version;

/**
 * Remote FramePay library CDN link.
 */
export const FRAMEPAY_SCRIPT_LINK: string =
    process.env.FRAMEPAY_SCRIPT_LINK ||
    'https://framepay.rebilly.com/rebilly.js';

/**
 * Remote FramePay style CDN link.
 */
export const FRAMEPAY_STYLE_LINK: string =
    process.env.FRAMEPAY_STYLE_LINK ||
    'https://framepay.rebilly.com/rebilly.css';

/**
 * Supported FramePay card types
 */
export const SUPPORTED_CARD_BRANDS: SupportedCardBrandsObject = {
    Amex: SupportedCardBrands.Amex,
    AstroPayCard: SupportedCardBrands.AstroPayCard,
    Cup: SupportedCardBrands.Cup,
    DinersClub: SupportedCardBrands.DinersClub,
    Discover: SupportedCardBrands.Discover,
    JCB: SupportedCardBrands.JCB,
    Maestro: SupportedCardBrands.Maestro,
    MasterCard: SupportedCardBrands.MasterCard,
    Visa: SupportedCardBrands.Visa
};
