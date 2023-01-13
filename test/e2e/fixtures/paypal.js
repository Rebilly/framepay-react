import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    FramePayProvider,
    withFramePayPaypalComponent
} from '../../../build';
import { prettyDebugRender, ReactVersion } from './util';
import './style.css';

const params = {
    publishableKey: 'pk_sandbox_S95ATjj4hXZs-T9QpZq1ENl2tDSrUkCGv98utc9',
    organizationId: '5977150c-1c97-4dd4-9860-6bb2bab070b4',
    websiteId: 'demo.com',
    transactionData: {
        amount: 10,
        currency: 'USD',
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
        };
    }

    render() {
        return (
            <FramePayProvider
                injectStyle
                {...params}
                onReady={() => {
                    console.log('FramePayProvider.onReady');
                }}
                onError={err => {
                    console.log('FramePayProvider.onError', err);
                }}
                onTokenReady={token => this.setState({ token })}
            >
                <div>
                    {ReactVersion()}
                    <div>
                        <h3>FramePay version: {this.props.Rebilly.version}</h3>
                        <div className="flex-wrapper">
                            {prettyDebugRender(this.state)}
                            <this.props.PaypalElement />
                        </div>
                    </div>
                </div>
            </FramePayProvider>
        );
    }
}

const WrappedApp = withFramePayPaypalComponent(App);
ReactDOM.render(
    <WrappedApp />,
    document.getElementById('app')
);
