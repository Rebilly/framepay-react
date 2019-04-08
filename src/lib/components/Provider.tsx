import * as React from 'react';
import { ContextProvider } from '../context';
import { injectScript, injectStyle } from '../dom-util';
import FramePayError from '../FramePayError';
import getFramePayApi from '../get-framepay-api';

export default class Provider extends React.Component<
    ProviderProps,
    FramePayContext
> {
    static readonly defaultProps = {
        injectScript: true,
        injectStyle: false
    };

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
                code: FramePayError.codes.initializeError,
                trace: e
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
