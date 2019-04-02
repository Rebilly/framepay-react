import React, { Component } from 'react';

import { Provider as FramePayProvider, withFramePayCardComponent } from 'framepay-react';

import './App.css';


import CardElement from './CardElement';

const schemes = {
    'CardElement': CardElement,
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        };
    }

    componentDidMount() {
        alert(1);
        setTimeout(() => {
            alert(typeof params)
            this.setState({
                params: params,
                ready: true,
            });
        }, 0);
    }

    render() {
        if (!this.state.ready) {
            return <h1>Awaitin ready...</h1>;
        }
        try {
            const CardComponent = schemes[this.state.params.scheme];

            return (
                <FramePayProvider {...this.state.params.settings}>
                    <div>
                        <h1>Card</h1>
                        <CardComponent/>
                    </div>
                </FramePayProvider>
            );
        } catch (err) {
            return <div>
                <h1>ERROR</h1>
                <h1>ERROR</h1>
                <h1>ERROR</h1>
                <h1>ERROR</h1>
                <h1>ERROR</h1>
                <div>{String(err)}</div>
            </div>;
        }
    }
}

export default App;
