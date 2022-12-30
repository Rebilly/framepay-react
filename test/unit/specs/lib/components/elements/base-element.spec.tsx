import { Substitute } from '@fluffy-spoon/substitute';
import { mount } from 'enzyme';
import * as React from 'react';
import BaseElement from '../../../../../../src/lib/components/elements/base-element';

describe('lib/components/elements/BaseElement', () => {
    it('should unregister any event handlers on destroy', done => {
        const element = Substitute.for<PaymentElement>();
        const eventHandler = (token: string) => {};

        const props = {
            Rebilly: {
                ready: true,
                on: jest.fn(),
                off: jest.fn()
            }
        };

        class TmpComponent extends BaseElement<
            PaymentComponentProps,
            PaymentComponentState
        > {
            setupElement() {
                this.addEventHandler('token-ready', eventHandler);
                this.setState({ element });
            }
        }

        const wrapper = mount(
            <TmpComponent {...props} Rebilly={props.Rebilly} />
        );
        process.nextTick(() => {
            wrapper.unmount();

            expect(props.Rebilly.on).toHaveBeenCalledTimes(1);
            expect(props.Rebilly.on).toHaveBeenLastCalledWith(
                'token-ready',
                eventHandler
            );

            expect(props.Rebilly.off).toHaveBeenCalledTimes(1);
            expect(props.Rebilly.off).toHaveBeenLastCalledWith(
                'token-ready',
                eventHandler
            );

            done();
        });
    });
});
