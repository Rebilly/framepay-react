import {
    withFramePay,
    withFramePayBankComponent,
    withFramePayCardComponent,
    withFramePayIBANComponent
} from './lib/components/Injector';

import FramePayProvider from './lib/components/Provider';

import {
    FramePayBankProps,
    FramePayCardProps,
    FramePayComponentProps,
    FramePayIBANProps
} from '../types/injector';

export {
    FramePayProvider,
    withFramePay,
    withFramePayCardComponent,
    withFramePayBankComponent,
    withFramePayIBANComponent,
    FramePayComponentProps,
    FramePayCardProps,
    FramePayBankProps,
    FramePayIBANProps
};
