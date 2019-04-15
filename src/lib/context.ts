import * as React from 'react';
import getRebillyApi from './get-rebilly-api';

const {
    Provider: ContextProvider,
    Consumer: ContextConsumer
} = React.createContext<FramePayContext>({
    api: getRebillyApi(),
    error: null,
    ready: false
});

export { ContextProvider, ContextConsumer };
