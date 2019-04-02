/**
 *
 * Constants file.
 * Links to the remote library FramePay and other settings.
 *
 */

const DEVELOPMENT = process.env.NODE_ENV === 'development';

/**
 * Disable cache CDN links in development mode
 */
const LINK_CACHE_PREFIX = DEVELOPMENT ? `v=${new Date().getTime()}` : '';

/**
 * Remote FramePay library CDN link.
 */
export const FRAMEPAY_SCRIPT_LINK: string = `http://localhost:8080/dist/rebilly.js?${LINK_CACHE_PREFIX}`;

/**
 * Remote FramePay style CDN link.
 */
export const FRAMEPAY_STYLE_LINK: string = `https://cdn.rebilly.com/framepay/v1/rebilly.css?${LINK_CACHE_PREFIX}`;
