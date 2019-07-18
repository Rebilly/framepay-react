import * as lib from '../../../src/index';

const exportKeys: ReadonlyArray<string> = [
    'FramePayProvider',
    'withFramePay',
    'withFramePayCardComponent',
    'withFramePayBankComponent',
    'withFramePayIBANComponent'
].sort();

describe('lib/index', () => {
    it('Library exports list correctly', () => {
        expect(Object.keys(lib).sort()).toEqual(exportKeys);
    });
});
