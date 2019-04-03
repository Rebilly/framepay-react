import * as lib from '../src/index';

const exportKeys: ReadonlyArray<string> = [
    'Provider',
    'withFramePayCardComponent',
    'withFramePayBankComponent'
].sort();

describe('Simple expression tests', () => {
    test('Check literal value', () => {
        expect(Object.keys(lib).sort()).toEqual(exportKeys);
    });
});
