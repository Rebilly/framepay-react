/**
 *
 * Constants file.
 * Links to the remote library FramePay and other settings.
 *
 */

/**
 * Remote FramePay library CDN link.
 */
export const FRAMEPAY_SCRIPT_LINK: string =
    process.env.FRAMEPAY_SCRIPT_LINK ||
    'https://cdn.rebilly.com/framepay/v1/rebilly.js';

/**
 * Remote FramePay style CDN link.
 */
export const FRAMEPAY_STYLE_LINK: string =
    process.env.FRAMEPAY_STYLE_LINK ||
    'https://cdn.rebilly.com/framepay/v1/rebilly.css';
