import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import BankElement from '../../../../../../src/lib/components/elements/BankElement';
import FramePayError from '../../../../../../src/lib/FramePayError';

describe('lib/components/elements/BankElement', () => {
    it('should not setup the element while api is not ready', done => {
        const props = Substitute.for<BankElementComponentProps>();
        props.ready.returns(false);

        const spy = jest.spyOn(BankElement.prototype, 'setupElement');

        mount(<BankElement {...props} />);

        process.nextTick(() => {
            expect(spy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should setup the element when api is ready', done => {
        const props = Substitute.for<BankElementComponentProps>();
        props.ready.returns(true);

        const spy = jest.spyOn(BankElement.prototype, 'setupElement');

        const wrapper = mount(
            <BankElement ready={props.ready} api={props.api} />
        );

        process.nextTick(() => {
            expect(spy).toHaveBeenCalled();
            expect(wrapper.state('element')).toBeDefined();
            expect(wrapper.state('mounted')).toEqual(true);
            done();
        });
    });

    it('should fail the element mount on remote error', () => {
        const props = Substitute.for<BankElementComponentProps>();
        props.ready.returns(true);
        // @ts-ignore
        props.api.bankAccount.mount(Arg.any()).returns(new Error(`any error`));

        try {
            mount(<BankElement ready={props.ready} api={props.api} />);
            // never
            expect(true).toEqual(false);
        } catch (error) {
            expect(error.code).toEqual(FramePayError.codes.elementMountError);
        }
    });

    it('should destroy the element on component unmount', done => {
        const props = Substitute.for<BankElementComponentProps>();
        const element = Substitute.for<PaymentElement>();

        element.destroy().mimicks(() => {
            done();
        });

        // @ts-ignore
        props.api.bankAccount.mount(Arg.any(), Arg.any()).returns(element);

        class TmpComponent extends React.Component {
            render() {
                return <BankElement ready={true} api={props.api} />;
            }
        }

        const wrapper = mount(<TmpComponent />);
        wrapper.unmount();
    });

    it('should render the empty div element', () => {
        const props = Substitute.for<BankElementComponentProps>();
        const wrapper = shallow(
            <BankElement ready={props.ready} api={props.api} />
        );
        expect(wrapper.html()).toEqual('<div></div>');
    });
});
