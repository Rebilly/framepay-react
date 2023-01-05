import { Substitute } from '@fluffy-spoon/substitute';
import { render } from '@testing-library/react';
import * as React from 'react';
import FramePayError from '../../framepay-error';
import IBANElement from './iban-element';

describe('IBANElement', () => {
    it('should not setup the element while api is not ready', () => {
        const props = Substitute.for<IBANProps>();

        props.Rebilly.ready.returns(false);

        const spy = jest.spyOn(IBANElement.prototype, 'setupElement');

        render(<IBANElement {...props} Rebilly={props.Rebilly} />);
        expect(spy).not.toHaveBeenCalled();
    });

    it('should setup the element when api is ready', () => {
        const props = Substitute.for<IBANProps>();
        const spy = jest.spyOn(IBANElement.prototype, 'setupElement');

        props.Rebilly.ready.returns(false);

        const { rerender } = render(
            <IBANElement {...props} Rebilly={props.Rebilly} />
        );

        expect(spy).toHaveBeenCalledTimes(0);

        const nextProps = Substitute.for<IBANProps>();

        rerender(
            <IBANElement
                {...nextProps}
                Rebilly={{ iban: nextProps.Rebilly.iban, ready: true }}
            />
        );

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should render the empty div element', () => {
        const props = Substitute.for<IBANProps>();
        const { container } = render(
            <IBANElement {...props} Rebilly={props.Rebilly} />
        );
        expect(container.firstChild).toMatchInlineSnapshot(`<div />`);
    });

    it('should destroy the element on component unmount', done => {
        const props = Substitute.for<IBANProps>();
        const element = Substitute.for<PaymentElement>();

        element.destroy().mimicks(() => {
            done();
        });

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

        const { unmount } = render(<TmpComponent />);
        unmount();
    });

    it('should fail the element mount on remote error', () => {
        const props = Substitute.for<IBANProps>();

        try {
            render(
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
