import { createContext } from 'react';
import getRebillyApi from './get-rebilly-api';

const { Provider: ContextProvider, Consumer: ContextConsumer } = createContext<
    FramePayContext
>({
    api: getRebillyApi(),
    error: null,
    ready: false
});

export { ContextProvider, ContextConsumer };
