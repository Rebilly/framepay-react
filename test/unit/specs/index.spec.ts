import * as lib from '../../../src/index';

const exportKeys: ReadonlyArray<string> = [
    'FramePayProvider',
    'withFramePayCardComponent',
    'withFramePayBankComponent'
].sort();

describe('lib/index', () => {
    it('Library exports list correctly', () => {
        expect(Object.keys(lib).sort()).toEqual(exportKeys);
    });
});
