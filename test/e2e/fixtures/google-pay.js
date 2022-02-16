import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FramePayProvider, withFramePayGooglePayComponent } from '../../../build';
import { ReactVersion } from './util';
import './style.css';

const params = {
    publishableKey: 'pk_sandbox_S95ATjj4hXZs-T9QpZq1ENl2tDSrUkCGv98utc9',
    organizationId: '5977150c-1c97-4dd4-9860-6bb2bab070b4',
    websiteId: 'demo.com',
    transactionData: {
        amount: 10,
        currency: 'USD',
        label: 'Purchase label 1',
    },
};

class GooglePayElementComponent extends Component {

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
                <div className="example-2">
                    <this.props.GooglePayElement />
                </div>
            </div>
        </div>);
    }
}

const GooglePayElement = withFramePayGooglePayComponent(GooglePayElementComponent);

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
                <GooglePayElement />
            </div>
        </FramePayProvider>);
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
