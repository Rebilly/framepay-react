# framepay-react

[![npm](https://img.shields.io/npm/v/framepay-react.svg)](https://www.npmjs.com/package/framepay-react)
[![Build Status](https://travis-ci.org/Rebilly/framepay-react.svg?branch=master)](https://travis-ci.org/Rebilly/framepay-react)  

> React components for FramePay.js

## Table of Contents
- [FramePay documentation](#framepay-documentation)
- [Demos](#demos)
- [Installation](#installation)
- [Getting started](#getting-started)
    - [The FramePay context (`FramePayProvider`)](#the-framepay-context-framepayprovider)
    - [Setting up your payment form](#setting-up-your-payment-form)
        - [With FramePay (`withFramePay`) HOC](#with-framepay-withframepay-hoc)
        - [Card elements (`withFramePayCardComponent`) HOC](#card-elements-withframepaycardcomponent-hoc)
        - [Bank elements (`withFramePayBankComponent`) HOC](#bank-elements-withframepaybankcomponent-hoc)
- [Advanced options](#advanced-options)
    - [Initialize settings](#initialize-settings)
    - [Create Token params](#create-token-params)
- [Troubleshooting](#troubleshooting)
- [Development](#development)

### FramePay documentation
The main [Rebilly FramePay documentation](https://rebilly.github.io/framepay-docs/)

### Demos      
- [Use with react-redux](example/react-redux)    
- [Use with react-router](example/react-router)   
- [Use with ServerSide rendering](example/react-ssr)   
- [Use with TypeSCript](example/react-typescript)   
- [Examples from README file](example/readme-example)
- [Multiple Payment Methods](example/react-router/src/MultiplePaymentMethods.js)      
- [Separated fields](example/react-router/src/PaymentCardSeparated.js)      
- [Other Payment Methods](example/react-router/src/OtherPaymentMethods.js)      
- [More examples e2e test directory](test/e2e/fixtures)    

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
See [readme-example](example/readme-example)  
```jsx harmony
// index.js
import React from 'react';
import { render } from 'react-dom';
import { FramePayProvider } from 'framepay-react';

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

##### With FramePay (`withFramePay`) HOC
Simple FramePay HOC to provide `framePay` api in the component.  
Used in customized forms logic and in [MultiplePaymentMethods](example/react-router/src/elements/MultiplePaymentMethods.js) forms  

##### Card elements (`withFramePayCardComponent`) HOC
```jsx harmony
// MyCardPageComponent.js
import React from 'react';
import { withFramePayCardComponent } from 'framepay-react';

class MyCardPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formNode = null;
        this.state = { firstName: '', lastName: '' };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        // @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-createtoken
        this.props.framePay.createToken(
            this.formNode,
            { billingAddress: { ...this.state } }
        )
            .then(data => alert(JSON.stringify(data, null, 2)))
            .catch(err => alert(JSON.stringify(err, null, 2)));
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
            <br/>
            <this.props.CardElement/>
            <hr/>
            <button>Make Payment</button>
        </form>);
    }
}

export default withFramePayCardComponent(MyCardPageComponent);
```

##### Bank elements (`withFramePayBankComponent`) HOC
```jsx harmony
import React from 'react';
import { withFramePayBankComponent } from 'framepay-react';

class MyBankPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.formNode = null;
        this.state = { firstName: '', lastName: '' };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        // @see https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-createtoken
        this.props.framePay.createToken(
            this.formNode,
            { billingAddress: { ...this.state } }
        )
            .then(data => alert(JSON.stringify(data, null, 2)))
            .catch(err => alert(JSON.stringify(err, null, 2)));
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
            <br/>
            <this.props.BankElement/>
            <hr/>
            <button>Make Payment</button>
        </form>);
    }
}

export default withFramePayBankComponent(MyBankPageComponent);
```

### Advanced options

#### Initialize settings
The **framepay-react** package supports all the [FramePay](https://rebilly.github.io/framepay-docs) settings.
See [rebilly-initialize section](https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-initialize)

And, one custom setting **injectStyle** - will add the default framepay style link    
in header section of your app, see [adding-default-element-styles](https://rebilly.github.io/framepay-docs/guide/#adding-default-element-styles)

#### Create Token params
Supports all FramePay arguments, see [FramePay createToken](https://rebilly.github.io/framepay-docs/reference/rebilly.html#rebilly-createtoken)

### Troubleshooting

The `with*` methods it's HoC [higher-order-components](https://reactjs.org/docs/higher-order-components.html),
that means, you can't use it in render method.  

##### Incorrect
```jsx harmony
import * as React from 'react';
import {withFramePayCardComponent} from 'framepay-react'

class SomeComponent extends React.Component {
    render(){
        return(<div>
            {withFramePayCardComponent(MyCardComponent)}
        </div>)
    }
}
```

##### Correct
```jsx harmony
import * as React from 'react';
import {withFramePayCardComponent} from 'framepay-react'

const MyCardElement = withFramePayCardComponent(MyCardComponent);

class SomeComponent extends React.Component {
    render(){
        return(<div>
            <MyCardElement />
        </div>)
    }
}
```
