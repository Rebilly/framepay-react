# framepay-react

[![npm](https://img.shields.io/npm/v/framepay-react.svg)](https://www.npmjs.com/package/framepay-react)
[![Build Status](https://travis-ci.org/Rebilly/framepay-react.svg?branch=master)](https://travis-ci.org/Rebilly/framepay-react)  

> React components for FramePay.js

## Table of Contents
- [PCI Compliance Note](#pci-compliance-note)
- [FramePay documentation](#framepay-documentation)
- [Demos](#demos)
- [Installation](#installation)
- [Getting started](#getting-started)
    - [The FramePay context (`FramePayProvider`)](#the-framepay-context-framepayprovider)
    - [Setting up your payment form](#setting-up-your-payment-form)
        - [Card elements (`withFramePayCardComponent`) HOC](#card-elements-withframepaycardcomponent)
        - [Bank elements (`withFramePayBankComponent`) HOC](#bank-elements-withframepaybankcomponent)
- [Advanced options](#advanced-options)

### PCI Compliance Note
If you need to handle raw payment card data, you should use [Rebilly FramePay](https://rebilly.github.io/framepay-docs/) to generate tokens for your server-side logic.

### FramePay documentation
The main [Rebilly FramePay documentation](https://rebilly.github.io/framepay-docs/)

### Demos
- [Tiny example codesandbox](https://codesandbox.io)  
- [Redux example codesandbox](https://codesandbox.io)      
- [Use with react-redux](gh-pages)    
- [Use with react-router](gh-pages)   
- [Use with ServerSide rendering](gh-pages)   
- [Example from README file](gh-pages)   
- [More examples e2e test directory](https://github.com/Rebilly/framepay-react/tree/master/test/e2e/fixtures)    

### Installation
Install the latest version of the SDK with [Yarn](https://yarnpkg.com/en/):
```
yarn add rebilly-js-sdk
```

Or using NPM:
```
npm install framepay-react --save
```

### Getting started

#### The FramePay context (`FramePayProvider`)
FramePayProvider provides the settings to the FramePay api, see [framepay-initialize](https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-initialize)  
See [react-card-example](/tree/master/example/react-card-example)  
```jsx harmony
// index.js
import React from 'react';
import { render } from 'react-dom';
import { FramePayProvider } from '../../build/package';

import MyCardPageComponent from './MyCardPageComponent';

const App = () => {
    return (
        <FramePayProvider injectStyle publishableKey="pk_sandbox_1234567890">
            <MyCardPageComponent/>
        </FramePayProvider>
    );
};

render(<App/>, document.getElementById('root'));

```

#### Setting up your payment form

##### Card elements (`withFramePayCardComponent`) HOC
```jsx harmony
// MyCardPageComponent.js
import React from 'react';
import { withFramePayCardComponent } from '../../build/package';


class MyCardPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formNode = null;
        this.state = {
            firstName: '',
            lastName: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        /**
         *
         * @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-createtoken
         *
         */
        this.props.framePay.createToken(
            this.formNode,
            { billingAddress: { ...this.state } }
        )
            .then(data => {
                alert(JSON.stringify(data, null, 2));
            })
            .catch(err => {
                alert(JSON.stringify(err, null, 2));
            });
    }

    render() {
        return (<form
            ref={node => this.formNode = node}
            onSubmit={this.onSubmit}>
            <div>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    defaultValue={this.state.firstName}
                    onChange={(e) => this.setState({ firstName: e.target.value })}/>
            </div>
            <br/>
            <div>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    defaultValue={this.state.lastName}
                    onChange={(e) => this.setState({ lastName: e.target.value })}/>
            </div>

            <this.props.CardElement/>

            <hr/>

            <button>Make Payment</button>
        </form>);
    }
}

export default withFramePayCardComponent(MyCardPageComponent);
```

##### Bank elements (`withFramePayBankComponent`) HOC

### Advanced options

