// tslint:disable:max-classes-per-file
import { Substitute } from '@fluffy-spoon/substitute';
import { render } from '@testing-library/react';
import * as React from 'react';

import { withFramePay } from '../..';

import { FramePayComponentProps } from '../../../types/injector';

import { ContextProvider } from '../context';

describe('Injector', () => {
    it('withFramePay HOC the context data should be provided', () => {
        expect(true).toEqual(true);

        interface OriginalProps {
            readonly someProperty: string;
        }

        class TMPComponent extends React.Component<
            OriginalProps & FramePayComponentProps
        > {
            render() {
                return (
                    <div>
                        error: {this.props.Rebilly.error}
                        ready: {String(this.props.Rebilly.ready)}
                    </div>
                );
            }
        }

        const context = Substitute.for<FramePayContext>();
        const TMPWrapper = withFramePay(TMPComponent);

        class App extends React.Component {
            render() {
                return (
                    <ContextProvider
                        value={{
                            ...context,
                            error: 'withFramePay',
                            ready: true
                        }}
                    >
                        <TMPWrapper />
                    </ContextProvider>
                );
            }
        }

        const { container } = render(<App />);
        expect(container.firstChild).toMatchInlineSnapshot(`
            <div>
              error: 
              withFramePay
              ready: 
              true
            </div>
        `);
    });

    it('withFramePayCardComponent HOC the context data should be provided', () => {
        expect(true).toEqual(true);

        interface OriginalProps {
            readonly someProperty: string;
        }

        class TMPComponent extends React.Component<
            OriginalProps & FramePayComponentProps
        > {
            render() {
                return (
                    <div>
                        error: {this.props.Rebilly.error}
                        ready: {String(this.props.Rebilly.ready)}
                    </div>
                );
            }
        }

        const context = Substitute.for<FramePayContext>();
        const TMPWrapper = withFramePay(TMPComponent);

        class App extends React.Component {
            render() {
                return (
                    <ContextProvider
                        value={{
                            ...context,
                            error: 'withFramePayCardComponent',
                            ready: true
                        }}
                    >
                        <TMPWrapper />
                    </ContextProvider>
                );
            }
        }

        const { container } = render(<App />);
        expect(container.firstChild).toMatchInlineSnapshot(`
            <div>
              error: 
              withFramePayCardComponent
              ready: 
              true
            </div>
        `);
    });

    it('withFramePayBankComponent HOC the context data should be provided', () => {
        expect(true).toEqual(true);

        interface OriginalProps {
            readonly someProperty: string;
        }

        class TMPComponent extends React.Component<
            OriginalProps & FramePayComponentProps
        > {
            render() {
                return (
                    <div>
                        error: {this.props.Rebilly.error}
                        ready: {String(this.props.Rebilly.ready)}
                    </div>
                );
            }
        }

        const context = Substitute.for<FramePayContext>();
        const TMPWrapper = withFramePay(TMPComponent);

        class App extends React.Component {
            render() {
                return (
                    <ContextProvider
                        value={{
                            ...context,
                            error: 'withFramePayBankComponent',
                            ready: true
                        }}
                    >
                        <TMPWrapper />
                    </ContextProvider>
                );
            }
        }

        const { container } = render(<App />);
        expect(container.firstChild).toMatchInlineSnapshot(`
            <div>
              error: 
              withFramePayBankComponent
              ready: 
              true
            </div>
        `);
    });
});
