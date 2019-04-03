import { createContext } from 'react';
import { FramePayContext } from '../types/context';
import getFramePayApi from './get-framepay-api';

const { Provider: ContextProvider, Consumer: ContextConsumer } = createContext<
    FramePayContext
>({
    api: getFramePayApi(),
    ready: false
});

export { ContextProvider, ContextConsumer };
