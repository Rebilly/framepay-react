import { Substitute } from '@fluffy-spoon/substitute';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import IBANElement from '../../../../../../src/lib/components/elements/iban-element';
import FramePayError from '../../../../../../src/lib/framepay-error';

describe('lib/components/elements/IBANElement', () => {
    it('should not setup the element while api is not ready', done => {
        const props = Substitute.for<IBANProps>();

        props.Rebilly.ready.returns(false);

        const spy = jest.spyOn(IBANElement.prototype, 'setupElement');

        mount(<IBANElement {...props} Rebilly={props.Rebilly} />);

        process.nextTick(() => {
            expect(spy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should setup the element when api is ready', done => {
        const props = Substitute.for<IBANProps>();
        const spy = jest.spyOn(IBANElement.prototype, 'setupElement');

        props.Rebilly.ready.returns(false);

        const wrapper = mount(
            <IBANElement {...props} Rebilly={props.Rebilly} />
        );

        process.nextTick(() => {
            expect(spy).toHaveBeenCalledTimes(0);
            expect(wrapper.state('mounted')).toEqual(false);

            const nextProps = Substitute.for<IBANProps>();

            wrapper.setProps({
                ...nextProps,
                Rebilly: { iban: nextProps.Rebilly.iban, ready: true }
            });

            expect(spy).toHaveBeenCalledTimes(1);
            expect(wrapper.state('element')).toBeDefined();
            expect(wrapper.state('mounted')).toEqual(true);
            done();
        });
    });

    it('should render the empty div element', () => {
        const props = Substitute.for<IBANProps>();
        const wrapper = shallow(
            <IBANElement {...props} Rebilly={props.Rebilly} />
        );
        expect(wrapper.html()).toEqual('<div></div>');
    });

    it('should destroy the element on component unmount', done => {
        const props = Substitute.for<IBANProps>();
        const element = Substitute.for<PaymentElement>();

        element.destroy().mimicks(() => {
            done();
        });

        // props.Rebilly.iban.mount(Arg.any(), Arg.any()).returns(element);

        class TmpComponent extends React.Component {
            render() {
                return (
                    <IBANElement
                        {...props}
                        Rebilly={{
                            ...props.Rebilly,
                            iban: {
                                ...props.Rebilly.iban,
                                mount: () => element
                            },
                            ready: true
                        }}
                    />
                );
            }
        }

        const wrapper = mount(<TmpComponent />);
        process.nextTick(() => {
            wrapper.unmount();
        });
    });

    it('should fail the element mount on remote error', () => {
        const props = Substitute.for<IBANProps>();

        try {
            mount(
                <IBANElement
                    {...props}
                    Rebilly={{
                        ...props.Rebilly,
                        iban: {
                            ...props.Rebilly.iban,
                            mount: null
                        },
                        ready: true
                    }}
                />
            );
            // never
            expect(true).toEqual(false);
        } catch (error) {
            expect(error.code).toEqual(FramePayError.codes.elementMountError);
        }
    });
});
