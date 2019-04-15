// tslint:disable:max-classes-per-file
import { Substitute } from '@fluffy-spoon/substitute';
import { mount } from 'enzyme';
import * as React from 'react';

import {
    withFramePay,
    withFramePayBankComponent,
    withFramePayCardComponent
} from '../../../../../src';

import { FramePayComponentProps } from '../../../../../src/types/injector';

import { ContextProvider } from '../../../../../src/lib/context';

describe('lib/components/Injector', () => {
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
                        {this.props.Rebilly.error}.
                        {String(this.props.Rebilly.ready)}
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
                        // @ts-ignore
                        <TMPWrapper />
                    </ContextProvider>
                );
            }
        }

        const wrapper = mount(<App />);
        expect(wrapper.html()).toEqual('<div>withFramePay.true</div>');
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
                        {this.props.Rebilly.error}.
                        {String(this.props.Rebilly.ready)}
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
                        // @ts-ignore
                        <TMPWrapper />
                    </ContextProvider>
                );
            }
        }

        const wrapper = mount(<App />);
        expect(wrapper.html()).toEqual(
            '<div>withFramePayCardComponent.true</div>'
        );
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
                        {this.props.Rebilly.error}.
                        {String(this.props.Rebilly.ready)}
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
                        // @ts-ignore
                        <TMPWrapper />
                    </ContextProvider>
                );
            }
        }

        const wrapper = mount(<App />);
        expect(wrapper.html()).toEqual(
            '<div>withFramePayBankComponent.true</div>'
        );
    });
});
