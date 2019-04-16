import * as React from 'react';
import { REACT_VERSION } from './constants';
import getRebillyApi from './get-rebilly-api';

const defaultContextValue = {
    api: getRebillyApi(),
    error: null,
    ready: false
};

// tslint:disable:no-let
let ProvidedContext;
if (+REACT_VERSION.split('.')[0] < 16) {
    // tslint:disable:no-var-requires
    const createReactContext = require('create-react-context');
    ProvidedContext = createReactContext(defaultContextValue);
} else {
    ProvidedContext = React.createContext<FramePayContext>(defaultContextValue);
}

const ContextProvider = ProvidedContext.Provider;
const ContextConsumer = ProvidedContext.Consumer;

export { ContextProvider, ContextConsumer };
