import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import CardElement from '../../../../../../src/lib/components/elements/CardElement';
import FramePayError from '../../../../../../src/lib/FramePayError';

describe('lib/components/elements/CardElement', () => {
    it('should not setup the element while api is not ready', done => {
        const props = Substitute.for<CardElementComponentProps>();
        props.ready.returns(false);

        const spy = jest.spyOn(CardElement.prototype, 'setupElement');

        mount(<CardElement {...props} />);

        process.nextTick(() => {
            expect(spy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should setup the element when api is ready', done => {
        const props = Substitute.for<CardElementComponentProps>();
        props.ready.returns(true);

        const spy = jest.spyOn(CardElement.prototype, 'setupElement');

        const wrapper = mount(
            <CardElement ready={props.ready} api={props.api} />
        );

        process.nextTick(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            expect(wrapper.state('element')).toBeDefined();
            expect(wrapper.state('mounted')).toEqual(true);
            done();
        });
    });

    it('should fail the element mount on remote error', () => {
        const props = Substitute.for<CardElementComponentProps>();
        props.ready.returns(true);

        // @ts-ignore
        props.api.card.mount(Arg.any()).returns(null);

        try {
            mount(<CardElement ready={props.ready} api={props.api} />);
            // never
            expect(true).toEqual(false);
        } catch (error) {
            expect(error.code).toEqual(FramePayError.codes.elementMountError);
        }
    });

    it('should render the empty div element', () => {
        const props = Substitute.for<CardElementComponentProps>();
        const wrapper = shallow(
            <CardElement ready={props.ready} api={props.api} />
        );
        expect(wrapper.html()).toEqual('<div></div>');
    });
});
