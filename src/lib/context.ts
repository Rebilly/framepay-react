import { createContext } from 'react';
import FramePayApi from './FramePayApi';

interface FramePayContext {
  readonly api: FramePayApi
}

const {
  Provider: ContextProvider,
  Consumer: ContextConsumer
} = createContext<FramePayContext>({ api: new FramePayApi() });

export {
  ContextProvider,
  ContextConsumer
};
