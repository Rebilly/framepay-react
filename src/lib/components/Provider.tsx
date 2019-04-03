import * as React from 'react';
import { FramePayContext } from '../../types/context';
import { ContextProvider } from '../context';
import { injectScript, injectStyle } from '../dom-util';
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
            // throw FramePayError({
            //     code: FramePayError.codes.remoteScriptError
            // });
        });
    }

    async onApiReady() {
        const api = getFramePayApi();
        api.initialize(this.props.settings);
        this.setState({ ready: true, api });
    }

    render() {
        return (
            <ContextProvider value={this.state}>
                {this.props.children}
            </ContextProvider>
        );
    }
}
