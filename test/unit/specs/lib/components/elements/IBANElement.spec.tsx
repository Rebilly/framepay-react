import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import IBANElement from '../../../../../../src/lib/components/elements/IBANElement';
import FramePayError from '../../../../../../src/lib/FramePayError';

describe('lib/components/elements/IBANElement', () => {
    it('should not setup the element while api is not ready', done => {
        const props = Substitute.for<IBANProps>();

        // @ts-ignore
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

        // @ts-ignore
        props.Rebilly.ready.returns(false);

        const wrapper = mount(
            <IBANElement {...props} Rebilly={props.Rebilly} />
        );

        process.nextTick(() => {
            expect(spy).toHaveBeenCalledTimes(0);
            expect(wrapper.state('mounted')).toEqual(false);

            const nextProps = Substitute.for<IBANProps>();
            // @ts-ignore
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

    it('should fail the element mount on remote error', () => {
        const props = Substitute.for<IBANProps>();

        // @ts-ignore
        props.Rebilly.ready = true;

        // @ts-ignore
        props.Rebilly.iban.mount(Arg.any()).returns(null);

        try {
            mount(<IBANElement {...props} Rebilly={props.Rebilly} />);
            // never
            expect(true).toEqual(false);
        } catch (error) {
            expect(error.code).toEqual(FramePayError.codes.elementMountError);
        }
    });

    it('should destroy the element on component unmount', done => {
        const props = Substitute.for<IBANProps>();
        const element = Substitute.for<PaymentElement>();

        // @ts-ignore
        props.Rebilly.ready = true;

        element.destroy().mimicks(() => {
            done();
        });

        // @ts-ignore
        props.Rebilly.iban.mount(Arg.any(), Arg.any()).returns(element);

        class TmpComponent extends React.Component {
            render() {
                return <IBANElement {...props} Rebilly={props.Rebilly} />;
            }
        }

        const wrapper = mount(<TmpComponent />);
        wrapper.unmount();
    });

    it('should render the empty div element', () => {
        const props = Substitute.for<IBANProps>();
        const wrapper = shallow(
            <IBANElement {...props} Rebilly={props.Rebilly} />
        );
        expect(wrapper.html()).toEqual('<div></div>');
    });
});
