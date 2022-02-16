import { SUPPORTED_CARD_BRANDS } from './lib/constants';

import {
    withFramePay,
    withFramePayApplePayComponent,
    withFramePayBankComponent,
    withFramePayCardComponent,
    withFramePayGooglePayComponent,
    withFramePayIBANComponent
} from './lib/components/injector';

import FramePayProvider from './lib/components/provider';

import {
    FramePayApplePayProps,
    FramePayBankProps,
    FramePayCardProps,
    FramePayComponentProps,
    FramePayGooglePayProps,
    FramePayIBANProps
} from '../types/injector';

export {
    SUPPORTED_CARD_BRANDS,
    FramePayProvider,
    withFramePay,
    withFramePayCardComponent,
    withFramePayBankComponent,
    withFramePayIBANComponent,
    withFramePayApplePayComponent,
    withFramePayGooglePayComponent,
    FramePayComponentProps,
    FramePayCardProps,
    FramePayBankProps,
    FramePayIBANProps,
    FramePayApplePayProps,
    FramePayGooglePayProps,
};
