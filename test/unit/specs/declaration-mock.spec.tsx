import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { mount } from 'enzyme';
import * as React from 'react';

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

    it('Extended calls on the same level works correctly', () => {
        interface Element {
            readonly destroy: () => void;
        }

        interface ParentMethod {
            readonly mount: () => Element;
        }

        interface ChildMethod1 extends ParentMethod {
            readonly name: string;
        }

        interface ChildMethod2 extends ParentMethod {
            readonly name: string;
        }

        interface Api {
            readonly child1: ChildMethod1;
            readonly child2: ChildMethod2;
        }

        const api = Substitute.for<Api>();
        const spy1 = jest.fn();
        const spy2 = jest.fn();

        // @ts-ignore
        api.child1.mount().returns(Substitute.for<Element>());
        // @ts-ignore
        api.child2.mount().returns(Substitute.for<Element>());

        api.child1
            .mount()
            .destroy()
            // @ts-ignore
            .mimicks(spy1);

        api.child2
            .mount()
            .destroy()
            // @ts-ignore
            .mimicks(spy2);

        const el = api.child1.mount();
        el.destroy();

        expect(spy1).toBeCalledTimes(1);
        expect(spy2).not.toHaveBeenCalled();

        interface ComponentProps {
            readonly api: Api;
        }

        interface ComponentState {
            readonly element: Element;
        }

        class TmpParentComponent extends React.Component<
            ComponentProps,
            ComponentState
        > {
            componentDidMount() {
                this.setState({ element: this.props.api.child1.mount() });
            }

            componentWillUnmount() {
                this.state.element.destroy();
            }

            render() {
                return <div />;
            }
        }

        const wrapper = mount(<TmpParentComponent api={api} />);
        expect(spy1).toBeCalledTimes(1);
        expect(spy2).not.toHaveBeenCalled();

        wrapper.unmount();

        expect(spy1).toBeCalledTimes(2);
        expect(spy2).not.toHaveBeenCalled();
    });
});
