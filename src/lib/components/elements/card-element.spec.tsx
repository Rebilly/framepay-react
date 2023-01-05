import { Substitute } from '@fluffy-spoon/substitute';
import { render } from '@testing-library/react';
import * as React from 'react';
import FramePayError from '../../framepay-error';
import CardElement from './card-element';

describe('CardElement', () => {
    it('should not setup the element while api is not ready', () => {
        const props = Substitute.for<CardProps>();

        props.Rebilly.ready.returns(false);

        const setupElementSpy = jest.spyOn(
            CardElement.prototype,
            'setupElement'
        );

        render(<CardElement {...props} Rebilly={props.Rebilly} />);

        expect(setupElementSpy).not.toHaveBeenCalled();
    });

    it('should setup the element when api is ready', () => {
        const props = Substitute.for<CardProps>();
        const setupElementSpy = jest.spyOn(
            CardElement.prototype,
            'setupElement'
        );

        const { rerender } = render(
            <CardElement
                Rebilly={{
                    ready: false
                }}
            />
        );

        expect(setupElementSpy).toHaveBeenCalledTimes(0);

        rerender(
            <CardElement
                Rebilly={{
                    card: props.Rebilly.card,
                    ready: true
                }}
            />
        );

        expect(setupElementSpy).toHaveBeenCalledTimes(1);
    });

    it('should render the empty div element', () => {
        const props = Substitute.for<CardProps>();
        const { container } = render(
            <CardElement {...props} Rebilly={props.Rebilly} />
        );
        expect(container.firstChild).toMatchInlineSnapshot(`<div />`);
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

        const { unmount } = render(<TmpComponent />);
        unmount();
    });

    it('should fail the element mount on remote error', () => {
        const props = Substitute.for<CardProps>();

        try {
            render(
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
