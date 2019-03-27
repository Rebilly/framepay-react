import React, {Component} from 'react';
import './App.css';
import {FramePayProvider} from 'framepay-react';
import Card from './Card';


const settings = {
    style: {
        base: {
            color: 'green',
            fontSize: '12px',
            webkitFontSmoothing: 'auto',
            fontFeatureSettings: 'test',
            fontStyle: 'italic',
            fontVariant: 'normal',
            fontStretch: 'none',
            fontSomething: 'not-included',
            fontOtherThing: 'not-included',
            lineHeight: '20px',
        },
        invalid: {
            fontWeight: 'bold',
        },
    },
    classes: {
        base: 'rebilly-framepay',
        focus: 'rebilly-framepay-focus',
        valid: 'rebilly-framepay-valid',
        invalid: 'rebilly-framepay-invalid',
        buttons: 'rebilly-framepay-buttons',
        webkitAutofill: 'rebilly-framepay-webkit-autofill',
    },
    icon: {
        foobar: 123,
        display: true,
        color: 'blue',
    },
};


class App extends Component {

    render() {
        return (
            <div className="App">
                <FramePayProvider
                    publishableKey="pk_live_PB0BfcVUrp1-0WVzuCKCf-6TnnJ64H0ngd-1AVq" {...settings}>
                    <header className="App-header">
                        Framepay ReactJS example
                        <hr/>
                        <Card/>
                    </header>
                </FramePayProvider>
            </div>
        );
    }
}

export default App;
