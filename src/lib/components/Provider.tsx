import * as React from 'react';
import { ContextProvider } from '../context';
import { injectScript, injectStyle } from '../dom-util';
import FramePayError from '../FramePayError';
import getFramePayApi from '../get-framepay-api';

interface ProviderProps extends FramePaySettings {
    readonly injectStyle: boolean;
    readonly injectScript: boolean;
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
        injectScript({
            onError: () => this.onApiError(),
            onReady: () => this.onApiReady()
        });
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
            // tslint:disable:no-shadowed-variable
            const { injectStyle, children, ...settings } = this.props;
            // tslint:enable:no-shadowed-variable
            api.initialize(settings);
            this.setState({ ready: true, api });
        } catch (e) {
            throw FramePayError({
                code: FramePayError.codes.initializeError
            });
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
