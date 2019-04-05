import * as React from 'react';
import { ContextProvider } from '../context';
import { injectScript, injectStyle } from '../dom-util';
import FramePayError from '../FramePayError';
import getFramePayApi from '../get-framepay-api';

interface ProviderProps {
    readonly injectScript: boolean;
    readonly injectStyle: boolean;
    readonly settings: FramePaySettings;
    readonly children: React.Component;
}

export default class Provider extends React.Component<
    ProviderProps,
    FramePayContext
> {
    readonly state: FramePayContext = {
        api: getFramePayApi(),
        ready: false
    };

    componentDidMount() {
        console.log('Provider.componentDidMount');
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
        return this.setState({ ready: false }, () => {
            throw FramePayError({
                code: FramePayError.codes.remoteScriptError
            });
        });
    }

    async onApiReady() {
        const api = getFramePayApi();
        try {
            api.initialize(this.props.settings);
            this.setState({ ready: true, api });
        } catch (e) {
            throw FramePayError({
                code: FramePayError.codes.initializeError
            });
        }
    }

    render() {
        console.log('11111 Provider.render');
        return (
            <ContextProvider value={this.state}>
                {this.props.children}
            </ContextProvider>
        );
    }
}
