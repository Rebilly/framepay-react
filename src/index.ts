import { SUPPORTED_CARD_BRANDS } from './lib/constants';

import {
    withFramePay,
    withFramePayBankComponent,
    withFramePayCardComponent
} from './lib/components/Injector';

import FramePayProvider from './lib/components/Provider';

import {
    FramePayBankProps,
    FramePayCardProps,
    FramePayComponentProps
} from '../types/injector';

export {
    SUPPORTED_CARD_BRANDS,
    FramePayProvider,
    withFramePay,
    withFramePayCardComponent,
    withFramePayBankComponent,
    FramePayComponentProps,
    FramePayCardProps,
    FramePayBankProps
};
