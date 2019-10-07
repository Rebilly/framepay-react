import * as React from 'react';
import { FRAMEPAY_SCRIPT_LINK } from '../constants';
import { ContextProvider } from '../context';
import { injectScript, injectStyle } from '../dom-util';
import FramePayError from '../framepay-error';
import getRebillyApi from '../get-rebilly-api';

export default class Provider extends React.Component<
    ProviderProps,
    FramePayContext
> {
    static readonly defaultProps = {
        injectScript: true,
        injectStyle: false,
        onError: undefined,
        onReady: undefined
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
                const error = FramePayError({
                    code: FramePayError.codes.remoteScriptError,
                    details: `Remote CDN link "${FRAMEPAY_SCRIPT_LINK}"`
                });
                throw error;
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
            api.on('ready', () => {
                this.setState({ ready: true, api, error: null });

                // call onReady callback
                if (this.props.onReady) {
                    this.props.onReady();
                }
            });
            api.on('error', error => {
                this.setState({ ready: false, api, error });

                // call error callback
                if (this.props.onError) {
                    // @ts-ignore
                    this.props.onError(error);
                }
            });
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
