import test from 'ava';
import * as lib from './index';

const exportKeys: ReadonlyArray<string> = [
    'Provider',
    'withFramePayCardComponent',
    'withFramePayBankComponent'
].sort();

test('Library export keys should be correctly', t => {
    t.deepEqual(Object.keys(lib).sort(), exportKeys);
});
