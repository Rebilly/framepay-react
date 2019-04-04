import { Arg, Substitute } from '@fluffy-spoon/substitute';

/**
 * @see https://www.npmjs.com/package/@fluffy-spoon/substitute
 */
describe('Mock functionality works correctly', () => {
    it('String property of interface', () => {
        interface Example {
            readonly bar: string;
        }

        const baz = 'baz';
        const foo = Substitute.for<Example>();

        foo.bar.returns(baz);
        const call1 = foo.bar;
        const call2 = foo.bar;
        expect(call1).toEqual(baz);
        expect(call2).toEqual(baz);
    });
    it('Can mock parent interface', () => {
        interface NestedApi {
            readonly nestedMethod: () => boolean;
        }

        interface SuperParent {
            readonly property1: string;
            readonly method1: () => number;
            readonly api: NestedApi;
        }

        interface Parent extends SuperParent {
            readonly property2: string;
            readonly method2: (arg: any) => string;
        }

        interface Child extends Parent {
            readonly bar: string;
        }

        const params = Substitute.for<Child>();

        params.property1.returns('property1-value');
        params.property2.returns('property2-value');
        params.method1().returns(10);
        params.method2(Arg.any()).returns('method2-value');

        // @ts-ignore
        params.api.nestedMethod().returns(false);

        expect(params.property1).toEqual('property1-value');
        expect(params.property2).toEqual('property2-value');
        expect(params.method1()).toEqual(10);
        expect(params.method2(10)).toEqual('method2-value');

        expect(params.api.nestedMethod()).toEqual(false);
    });
});
