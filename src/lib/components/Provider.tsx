import * as React from 'react';
import { ContextProvider } from '../context';
import { injectScript, injectStyle } from '../dom-util';
import FramePayError from '../FramePayError';
import getRebillyApi from '../get-rebilly-api';

export default class Provider extends React.Component<
    ProviderProps,
    FramePayContext
> {
    static readonly defaultProps = {
        injectScript: true,
        injectStyle: false
    };

    readonly state: FramePayContext = {
        api: getRebillyApi(),
        error: null,
        ready: false
    };

    componentDidMount() {
        if (this.props.injectScript) {
            injectScript({
                onError: () => this.onApiError(),
                onReady: () => this.onApiReady()
            });
        }
        if (this.props.injectStyle) {
            injectStyle();
        }
    }

    onApiError() {
        return this.setState(
            {
                error: FramePayError.codes.remoteScriptError,
                ready: false
            },
            () => {
                throw FramePayError({
                    code: FramePayError.codes.remoteScriptError
                });
            }
        );
    }

    async onApiReady() {
        const api = getRebillyApi();
        try {
            // tslint:disable:no-shadowed-variable
            const { injectStyle, children, ...settings } = this.props;
            // tslint:enable:no-shadowed-variable
            api.initialize(settings);
            this.setState({ ready: true, api, error: null });
        } catch (e) {
            return this.setState(
                {
                    error: FramePayError.codes.initializeError,
                    ready: false
                },
                () => {
                    throw FramePayError({
                        code: FramePayError.codes.initializeError,
                        details: 'Api initialize error',
                        trace: e
                    });
                }
            );
        }
    }

    render() {
        return (
            <ContextProvider value={this.state}>
                {this.props.children}
            </ContextProvider>
        );
    }
}
