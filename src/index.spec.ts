import * as lib from './index';

const exportKeys: ReadonlyArray<string> = [
    'SUPPORTED_CARD_BRANDS',
    'FramePayProvider',
    'withFramePay',
    'withFramePayApplePayComponent',
    'withFramePayCardComponent',
    'withFramePayBankComponent',
    'withFramePayGooglePayComponent',
    'withFramePayIBANComponent',
    'withFramePayPaypalComponent'
].sort();

describe('lib/index', () => {
    it('Library exports list correctly', () => {
        expect(Object.keys(lib).sort()).toEqual(exportKeys);
    });
});
