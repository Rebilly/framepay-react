import { Substitute } from '@fluffy-spoon/substitute';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import CardElement from '../../../../../../src/lib/components/elements/card-element';
import FramePayError from '../../../../../../src/lib/framepay-error';

describe('lib/components/elements/CardElement', () => {
    it('should not setup the element while api is not ready', done => {
        const props = Substitute.for<CardProps>();

        props.Rebilly.ready.returns(false);

        const spy = jest.spyOn(CardElement.prototype, 'setupElement');

        mount(<CardElement {...props} Rebilly={props.Rebilly} />);

        process.nextTick(() => {
            expect(spy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should setup the element when api is ready', done => {
        const props = Substitute.for<CardProps>();
        const spy = jest.spyOn(CardElement.prototype, 'setupElement');

        props.Rebilly.ready.returns(false);

        const wrapper = mount(
            <CardElement {...props} Rebilly={props.Rebilly} />
        );

        process.nextTick(() => {
            expect(spy).toHaveBeenCalledTimes(0);
            expect(wrapper.state('mounted')).toEqual(false);

            const nextProps = Substitute.for<CardProps>();

            wrapper.setProps({
                ...nextProps,
                Rebilly: {
                    card: nextProps.Rebilly.card,
                    ready: true
                }
            });

            expect(spy).toHaveBeenCalledTimes(1);
            expect(wrapper.state('element')).toBeDefined();
            expect(wrapper.state('mounted')).toEqual(true);
            done();
        });
    });

    it('should render the empty div element', () => {
        const props = Substitute.for<CardProps>();
        const wrapper = shallow(
            <CardElement {...props} Rebilly={props.Rebilly} />
        );
        expect(wrapper.html()).toEqual('<div></div>');
    });

    it('should destroy the element on component unmount', done => {
        const props = Substitute.for<CardProps>();
        const element = Substitute.for<PaymentElement>();

        element.destroy().mimicks(() => {
            done();
        });

        class TmpComponent extends React.Component {
            render() {
                return (
                    <CardElement
                        {...props}
                        Rebilly={{
                            ...props.Rebilly,
                            card: {
                                ...props.Rebilly.card,
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
        const props = Substitute.for<CardProps>();

        try {
            mount(
                <CardElement
                    {...props}
                    Rebilly={{
                        ...props.Rebilly,
                        card: {
                            ...props.Rebilly.card,
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
