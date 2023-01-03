import { Substitute } from '@fluffy-spoon/substitute';
import { render } from '@testing-library/react';
import * as React from 'react';
import BaseElement from './base-element';

describe('BaseElement', () => {
    it('should unregister any event handlers on destroy', () => {
        const element = Substitute.for<PaymentElement>();
        const eventHandler = (token: string) => undefined;

        const props = {
            Rebilly: {
                off: jest.fn(),
                on: jest.fn(),
                ready: true
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

        const { unmount } = render(
            <TmpComponent {...props} Rebilly={props.Rebilly} />
        );
        unmount();

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
    });
});
