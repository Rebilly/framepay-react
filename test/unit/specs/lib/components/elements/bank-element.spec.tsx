import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import BankElement from '../../../../../../src/lib/components/elements/bank-element';
import FramePayError from '../../../../../../src/lib/framepay-error';

describe('lib/components/elements/BankElement', () => {
    it('should not setup the element while api is not ready', done => {
        const props = Substitute.for<BankProps>();

        const spy = jest.spyOn(BankElement.prototype, 'setupElement');

        mount(
            <BankElement
                {...props}
                Rebilly={{
                    ...props.Rebilly,
                    bankAccount: props.Rebilly.bankAccount,
                    ready: false
                }}
                elementType="bankRoutingNumber"
            />
        );

        process.nextTick(() => {
            expect(spy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should setup the element when api is ready', done => {
        const props = Substitute.for<BankProps>();

        const spy = jest.spyOn(BankElement.prototype, 'setupElement');

        const wrapper = mount(
            <BankElement
                {...props}
                Rebilly={{
                    ...props.Rebilly,
                    bankAccount: props.Rebilly.bankAccount,
                    ready: true
                }}
                elementType="bankAccountType"
            />
        );

        process.nextTick(() => {
            expect(spy).toHaveBeenCalled();
            expect(wrapper.state('element')).toBeDefined();
            expect(wrapper.state('mounted')).toEqual(true);
            done();
        });
    });

    it('should destroy the element on component unmount', done => {
        const props = Substitute.for<BankProps>();
        const element = Substitute.for<PaymentElement>();

        element.destroy().mimicks(() => {
            done();
        });

        props.Rebilly.bankAccount.mount(Arg.any(), Arg.any()).returns(element);

        class TmpComponent extends React.Component {
            render() {
                return (
                    <BankElement
                        {...props}
                        Rebilly={{
                            ...props.Rebilly,
                            bankAccount: props.Rebilly.bankAccount,
                            ready: true
                        }}
                        elementType="bankRoutingNumber"
                    />
                );
            }
        }

        const wrapper = mount(<TmpComponent />);
        process.nextTick(() => {
            wrapper.unmount();
        });
    });

    it('should render the empty div element', () => {
        const props = Substitute.for<BankProps>();

        props.Rebilly.ready.returns(true);

        const wrapper = shallow(
            <BankElement {...props} Rebilly={props.Rebilly} />
        );
        expect(wrapper.html()).toEqual('<div></div>');
    });

    it('should fail the element mount on remote error', () => {
        const props = Substitute.for<BankProps>();

        try {
            mount(
                <BankElement
                    {...props}
                    Rebilly={{
                        ...props.Rebilly,
                        bankAccount: {
                            ...props.Rebilly.bankAccount,
                            mount: null
                        },
                        ready: true
                    }}
                    elementType="bankAccountNumber"
                />
            );
            // never
            expect(true).toEqual(false);
        } catch (error) {
            expect(error.code).toEqual(FramePayError.codes.elementMountError);
        }
    });
});
