import { SUPPORTED_CARD_BRANDS } from './lib/constants';

import {
    withFramePay,
    withFramePayBankComponent,
    withFramePayCardComponent,
    withFramePayIBANComponent
} from './lib/components/injector';

import FramePayProvider from './lib/components/provider';

import {
    FramePayApplePayProps,
    FramePayBankProps,
    FramePayCardProps,
    FramePayComponentProps,
    FramePayDigitalWalletProps,
    FramePayIBANProps
} from '../types/injector';

export {
    SUPPORTED_CARD_BRANDS,
    FramePayProvider,
    withFramePay,
    withFramePayCardComponent,
    withFramePayBankComponent,
    withFramePayIBANComponent,
    FramePayComponentProps,
    FramePayCardProps,
    FramePayBankProps,
    FramePayIBANProps,
    FramePayApplePayProps,
    FramePayDigitalWalletProps
};
