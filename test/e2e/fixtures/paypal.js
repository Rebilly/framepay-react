import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FramePayProvider, withFramePayPaypalComponent } from '../../../build';
import { prettyDebugRender, ReactVersion } from './util';
import './style.css';

const params = {
    publishableKey: 'pk_sandbox_S95ATjj4hXZs-T9QpZq1ENl2tDSrUkCGv98utc9',
    organizationId: '5977150c-1c97-4dd4-9860-6bb2bab070b4',
    websiteId: 'demo.com',
    transactionData: {
        amount: 10,
        currency: 'USD',
    },
};

class PaypalElementComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: {
                error: null,
                data: null
            }
        };
    }

    render() {
        return (<div>
            <h2>{this.props.title}</h2>
            <h3>FramePay version: {this.props.Rebilly.version}</h3>
            <div className="flex-wrapper">
                {prettyDebugRender(this.state)}
                <div className="example-2">
                    <this.props.PaypalElement />
                </div>
            </div>
        </div>);
    }
}

const PaypalElement = withFramePayPaypalComponent(PaypalElementComponent);

class App extends Component {

    render() {
        return (<FramePayProvider injectStyle
                                  {...params}
                                  onReady={() => {
                                      console.log('FramePayProvider.onReady');
                                  }}
                                  onError={(err) => {
                                      console.log('FramePayProvider.onError', err);
                                  }}>
            <div>
                {ReactVersion()}
                <PaypalElement />
            </div>
        </FramePayProvider>);
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
